// Skills graph (syllabus doc 03). One node = one teachable, testable skill.
// strand codes: EN-OL EN-PA EN-PH MA SP LG EF HI SE
// game: the template that teaches/tests it; params: template settings.
// pre: prerequisite node ids (must be mastered before this unlocks).
// Levels here cover L0-L4 (about 2 to 6.5 years); later levels are added as she grows.

import { GROUPS } from './phonics.js';
import { HI_GROUPS } from './hindi.js';
import { MATH } from './curriculum/math-gen.js';

const S = [];
const add = (id, strand, level, title, game, params = {}, pre = []) =>
  S.push({ id, strand, level, title, game, params, pre });

// ---------------- English oral language (EN-OL) ----------------
add('ol.animals', 'EN-OL', 0, 'Animal words', 'showme', { cat: 'animals' });
add('ol.body', 'EN-OL', 0, 'Body words', 'showme', { cat: 'body' });
add('ol.food', 'EN-OL', 0, 'Food words', 'showme', { cat: 'food' });
add('ol.toys', 'EN-OL', 1, 'Toys and home', 'showme', { cat: 'toys home' }, ['ol.animals']);
add('ol.vehicles', 'EN-OL', 1, 'Vehicle words', 'showme', { cat: 'vehicles' }, ['ol.animals']);
add('ol.clothes', 'EN-OL', 1, 'Clothes words', 'showme', { cat: 'clothes' }, ['ol.body']);
add('ol.colours1', 'EN-OL', 1, 'Colours: red, blue, yellow, green', 'colours', { set: 4 });
add('ol.size', 'EN-OL', 1, 'Big and small', 'bigsmall', {});
add('ol.nature', 'EN-OL', 2, 'Nature words', 'showme', { cat: 'nature' }, ['ol.vehicles']);
add('ol.people', 'EN-OL', 2, 'People and helpers', 'showme', { cat: 'people' }, ['ol.toys']);
add('ol.colours2', 'EN-OL', 2, 'More colours', 'colours', { set: 10 }, ['ol.colours1']);
add('ol.categories', 'EN-OL', 2, 'Which one is a…? (categories)', 'category', {}, ['ol.food', 'ol.vehicles']);
add('ol.prep', 'EN-OL', 2, 'In, on, under, behind', 'prepositions', {}, ['ol.size']);

// ---------------- Feelings (SE) ----------------
add('se.feel1', 'SE', 1, 'Happy and sad', 'feelings', { lvl: 1 });
add('se.feel2', 'SE', 2, 'Angry, scared, surprised, sleepy', 'feelings', { lvl: 2 }, ['se.feel1']);
add('se.feel3', 'SE', 3, 'Why does Tara feel…?', 'feelings', { lvl: 3, why: true }, ['se.feel2']);

// ---------------- Phonological awareness (EN-PA) ----------------
add('pa.syllables', 'EN-PA', 2, 'Clap the syllables', 'syllables', {}, ['ol.animals']);
add('pa.rhyme', 'EN-PA', 2, 'Do they rhyme?', 'rhyme', { mode: 'pick' }, ['ol.animals']);
add('pa.first.cont', 'EN-PA', 2, 'First sound: s, m, f, n', 'firstsound', { sounds: ['s', 'm', 'f', 'n'] }, ['pa.syllables']);
add('pa.first.all', 'EN-PA', 3, 'First sound: any', 'firstsound', { sounds: 'all' }, ['pa.first.cont']);
add('pa.blend', 'EN-PA', 3, 'Blend sounds into a word', 'blend', {}, ['pa.first.cont']);
add('pa.final', 'EN-PA', 3, 'Last sound', 'firstsound', { sounds: 'all', pos: 'last' }, ['pa.first.all']);

