// UI primitives: screens, top bar, Tara speaking, celebration, parent gate.
// Design rules (docs/kids-learning-app/04-ui-design-system.md):
//  - audio-first; every screen has a replay button in the same place
//  - task screens are visually calm (Fisher, Godwin & Seltman 2014)
//  - celebrations are short and informational

import { h, sleep, randInt } from './util.js';
import { say, stop, sfx } from './audio.js';
import { createTara } from './tara.js';

export const root = () => document.getElementById('app');

export function screen(cls, ...children) {
  stop();
  const r = root();
  const s = h(`section.screen.${cls}`, {}, ...children);
  r.replaceChildren(s);
  requestAnimationFrame(() => s.classList.add('in'));
  return s;
}

// Shared Tara instance moves between screens.
let tara = null;
export function getTara(size) {
  if (!tara) tara = createTara(size);
  if (size) tara.el.style.setProperty('--tara-size', size + 'px');
  return tara;
}

// Speak while animating Tara.
export async function taraSay(script, mood = 'talk', opts) {
  const t = getTara();
  t.mood(mood);
  t.talking(true);
  try {
    await say(script, opts);
  } finally {
    t.talking(false);
    if (mood === 'talk') t.mood('idle');
  }
}

// Icons drawn inline (no icon font needed offline).
export const ICON = {
  speaker: `<svg viewBox="0 0 48 48"><path d="M8 18h8l10-8v28l-10-8H8z" fill="currentColor"/><path d="M32 16c4 4 4 12 0 16M36 11c7 7 7 19 0 26" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
  home: `<svg viewBox="0 0 48 48"><path d="M6 24 24 8l18 16" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22v18h24V22" fill="currentColor"/><rect x="20" y="28" width="8" height="12" rx="2" fill="#fff"/></svg>`,
  gear: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M10 38l5-5M33 15l5-5" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
  play: `<svg viewBox="0 0 48 48"><path d="M16 10l24 14-24 14z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 48 48"><path d="M10 25l9 9 19-20" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  book: `<svg viewBox="0 0 48 48"><path d="M8 10c6-2 11-1 16 3 5-4 10-5 16-3v28c-6-2-11-1-16 3-5-4-10-5-16-3z" fill="currentColor"/><path d="M24 13v28" stroke="#fff" stroke-width="2"/></svg>`,
  hindi: `<svg viewBox="0 0 48 48"><text x="24" y="34" text-anchor="middle" font-size="28" font-family="Baloo 2" fill="currentColor">अ</text></svg>`,
};

export function iconBtn(name, label, onclick, cls = '') {
  return h(`button.icon-btn.${cls || name}`, { 'aria-label': label, onclick, html: ICON[name] });
}

// Top bar used on activity screens.
export function topBar({ onReplay, onHome, total = 0 }) {
  const dots = h('div.dots');
  for (let i = 0; i < total; i++) dots.append(h('span.dot'));
  const bar = h(
    'header.topbar',
    {},
    iconBtn('speaker', 'Hear again', onReplay, 'replay'),
    dots,
    iconBtn('home', 'Home', onHome, 'home')
  );
  bar.setProgress = (i, state) => {
    const d = dots.children[i];
    if (d) d.className = 'dot ' + state;
  };
  return bar;
}

// Short, informational celebration: a few stars, one chime (<= 1.2 s).
export async function celebrate(target, big = false) {
  sfx.correct();
  const layer = h('div.burst');
  const n = big ? 14 : 7;
  for (let i = 0; i < n; i++) {
    const s = h('span.spark', { html: i % 3 ? '★' : '✦' });
    s.style.setProperty('--dx', randInt(-120, 120) + 'px');
    s.style.setProperty('--dy', randInt(-110, -20) + 'px');
    s.style.setProperty('--hue', randInt(30, 60));
    layer.append(s);
  }
  (target || root()).append(layer);
  await sleep(big ? 1200 : 800);
  layer.remove();
}

// Parent gate: hold 2 s, then answer a multiplication an adult knows instantly.
export function parentGate() {
  return new Promise((resolve) => {
    const a = randInt(6, 9),
      b = randInt(6, 9);
    let typed = '';
    const shown = h('div.gate-typed', {}, '');
    const close = (ok) => {
      overlay.remove();
      resolve(ok);
    };
    const key = (k) =>
      h(
        'button.key',
        {
          onclick: () => {
            if (k === '⌫') typed = typed.slice(0, -1);
            else if (typed.length < 3) typed += k;
            shown.textContent = typed;
            if (Number(typed) === a * b) close(true);
            else if (typed.length >= String(a * b).length && Number(typed) !== a * b) {
              shown.classList.add('bad');
              setTimeout(() => {
                typed = '';
                shown.textContent = '';
                shown.classList.remove('bad');
              }, 500);
            }
          },
        },
        k
      );
    const overlay = h(
      'div.gate',
      {},
      h(
        'div.gate-card',
        {},
        h('p.gate-title', {}, 'For grown-ups'),
        h('p.gate-q', {}, `${a} × ${b} = ?`),
        shown,
        h('div.keypad', {}, ...'123456789'.split('').map(key), key('⌫'), key('0'), h('button.key.cancel', { onclick: () => close(false) }, '✕'))
      )
    );
    root().append(overlay);
  });
}

// Long-press helper (parent entry points are long-press so toddlers can't trigger them).
export function longPress(el, ms, fn) {
  let t = null;
  const start = (e) => {
    e.preventDefault();
    el.classList.add('pressing');
    t = setTimeout(() => {
      el.classList.remove('pressing');
      fn();
    }, ms);
  };
  const cancel = () => {
    clearTimeout(t);
    el.classList.remove('pressing');
  };
  el.addEventListener('pointerdown', start);
  el.addEventListener('pointerup', cancel);
  el.addEventListener('pointerleave', cancel);
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
