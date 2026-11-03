// Visual building blocks shared by games.
import { h, shuffle, sample, pick } from '../core/util.js';

export const pic = (emoji, label) => h('span.pic', { role: 'img', 'aria-label': label || '' }, emoji);
export const letter = (txt, cls = '') => h(`span.letter.${cls || 'en'}`, {}, txt);
export const numeral = (n) => h('span.numeral', {}, String(n));
export const blob = (hex, label) => h('span.blob', { style: { background: hex }, 'aria-label': label });
export const word = (txt) => h('span.word', {}, txt);

// Max choices by mode and difficulty (phone screen: never more than 4).
export function nChoices(ctx, base = [2, 3, 3, 4]) {
  if (ctx.mode === 'tiny') return 2;
  return base[Math.max(0, Math.min(3, ctx.diff))];
}

// Pick a target not used recently in this round.
export function fresh(pool, ctx, keyFn = (x) => x) {
  const unused = pool.filter((x) => !ctx.prev.includes(keyFn(x)));
  return pick(unused.length ? unused : pool);
}

// Build choices = target + distractors, shuffled.
export function choicesOf(target, distractors, n, nodeFn, idFn = (x) => x) {
  // unique distractors, never equal to the target
  const seen = new Set([String(idFn(target))]);
  const uniq = [];
  for (const d of distractors) {
    const k = String(idFn(d));
    if (!seen.has(k)) {
      seen.add(k);
      uniq.push(d);
    }
  }
  const set = [target, ...sample(uniq, n - 1)];
  return shuffle(set).map((x) => ({ id: idFn(x), node: nodeFn(x), raw: x }));
}

// Group of objects (for counting): arranged in a loose grid, never overlapping.
export function objects(emoji, n, { cls = '', size } = {}) {
  const g = h(`div.objs.${cls || 'grid'}`);
  if (size) g.style.setProperty('--obj', size + 'px');
  for (let i = 0; i < n; i++) g.append(h('span.obj', {}, emoji));
  return g;
}

// Dot / dice patterns for subitizing (canonical patterns first, Clements & Sarama).
const DICE = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[30, 22], [70, 22], [30, 50], [70, 50], [30, 78], [70, 78]],
};
export function dots(n, { random = false, color = '#5B6CC2' } = {}) {
  let pts = DICE[n];
  if (random || !pts) {
    pts = [];
    let guard = 0;
    while (pts.length < n && guard++ < 500) {
      const p = [15 + Math.random() * 70, 15 + Math.random() * 70];
      if (pts.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) > 20)) pts.push(p);
    }
  }
  const circles = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${color}"/>`).join('');
  return h('span.dice', { html: `<svg viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="18" fill="#fff" stroke="#D8DCF0" stroke-width="3"/>${circles}</svg>` });
}

// Shapes as SVG paths (viewBox 0 0 100 100).
export const SHAPES = {
  circle: { en: 'circle', hi: 'गोला', svg: '<circle cx="50" cy="50" r="40"/>' },
  square: { en: 'square', hi: 'वर्ग', svg: '<rect x="12" y="12" width="76" height="76" rx="4"/>' },
  triangle: { en: 'triangle', hi: 'त्रिभुज', svg: '<polygon points="50,8 92,88 8,88"/>' },
  rectangle: { en: 'rectangle', hi: 'आयत', svg: '<rect x="4" y="25" width="92" height="50" rx="4"/>' },
  oval: { en: 'oval', hi: 'अंडाकार', svg: '<ellipse cx="50" cy="50" rx="44" ry="28"/>' },
  star: { en: 'star', hi: 'तारा', svg: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"/>' },
  heart: { en: 'heart', hi: 'दिल', svg: '<path d="M50 88 C10 60 4 34 22 20 C36 10 48 18 50 28 C52 18 64 10 78 20 C96 34 90 60 50 88Z"/>' },
};
export function shape(name, { color = '#F2A541', rot = 0, flip = false, size } = {}) {
  const t = `rotate(${rot} 50 50)${flip ? ' translate(100 0) scale(-1 1)' : ''}`;
  const el = h('span.shape', { html: `<svg viewBox="0 0 100 100"><g fill="${color}" transform="${t}">${SHAPES[name].svg}</g></svg>` });
  if (size) el.style.setProperty('--shape', size + 'px');
  return el;
}

// Asymmetric shapes for mental rotation (an L-tromino-like and a flag): mirror images differ.
export const ASYM = {
  L: '<path d="M20 10h22v58h38v22H20z"/>',
  flag: '<path d="M22 8h10v84H22z M32 10h46l-12 18 12 18H32z"/>',
  boot: '<path d="M30 8h26v50h30v26H30z"/>',
  key: '<path d="M14 40h40v-12h14v12h18v18H68v14H54V58H14z"/>',
};
export function asym(name, { rot = 0, flip = false, color = '#9C7BD9' } = {}) {
  const t = `rotate(${rot} 50 50)${flip ? ' translate(100 0) scale(-1 1)' : ''}`;
  return h('span.shape', { html: `<svg viewBox="0 0 100 100"><g fill="${color}" transform="${t}">${ASYM[name]}</g></svg>` });
}