// ---------------- Alphabet & phonics (EN-PH) ----------------
add('ph.name', 'EN-PH', 1, 'Letters in my name', 'namefind', {});
add('ph.case', 'EN-PH', 2, 'Big and small letters', 'casematch', {}, ['ph.name']);
let prevGroup = 'pa.first.cont';
for (const g of GROUPS) {
  add(`ph.${g.id}`, 'EN-PH', g.level, `Letter sounds: ${g.graphemes.join(' ')}`, 'lettersound', { group: g.id }, [prevGroup]);
  prevGroup = `ph.${g.id}`;
}
add('ph.read.g2', 'EN-PH', 3, 'Read words: s a t p i n m d', 'readword', { through: 'g2' }, ['ph.g2', 'pa.blend']);
add('ph.spell.g2', 'EN-PH', 3, 'Build words: s a t p i n m d', 'build', { through: 'g2' }, ['ph.read.g2']);
add('ph.read.g4', 'EN-PH', 3, 'Read words: + g o c k e u r', 'readword', { through: 'g4' }, ['ph.g4', 'ph.read.g2']);
add('ph.spell.g4', 'EN-PH', 3, 'Build words: + g o c k e u r', 'build', { through: 'g4' }, ['ph.read.g4', 'ph.spell.g2']);
add('ph.read.g6', 'EN-PH', 3, 'Read words: all single letters', 'readword', { through: 'g6' }, ['ph.g6', 'ph.read.g4']);
add('ph.spell.g6', 'EN-PH', 3, 'Build words: all single letters', 'build', { through: 'g6' }, ['ph.read.g6', 'ph.spell.g4']);
add('ph.read.g7', 'EN-PH', 3, 'Read words with sh ch th ng', 'readword', { through: 'g7' }, ['ph.g7', 'ph.read.g6']);
add('ph.tricky1', 'EN-PH', 3, 'Tricky words 1', 'tricky', { set: 1 }, ['ph.read.g4']);
add('ph.read.g9', 'EN-PH', 4, 'Read words with ai ee oa ar…', 'readword', { through: 'g9' }, ['ph.g9', 'ph.read.g7']);
add('ph.spell.g9', 'EN-PH', 4, 'Build longer words', 'build', { through: 'g9' }, ['ph.read.g9', 'ph.spell.g6']);
add('ph.tricky2', 'EN-PH', 4, 'Tricky words 2', 'tricky', { set: 2 }, ['ph.tricky1']);

