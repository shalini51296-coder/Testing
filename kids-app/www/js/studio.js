// Recording Studio (Parent Corner): record pure phonemes and akshara sounds in a
// real North Indian female voice. Speech synthesis cannot produce clean isolated
// phonemes, so these recordings replace the TTS fallback wherever they exist.

import { h } from './core/util.js';
import { stop } from './core/audio.js';
import { screen, iconBtn } from './core/ui.js';
import { putClip, deleteClip, listClips, clipUrl } from './core/recordings.js';
import { GROUPS, GRAPHEMES } from './content/phonics.js';
import { SWAR, VYANJAN } from './content/hindi.js';

const STOPS = new Set(['t', 'p', 'd', 'g', 'c', 'k', 'ck', 'b', 'j', 'ch', 'qu']);

function tipFor(g) {
  if (STOPS.has(g)) return 'Short and crisp. Whisper-quiet vowel: "t" not "tuh".';
  if (['s', 'f', 'sh', 'th', 'z', 'v', 'm', 'n', 'l', 'r', 'ss', 'ff', 'll'].includes(g)) return 'Hold the sound for about 1 second, no vowel at the end.';
  return 'Say the sound clearly, once.';
}

export async function openStudio() {
  stop();
  const have = await listClips();
  let rec = null;
  let chunks = [];
  let activeBtn = null;

  async function startRec(id, btn, statusEl) {
    if (rec) return stopRec();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      rec = new MediaRecorder(stream);
      chunks = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        await putClip(id, blob);
        have.add(id);
        statusEl.textContent = '✓';
        statusEl.className = 'st ok';
        btn.textContent = '● Record';
        btn.classList.remove('recording');
        rec = null;
        new Audio(await clipUrl(id)).play();
      };
      rec.start();
      activeBtn = btn;
      btn.textContent = '■ Stop';
      btn.classList.add('recording');
      setTimeout(() => rec && rec.state === 'recording' && activeBtn === btn && stopRec(), 2500);
    } catch (e) {
      alert('Microphone is not available: ' + e.message);
    }
  }
  function stopRec() {
    if (rec && rec.state === 'recording') rec.stop();
  }

  const row = (id, label, sub, tip) => {
    const st = h(`span.st${have.has(id) ? '.ok' : ''}`, {}, have.has(id) ? '✓' : '—');
    const recBtn = h('button.small-btn', {}, '● Record');
    recBtn.addEventListener('click', () => startRec(id, recBtn, st));
    return h(
      'div.srow',
      {},
      h('span.sl', {}, label),
      h('span.ss', {}, sub, h('br'), h('small', {}, tip)),
      st,
      recBtn,
      h('button.small-btn', { onclick: async () => { const u = await clipUrl(id); if (u) new Audio(u).play(); } }, '▶'),
      h('button.small-btn', { onclick: async () => { await deleteClip(id); have.delete(id); st.textContent = '—'; st.className = 'st'; } }, '✕')
    );
  };

  const en = GROUPS.flatMap((g) => g.graphemes).map((g) => row(`ph.${g}`, g, `as in "${GRAPHEMES[g].key}"`, tipFor(g)));
  const hiRows = [...SWAR, ...VYANJAN].map((x) => row(`hi.${x.l}`, x.l, x.k ? `${x.l} से ${x.k}` : '', 'Say the akshara clearly (क = "ka").'));

  screen(
    'parent studio',
    h('header.topbar', {}, h('span'), h('h2.title', {}, 'Recording Studio'), iconBtn('home', 'Back', async () => (await import('./main.js')).home(), 'home')),
    h(
      'div.parent-body',
      {},
      h('section.pcard', {},
        h('p', {}, `${have.size} recorded. Record in a quiet room, phone 20 cm from your mouth. Each recording stops after 2.5 s.`),
        h('p.small', {}, 'Reference: say the sound as in the example word, without adding "uh". Recordings stay on this phone.')
      ),
      h('section.pcard', {}, h('h3', {}, 'English letter sounds (44)'), ...en),
      h('section.pcard', {}, h('h3', {}, 'हिंदी अक्षर'), ...hiRows)
    )
  );
}
