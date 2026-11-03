// Systematic synthetic phonics sequence (Letters and Sounds order; research doc §5.2,
// syllabus §3.3). Each grapheme: letter name (school alignment), pure-sound clip id,
// TTS fallback (approximate; replace with human recordings), action/keyword picture.
//
// Clip ids 'ph.<g>' are recorded in the Recording Studio by a North Indian female voice.
// Fallbacks for stop consonants (t, p, d, ...) unavoidably add a small vowel ("tuh");
// this is why human recording is required for phonics (master plan §8).

export const GROUPS = [
  { id: 'g1', level: 2, graphemes: ['s', 'a', 't', 'p'] },
  { id: 'g2', level: 2, graphemes: ['i', 'n', 'm', 'd'] },
  { id: 'g3', level: 3, graphemes: ['g', 'o', 'c', 'k'] },
  { id: 'g4', level: 3, graphemes: ['ck', 'e', 'u', 'r'] },
  { id: 'g5', level: 3, graphemes: ['h', 'b', 'f', 'l'] },
  { id: 'g6', level: 3, graphemes: ['ss', 'ff', 'll', 'j', 'v', 'w', 'x', 'y', 'z', 'qu'] },
  { id: 'g7', level: 3, graphemes: ['sh', 'ch', 'th', 'ng'] },
  { id: 'g8', level: 4, graphemes: ['ai', 'ee', 'igh', 'oa', 'oo'] },
  { id: 'g9', level: 4, graphemes: ['ar', 'or', 'ur', 'ow', 'oi', 'ear', 'air', 'er'] },
];

// g: grapheme; name: letter name(s) as taught in school; fb: TTS fallback; key: keyword
export const GRAPHEMES = {
  s: { name: 'ess', fb: 'sss', key: 'sun' },
  a: { name: 'ay', fb: 'aah', key: 'ant' },
  t: { name: 'tee', fb: 'tuh', key: 'tent' },
  p: { name: 'pee', fb: 'puh', key: 'pin' },
  i: { name: 'eye', fb: 'ih', key: 'ink', keyE: '🖋️' },
  n: { name: 'en', fb: 'nnn', key: 'nut' },
  m: { name: 'em', fb: 'mmm', key: 'moon' },
  d: { name: 'dee', fb: 'duh', key: 'dog' },
  g: { name: 'jee', fb: 'guh', key: 'goat' },
  o: { name: 'oh', fb: 'aw', key: 'ox', keyE: '🐂' },
  c: { name: 'see', fb: 'kuh', key: 'cat' },
  k: { name: 'kay', fb: 'kuh', key: 'king' },
  ck: { name: 'see kay', fb: 'kuh', key: 'duck' },
  e: { name: 'ee', fb: 'eh', key: 'egg' },
  u: { name: 'you', fb: 'uh', key: 'umbrella' },
  r: { name: 'ar', fb: 'rrr', key: 'rat' },
  h: { name: 'aitch', fb: 'hh', key: 'hat' },
  b: { name: 'bee', fb: 'buh', key: 'bat' },
  f: { name: 'ef', fb: 'fff', key: 'fish' },
  l: { name: 'el', fb: 'lll', key: 'leg' },
  ss: { name: 'double ess', fb: 'sss', key: 'dress' },
  ff: { name: 'double ef', fb: 'fff', key: 'cliff', keyE: '🏔️' },
  ll: { name: 'double el', fb: 'lll', key: 'bell' },
  j: { name: 'jay', fb: 'juh', key: 'jet' },
  v: { name: 'vee', fb: 'vvv', key: 'van' },
  w: { name: 'double you', fb: 'wuh', key: 'web' },
  x: { name: 'ex', fb: 'ks', key: 'box' },
  y: { name: 'why', fb: 'yuh', key: 'yak', keyE: '🐃' },
  z: { name: 'zed', fb: 'zzz', key: 'zebra' },
  qu: { name: 'cue you', fb: 'kwuh', key: 'queen' },
  sh: { name: 'ess aitch', fb: 'shhh', key: 'ship' },
  ch: { name: 'see aitch', fb: 'chuh', key: 'chick' },
  th: { name: 'tee aitch', fb: 'thhh', key: 'thumb' },
  ng: { name: 'en jee', fb: 'ng', key: 'ring' },
  ai: { name: 'ay eye', fb: 'ay', key: 'rain' },
  ee: { name: 'double ee', fb: 'ee', key: 'tree' },
  igh: { name: 'eye jee aitch', fb: 'eye', key: 'light' },
  oa: { name: 'oh ay', fb: 'oh', key: 'boat' },
  oo: { name: 'double oh', fb: 'oo', key: 'moon' },
  ar: { name: 'ay ar', fb: 'ar', key: 'car' },
  or: { name: 'oh ar', fb: 'or', key: 'fork' },
  ur: { name: 'you ar', fb: 'er', key: 'turtle' },
  ow: { name: 'oh double you', fb: 'ow', key: 'cow' },
  oi: { name: 'oh eye', fb: 'oy', key: 'coin', keyE: '🪙' },
  ear: { name: 'ee ay ar', fb: 'ear', key: 'ear' },
  air: { name: 'ay eye ar', fb: 'air', key: 'chair' },
  er: { name: 'ee ar', fb: 'uh', key: 'farmer' },
};

// Upper-case forms for case matching (single letters only).
export const UPPER = (g) => (g.length === 1 ? g.toUpperCase() : null);

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const LETTER_NAMES = {
  a: 'ay', b: 'bee', c: 'see', d: 'dee', e: 'ee', f: 'ef', g: 'jee', h: 'aitch', i: 'eye',
  j: 'jay', k: 'kay', l: 'el', m: 'em', n: 'en', o: 'oh', p: 'pee', q: 'cue', r: 'ar',
  s: 'ess', t: 'tee', u: 'you', v: 'vee', w: 'double you', x: 'ex', y: 'why', z: 'zed',
};

export function taughtThrough(groupId) {
  const set = new Set();
  for (const g of GROUPS) {
    g.graphemes.forEach((x) => set.add(x));
    if (g.id === groupId) break;
  }
  return set;
}

// Phoneme as an audio segment.
export const phSeg = (g) => ({ clip: `ph.${g}`, fb: GRAPHEMES[g]?.fb || g });

// Tricky (common exception) words, taught by mapping the irregular part, not shape.
export const TRICKY = [
  { set: 1, words: ['the', 'I', 'to', 'no', 'go', 'into'] },
  { set: 2, words: ['he', 'she', 'we', 'me', 'be', 'was', 'my', 'you', 'they', 'all', 'are', 'her'] },
];