// ---------------- Math (MA) ----------------
add('ma.onemany', 'MA', 0, 'One or many?', 'compare', { mode: 'onemany' });
add('ma.sub3', 'MA', 1, 'Quick look: 1 to 3', 'subitize', { max: 3 }, ['ma.onemany']);
add('ma.count5', 'MA', 1, 'How many? (to 5)', 'howmany', { max: 5 }, ['ma.onemany']);
add('ma.give3', 'MA', 1, 'Give Tara 1, 2 or 3', 'feed', { max: 3 }, ['ma.onemany']);
add('ma.shapes3', 'MA', 1, 'Circle, square, triangle', 'shapes', { set: 3 });
add('ma.patAB', 'MA', 1, 'Patterns: AB', 'pattern', { kind: 'AB' });
add('ma.give10', 'MA', 2, 'Give Tara up to 10', 'feed', { max: 10 }, ['ma.give3', 'ma.count5']);
add('ma.count10', 'MA', 2, 'How many? (to 10)', 'howmany', { max: 10 }, ['ma.count5']);
add('ma.sub5', 'MA', 2, 'Quick look: to 5', 'subitize', { max: 5 }, ['ma.sub3']);
add('ma.num5', 'MA', 2, 'Numbers 1–5', 'numeral', { max: 5 }, ['ma.count5']);
add('ma.num10', 'MA', 2, 'Numbers 1–10', 'numeral', { max: 10 }, ['ma.num5', 'ma.count10']);
add('ma.compare', 'MA', 2, 'More or fewer?', 'compare', { mode: 'more', max: 10 }, ['ma.count5']);
add('ma.shapes6', 'MA', 2, 'Rectangle, oval, star, heart', 'shapes', { set: 7 }, ['ma.shapes3']);
add('ma.patAAB', 'MA', 2, 'Patterns: AAB, ABB', 'pattern', { kind: 'AAB' }, ['ma.patAB']);
add('ma.race10', 'MA', 3, 'Number Race 1–10', 'race', { to: 10 }, ['ma.num10']);
add('ma.onemore', 'MA', 3, 'One more, one less', 'onemore', { max: 10 }, ['ma.num10']);
add('ma.num20', 'MA', 3, 'Numbers 11–20', 'numeral', { min: 11, max: 20 }, ['ma.race10']);
add('ma.race20', 'MA', 3, 'Number Race 1–20', 'race', { to: 20 }, ['ma.race10', 'ma.num20']);
add('ma.bonds5', 'MA', 3, 'Make 5', 'bonds', { total: 5 }, ['ma.give10', 'ma.sub5']);
add('ma.bonds10', 'MA', 3, 'Make 10', 'bonds', { total: 10 }, ['ma.bonds5']);
add('ma.add5', 'MA', 3, 'Adding stories (to 5)', 'addstory', { max: 5, op: '+' }, ['ma.bonds5']);
add('ma.sub5op', 'MA', 3, 'Taking away (to 5)', 'addstory', { max: 5, op: '-' }, ['ma.add5']);
add('ma.patABC', 'MA', 3, 'Patterns: ABC', 'pattern', { kind: 'ABC' }, ['ma.patAAB']);
add('ma.add10', 'MA', 4, 'Adding (to 10)', 'addstory', { max: 10, op: '+' }, ['ma.add5', 'ma.bonds10']);
add('ma.sub10', 'MA', 4, 'Taking away (to 10)', 'addstory', { max: 10, op: '-' }, ['ma.sub5op', 'ma.add10']);

// ---------------- Spatial & logic (SP / LG) ----------------
add('lg.match', 'LG', 0, 'Find the same', 'match', {});
add('lg.sort1', 'LG', 1, 'Odd one out (easy)', 'oddone', { hard: false }, ['lg.match']);
add('lg.oddone', 'LG', 2, 'Odd one out', 'oddone', { hard: true }, ['lg.sort1', 'ol.categories']);
add('sp.rotate', 'SP', 2, 'Same shape, turned', 'rotate', { n: 3 }, ['ma.shapes3']);
add('sp.rotate2', 'SP', 3, 'Turned shapes (harder)', 'rotate', { n: 4, hard: true }, ['sp.rotate']);

// ---------------- Executive function (EF) ----------------
add('ef.memory2', 'EF', 1, 'Memory pairs (2)', 'memory', { pairs: 2 });
add('ef.memory3', 'EF', 2, 'Memory pairs (3–4)', 'memory', { pairs: 4 }, ['ef.memory2']);
add('ef.gonogo', 'EF', 2, 'Catch the fruit, not the stones', 'gonogo', {}, []);
add('ef.dccs', 'EF', 2, 'Sort by colour, then by shape', 'dccs', {}, ['ma.shapes3', 'ol.colours1']);

// ---------------- Hindi (HI) ----------------
add('hi.animals', 'HI', 0, 'जानवर (animals)', 'showme', { cat: 'animals', lang: 'hi' });
add('hi.food', 'HI', 1, 'खाना (food)', 'showme', { cat: 'food', lang: 'hi' }, ['hi.animals']);
add('hi.home', 'HI', 2, 'घर की चीज़ें (home)', 'showme', { cat: 'home toys', lang: 'hi' }, ['hi.food']);
add('hi.colours', 'HI', 2, 'रंग (colours)', 'colours', { set: 6, lang: 'hi' }, ['ol.colours1']);
add('hi.nums', 'HI', 2, 'गिनती 1–10 (oral)', 'howmany', { max: 10, lang: 'hi' }, ['ma.count10']);
let prevHi = 'hi.home';
for (const g of HI_GROUPS) {
  // Script waits for English phonemic awareness + blending (cross-language transfer, plan §2).
  const pre = g.id === 'hs1' ? [prevHi, 'pa.blend', 'ph.read.g2'] : [prevHi];
  add(`hi.${g.id}`, 'HI', 3, `अक्षर: ${g.letters.join(' ')}`, 'hiletter', { group: g.id }, pre);
  prevHi = `hi.${g.id}`;
}
add('hi.words1', 'HI', 3, 'पहले शब्द (no matra)', 'hiword', {}, ['hi.hv2']);


