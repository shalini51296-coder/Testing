// Audio-first instruction layer.
// Priority: human recording (recordings.js) -> native TTS (Capacitor plugin, offline
// with the phone's Hindi/English voices) -> Web Speech API -> silent timed fallback.
//
// A "script" is an array of segments:
//   'Hello'                         English text
//   {t:'नमस्ते', lang:'hi'}          Hindi text
//   {clip:'ph.s', fb:'sss'}          human clip, falling back to TTS text
//   {pause: 300}                    silence (ms)

import { clipUrl } from './recordings.js';
import { sleep } from './util.js';

const LANG = { en: 'en-IN', hi: 'hi-IN' };
// Voice-name hints for Indian female voices on common engines.
// Names that are not recognised still work: the parent picks the voice in Parent Corner.
const FEMALE_HINTS = /swara|neerja|heera|kalpana|aditi|raveena|female|woman|lekha|veena/i;

let voices = [];
let prefs = { en: null, hi: null }; // voiceURI chosen by parent
let token = 0; // increments on cancel; stale speech loops stop
let currentAudio = null;
let muted = false;

const nativeTTS = () => window.Capacitor?.Plugins?.TextToSpeech || null;
// Automated tests set localStorage 'tara.fast' = '1' to skip real speech.
const FAST = (() => {
  try {
    return localStorage.getItem('tara.fast') === '1';
  } catch {
    return false;
  }
})();

function refreshVoices() {
  try {
    voices = window.speechSynthesis?.getVoices?.() || [];
  } catch {
    voices = [];
  }
}
if ('speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export function setVoicePrefs(p) {
  prefs = { ...prefs, ...p };
}

export function listVoices(lang) {
  refreshVoices();
  const want = LANG[lang].toLowerCase();
  return voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(want.slice(0, 2)));
}

function chooseVoice(lang) {
  refreshVoices();
  if (prefs[lang]) {
    const v = voices.find((x) => x.voiceURI === prefs[lang]);
    if (v) return v;
  }
  const want = LANG[lang].toLowerCase();
  const norm = (v) => v.lang.toLowerCase().replace('_', '-');
  const exact = voices.filter((v) => norm(v) === want);
  const loose = voices.filter((v) => norm(v).startsWith(want.slice(0, 2)));
  const pool = exact.length ? exact : loose;
  return pool.find((v) => FEMALE_HINTS.test(v.name)) || pool[0] || null;
}

const estMs = (text, rate) => 400 + (text.length * 75) / rate;

async function ttsSpeak(text, lang, rate, my) {
  if (muted || !text) return;
  if (FAST) return sleep(20);
  const n = nativeTTS();
  if (n) {
    try {
      await n.speak({ text, lang: LANG[lang], rate, pitch: 1.1, volume: 1.0, category: 'playback' });
      return;
    } catch {
      /* fall through to web speech */
    }
  }
  const ss = window.speechSynthesis;
  if (!ss || typeof SpeechSynthesisUtterance === 'undefined') {
    await sleep(estMs(text, rate)); // keeps pacing identical without a voice
    return;
  }
  await new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG[lang];
    const v = chooseVoice(lang);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = 1.1;
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    u.onend = finish;
    u.onerror = finish;
    // Chrome sometimes never fires onend: hard timeout.
    setTimeout(finish, estMs(text, rate) * 2 + 1500);
    if (my !== token) return finish();
    ss.speak(u);
  });
}

function playUrl(url, my) {
  return new Promise((resolve) => {
    if (my !== token) return resolve();
    const a = new Audio(url);
    currentAudio = a;
    a.onended = resolve;
    a.onerror = resolve;
    a.play().catch(resolve);
    setTimeout(resolve, 8000);
  });
}

// Speak a script. Resolves when finished or cancelled.
export async function say(script, { rate = 0.88, lang = 'en' } = {}) {
  const my = ++token;
  try {
    window.speechSynthesis?.cancel();
  } catch {}
  for (const seg of [].concat(script)) {
    if (my !== token) return;
    if (seg == null) continue;
    if (typeof seg === 'string') {
      await ttsSpeak(seg, lang, rate, my);
    } else if (seg.pause) {
      await sleep(seg.pause);
    } else if (seg.clip) {
      const url = await clipUrl(seg.clip);
      if (url && !FAST) await playUrl(url, my);
      else if (FAST) await sleep(20);
      else await ttsSpeak(seg.fb || '', seg.lang || lang, seg.rate || 0.7, my);
    } else if (seg.t) {
      await ttsSpeak(seg.t, seg.lang || lang, seg.rate || rate, my);
    }
  }
}

export function stop() {
  token++;
  try {
    window.speechSynthesis?.cancel();
  } catch {}
  try {
    nativeTTS()?.stop?.();
  } catch {}
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

export function setMuted(m) {
  muted = m;
  if (m) stop();
}

// ---- Synthesized sound effects (no asset files). Short and soft by design:
// celebrations must not steal attention from learning (Mayer coherence principle).
let ctx = null;
function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = 'sine', vol = 0.18) {
  const c = ac();
  if (!c || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t0 = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export const sfx = {
  correct() {
    tone(523, 0, 0.18);
    tone(659, 0.09, 0.18);
    tone(784, 0.18, 0.3);
  },
  // Gentle, non-punitive "try again" (no buzzers).
  oops() {
    tone(392, 0, 0.16, 'triangle', 0.12);
    tone(349, 0.12, 0.22, 'triangle', 0.1);
  },
  pop() {
    tone(880, 0, 0.08, 'sine', 0.12);
  },
  step(n = 0) {
    tone(440 + n * 30, 0, 0.1, 'triangle', 0.12);
  },
  fanfare() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3));
  },
  unlock() {
    ac();
  },
};