// =====================================================================
// L4-L8 curriculum (about Class 1 to Class 5): homeschool scope & sequence
// (docs/kids-learning-app/05-homeschool-curriculum.md). Template: 'quiz' / 'reader'.
// =====================================================================

// ---- Maths: every generator topic is a skill. Within a level topics run in
// parallel after the level's first topic; each level opens after the previous
// level's first two topics.
{
  const byLevel = {};
  for (const [topic, m] of Object.entries(MATH)) (byLevel[m.level] ||= []).push([topic, m]);
  let prevFirst = ['ma.add10', 'ma.race20'];
  for (const lv of Object.keys(byLevel).map(Number).sort()) {
    const list = byLevel[lv];
    list.forEach(([topic, m], i) => {
      add(`mc.${topic}`, 'MA', lv, m.title, 'quiz', { bank: 'math', topic }, i === 0 ? prevFirst : [`mc.${list[0][0]}`]);
    });
    prevFirst = list.slice(0, 2).map(([t]) => `mc.${t}`);
  }
}

// ---- English language (vocabulary, grammar, morphology)
const EN_PLAN = [
  [4, 'vocab', 'Word power 1', { level: 4 }, ['ph.read.g7']],
  [4, 'antonym', 'Opposites', {}, ['ol.categories']],
  [4, 'plural', 'One and many (plurals)', {}, ['ph.read.g7']],
  [4, 'punct', 'Full stop, question mark, exclamation', {}, ['ph.tricky1']],
  [4, 'article', 'a or an?', {}, ['ph.read.g7']],
  [4, 'young', 'Animal babies', {}, ['ol.animals']],
  [4, 'sound', 'Animal sounds (words)', {}, ['ol.animals']],
  [5, 'vocab', 'Word power 2', { level: 5 }, ['en.vocab4']],
  [5, 'synonym', 'Same meaning (synonyms)', {}, ['en.antonym']],
  [5, 'past', 'Past tense (irregular verbs)', {}, ['en.plural']],
  [5, 'contraction', 'Short forms (don\'t, it\'s)', {}, ['en.punct']],
  [5, 'gender', 'Masculine and feminine', {}, ['en.young']],
  [5, 'home', 'Animal homes', {}, ['en.young']],
  [5, 'pos', 'Nouns and verbs', { tags: ['noun', 'verb'] }, ['en.vocab4']],
  [5, 'tense', 'Past, present, future', {}, ['en.past']],
  [6, 'vocab', 'Word power 3', { level: 6 }, ['en.vocab5']],
  [6, 'homophone', 'Sound-alike words', {}, ['en.vocab5']],
  [6, 'compare', 'Big, bigger, biggest', {}, ['en.past']],
  [6, 'collective', 'Collective nouns', {}, ['en.home']],
  [6, 'prefix', 'Prefixes (un-, re-, dis-)', {}, ['en.synonym']],
  [6, 'pos', 'Adjectives and pronouns', { tags: ['noun', 'verb', 'adjective', 'pronoun'] }, ['en.pos']],
  [7, 'vocab', 'Word power 4', { level: 7 }, ['en.vocab6']],
  [7, 'suffix', 'Suffixes (-ful, -less, -ness)', {}, ['en.prefix']],
  [7, 'pos', 'All parts of speech', {}, ['en.pos6']],
  [7, 'root', 'Word roots (Latin & Greek)', {}, ['en.suffix']],
  [8, 'vocab', 'Word power 5', { level: 8 }, ['en.vocab7']],
];
for (const [lv, kind, title, extra, pre] of EN_PLAN) {
  const id = kind === 'vocab' ? `en.vocab${lv}` : kind === 'pos' && lv > 5 ? `en.pos${lv}` : `en.${kind}${kind === 'root' && lv === 8 ? '8' : ''}`;
  add(id, 'EN-OL', lv, title, 'quiz', { bank: 'en', kind, ...extra }, pre);
}

// ---- Reading comprehension
add('rd.en4', 'EN-PH', 4, 'Read & answer (stories)', 'reader', { level: 4, lang: 'en' }, ['ph.read.g9']);
add('rd.en5', 'EN-PH', 5, 'Read & answer 2', 'reader', { level: 5, lang: 'en' }, ['rd.en4']);
add('rd.en6', 'EN-PH', 6, 'Read & answer 3 (non-fiction)', 'reader', { level: 6, lang: 'en' }, ['rd.en5']);
add('rd.en7', 'EN-PH', 7, 'Read & answer 4', 'reader', { level: 7, lang: 'en' }, ['rd.en6']);
add('rd.en8', 'EN-PH', 8, 'Read & answer 5', 'reader', { level: 8, lang: 'en' }, ['rd.en7']);

// ---- Hindi: matras, conjuncts, grammar, vocabulary
const HI_PLAN = [
  ['hi.matra1', 4, 'मात्राएँ: ा ि ी ु ू', 'matra', { matras: ['ा', 'ि', 'ी', 'ु', 'ू'] }, ['hi.words1']],
  ['hi.matra2', 5, 'मात्राएँ: े ै ो ौ ं ँ', 'matra', { matras: ['े', 'ै', 'ो', 'ौ', 'ं', 'ँ', 'ा'] }, ['hi.matra1']],
  ['hi.days', 5, 'सप्ताह के दिन', 'days', {}, ['hi.matra1']],
  ['hi.vilom', 5, 'विलोम शब्द', 'vilom', {}, ['hi.matra1']],
  ['hi.ling', 5, 'लिंग (स्त्रीलिंग-पुल्लिंग)', 'ling', {}, ['hi.matra1']],
  ['hi.num50', 6, 'गिनती 1–50', 'number', { min: 1, max: 50 }, ['hi.matra2']],
  ['hi.conj', 6, 'संयुक्त अक्षर', 'conjunct', {}, ['hi.matra2']],
  ['hi.vachan', 6, 'वचन (एकवचन-बहुवचन)', 'vachan', {}, ['hi.ling']],
  ['hi.ritu', 6, 'ऋतुएँ', 'ritu', {}, ['hi.days']],
  ['hi.shabd', 7, 'संज्ञा, सर्वनाम, क्रिया, विशेषण', 'shabd', {}, ['hi.vachan']],
  ['hi.paryay', 7, 'पर्यायवाची शब्द', 'paryay', {}, ['hi.vilom']],
  ['hi.num100', 8, 'गिनती 51–100', 'number', { min: 51, max: 100 }, ['hi.num50']],
  ['hi.muhavare', 8, 'मुहावरे', 'muhavara', {}, ['hi.paryay']],
];
for (const [id, lv, title, kind, extra, pre] of HI_PLAN) add(id, 'HI', lv, title, 'quiz', { bank: 'hi', kind, ...extra }, pre);
add('hi.read5', 'HI', 5, 'पढ़ो और समझो 1', 'reader', { level: 5, lang: 'hi' }, ['hi.matra2']);
add('hi.read6', 'HI', 6, 'पढ़ो और समझो 2', 'reader', { level: 6, lang: 'hi' }, ['hi.read5', 'hi.conj']);
add('hi.read7', 'HI', 7, 'पढ़ो और समझो 3', 'reader', { level: 7, lang: 'hi' }, ['hi.read6']);

// ---- EVS: science + social studies (knowledge strand KW)
const SCI = ['body', 'plants', 'animals', 'food', 'water', 'air', 'earth', 'materials', 'forces', 'env', 'safety'];
const SOC = ['india', 'world', 'history', 'civics'];
add('kw.evs2', 'KW', 2, 'World around me 1', 'quiz', { bank: 'evs', level: 2 }, ['ol.animals']);
add('kw.evs3', 'KW', 3, 'World around me 2', 'quiz', { bank: 'evs', level: 3 }, ['kw.evs2']);
let prevSci = 'kw.evs3', prevSoc = 'kw.evs3';
for (const lv of [4, 5, 6, 7, 8]) {
  add(`kw.sci${lv}`, 'KW', lv, `Science ${lv - 3}`, 'quiz', { bank: 'evs', level: lv, units: SCI }, [prevSci]);
  add(`kw.soc${lv}`, 'KW', lv, `India & the world ${lv - 3}`, 'quiz', { bank: 'evs', level: lv, units: SOC }, [prevSoc]);
  prevSci = `kw.sci${lv}`;
  prevSoc = `kw.soc${lv}`;
}

export const SKILLS = S;
export const SKILL = Object.fromEntries(S.map((s) => [s.id, s]));

// Region (world area) per strand, for the home map.
export const REGIONS = {
  'EN-OL': { name: 'Word Garden', hi: 'शब्द बगीचा', icon: '🌻', color: '#7BC67E' },
  'EN-PA': { name: 'Sound Forest', hi: 'आवाज़ का जंगल', icon: '🌳', color: '#4FB286' },
  'EN-PH': { name: 'Letter Lake', hi: 'अक्षर झील', icon: '🔤', color: '#4AA8D8' },
  MA: { name: 'Number Mountain', hi: 'गिनती पहाड़', icon: '⛰️', color: '#F2A541' },
  SP: { name: 'Shape Workshop', hi: 'आकार कारखाना', icon: '🔷', color: '#9C7BD9' },
  LG: { name: 'Puzzle Tree', hi: 'पहेली पेड़', icon: '🧩', color: '#9C7BD9' },
  EF: { name: 'Thinking Tree', hi: 'सोचने वाला पेड़', icon: '🧠', color: '#E9788F' },
  HI: { name: 'Akshar Nagar', hi: 'अक्षर नगर', icon: '🏯', color: '#E8865A' },
  SE: { name: 'Feelings Pond', hi: 'भावनाओं का तालाब', icon: '💗', color: '#E9788F' },
  KW: { name: 'Curiosity Lab', hi: 'जिज्ञासा प्रयोगशाला', icon: '🔭', color: '#3FA7A0' },
};

// Target time share by level (master plan §4.1), used by the session composer.
export function strandWeights(level) {
  if (level <= 1) return { 'EN-OL': 30, 'EN-PA': 5, 'EN-PH': 5, MA: 25, SP: 5, LG: 10, EF: 10, HI: 5, SE: 5 };
  if (level === 2) return { 'EN-OL': 15, 'EN-PA': 20, 'EN-PH': 15, MA: 25, SP: 5, LG: 5, EF: 5, HI: 5, SE: 5 };
  if (level === 3) return { 'EN-OL': 10, 'EN-PA': 10, 'EN-PH': 25, MA: 25, SP: 5, LG: 5, EF: 5, HI: 10, SE: 2, KW: 3 };
  // Class 1-5 homeschool balance (doc 05): maths and both languages daily, EVS most days
  return { 'EN-OL': 15, 'EN-PA': 2, 'EN-PH': 15, MA: 28, SP: 4, LG: 4, EF: 2, HI: 15, SE: 2, KW: 13 };
}
