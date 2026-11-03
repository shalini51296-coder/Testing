// Turns the curriculum banks into question items.
// Output: { q, lang, visual?, choices: [string], answer: string, explain, key }

import { MATH } from './math-gen.js';
import * as E from './english-bank.js';
import * as HB from './hindi-bank.js';
import { EVS } from './evs-bank.js';

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
function withAns(ans, pool, n = 4) {
  const others = shuffle([...new Set(pool.map(String))].filter((x) => x !== String(ans))).slice(0, n - 1);
  return shuffle([String(ans), ...others]);
}
const fresh = (pool, prev, key) => {
  const u = pool.filter((x) => !prev.includes(key(x)));
  return pick(u.length ? u : pool);
};

// ---------------- English generators ----------------
const EN = {
  vocab(p, prev) {
    const list = E.VOCAB[p.level];
    const t = fresh(list, prev, (x) => x[0]);
    const others = Object.values(E.VOCAB).flat().filter((x) => x[0] !== t[0]);
    if (Math.random() < 0.5) {
      return { key: t[0], q: `What does "${t[0]}" mean?`, choices: withAns(t[1], others.map((x) => x[1])), answer: t[1], explain: `"${t[0]}" means ${t[1]}. ${t[2]} (हिंदी: ${t[3]})` };
    }
    const blank = t[2].replace(new RegExp(`\\b${t[0]}\\w*`, 'i'), '_____');
    if (blank === t[2]) return EN.vocab(p, prev.concat(t[0]));
    return { key: t[0], q: `Choose the best word: ${blank}`, choices: withAns(t[0], list.map((x) => x[0])), answer: t[0], explain: `${t[2]} "${t[0]}" means ${t[1]}.` };
  },
  synonym(p, prev) {
    const t = fresh(E.SYNONYMS, prev, (x) => x[0]);
    return { key: t[0], q: `Which word means the SAME as "${t[0]}"?`, choices: withAns(t[1], E.ANTONYMS.flat().concat(E.SYNONYMS.map((x) => x[1]))), answer: t[1], explain: `"${t[0]}" and "${t[1]}" mean the same thing. They are synonyms.` };
  },
  antonym(p, prev) {
    const t = fresh(E.ANTONYMS, prev, (x) => x[0]);
    return { key: t[0], q: `What is the OPPOSITE of "${t[0]}"?`, choices: withAns(t[1], E.ANTONYMS.map((x) => x[1]).concat(E.SYNONYMS.map((x) => x[0]))), answer: t[1], explain: `"${t[0]}" and "${t[1]}" are opposites (antonyms).` };
  },
  plural(p, prev) {
    const t = fresh(E.IRREG_PLURALS, prev, (x) => x[0]);
    const wrong = [t[0] + 's', t[0] + 'es', t[0].replace(/y$/, 'ys'), t[0].replace(/f(e)?$/, 'fs')];
    return { key: t[0], q: `One ${t[0]}, two …?`, choices: withAns(t[1], wrong.filter((x) => x !== t[1])), answer: t[1], explain: `The plural of "${t[0]}" is "${t[1]}".` };
  },
  past(p, prev) {
    const t = fresh(E.IRREG_VERBS, prev, (x) => x[0]);
    const wrong = [t[0] + 'ed', t[0] + 'd', t[0] + 'ing', pick(E.IRREG_VERBS)[1]];
    return { key: t[0], q: `Today I ${t[0]}. Yesterday I …?`, choices: withAns(t[1], wrong.filter((x) => x !== t[1])), answer: t[1], explain: `The past tense of "${t[0]}" is "${t[1]}". It is irregular: it does not just add -ed.` };
  },
  compare(p, prev) {
    const t = fresh(E.COMPARATIVES, prev, (x) => x[0]);
    const which = Math.random() < 0.5 ? 1 : 2;
    const ans = t[which];
    const wrong = [t[0] + 'er', t[0] + 'est', 'more ' + t[0], 'most ' + t[0], t[3 - which]];
    return { key: t[0] + which, q: which === 1 ? `Fill the gap:  ${t[0]} → ____ → ${t[2]}` : `Fill the gap:  ${t[0]} → ${t[1]} → ____`, choices: withAns(ans, wrong.filter((x) => x !== ans)), answer: ans, explain: `${t[0]} → ${t[1]} (two things) → ${t[2]} (three or more).` };
  },
  contraction(p, prev) {
    const t = fresh(E.CONTRACTIONS, prev, (x) => x[0]);
    return { key: t[0], q: `What is the short form of "${t[0]}"?`, choices: withAns(t[1], E.CONTRACTIONS.map((x) => x[1])), answer: t[1], explain: `"${t[0]}" becomes "${t[1]}". The apostrophe shows where letters were left out.` };
  },
  collective(p, prev) {
    const t = fresh(E.COLLECTIVE, prev, (x) => x[0]);
    return { key: t[0], q: `A ____ of ${t[0]}`, choices: withAns(t[1], E.COLLECTIVE.map((x) => x[1])), answer: t[1], explain: `We say "a ${t[1]} of ${t[0]}".` };
  },
  gender(p, prev) {
    const t = fresh(E.GENDER, prev, (x) => x[0]);
    return { key: t[0], q: `${t[0]} → ?`, choices: withAns(t[1], E.GENDER.map((x) => x[1])), answer: t[1], explain: `The female of "${t[0]}" is "${t[1]}".` };
  },
  young(p, prev) {
    const t = fresh(E.ANIMAL_YOUNG, prev, (x) => x[0]);
    return { key: t[0], q: `A baby ${t[0]} is called a …`, choices: withAns(t[1], E.ANIMAL_YOUNG.map((x) => x[1])), answer: t[1], explain: `A young ${t[0]} is a ${t[1]}.` };
  },
  home(p, prev) {
    const t = fresh(E.ANIMAL_HOMES, prev, (x) => x[0]);
    return { key: t[0], q: `Where does a ${t[0]} live?`, choices: withAns(t[1], E.ANIMAL_HOMES.map((x) => x[1])), answer: t[1], explain: `A ${t[0]} lives in a ${t[1]}.` };
  },
  sound(p, prev) {
    const t = fresh(E.ANIMAL_SOUNDS, prev, (x) => x[0]);
    return { key: t[0], q: `A ${t[0]} …`, choices: withAns(t[1], E.ANIMAL_SOUNDS.map((x) => x[1])), answer: t[1], explain: `A ${t[0]} ${t[1]}.` };
  },
  homophone(p, prev) {
    const t = fresh(E.HOMOPHONES, prev, (x) => x[2]);
    return { key: t[2], q: t[2], choices: shuffle([t[0], t[1]]), answer: t[3], explain: `"${t[0]}" and "${t[1]}" sound the same but mean different things. Here we need "${t[3]}".` };
  },
  prefix(p, prev) {
    const t = fresh(E.PREFIXES, prev, (x) => x[0]);
    return { key: t[0], q: `In "${t[2]}", what does the prefix "${t[0]}-" mean?`, choices: withAns(t[1], E.PREFIXES.map((x) => x[1])), answer: t[1], explain: `"${t[0]}-" means "${t[1]}". ${t[2]} = ${t[0]} + ${t[2].slice(t[0].length)}.` };
  },
  suffix(p, prev) {
    const t = fresh(E.SUFFIXES, prev, (x) => x[0]);
    return { key: t[0], q: `In "${t[2]}", what does the suffix "-${t[0]}" mean?`, choices: withAns(t[1], E.SUFFIXES.map((x) => x[1])), answer: t[1], explain: `"-${t[0]}" means "${t[1]}".` };
  },
  root(p, prev) {
    const t = fresh(E.ROOTS, prev, (x) => x[0]);
    return { key: t[0], q: `The root "${t[0]}" (as in "${t[2]}") means…`, choices: withAns(t[1], E.ROOTS.map((x) => x[1])), answer: t[1], explain: `"${t[0]}" comes from Latin or Greek and means "${t[1]}". Think: ${t[2]}.` };
  },
  pos(p, prev) {
    const allowed = p.tags || ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition'];
    const pool = E.POS.filter((x) => allowed.includes(x[2]));
    const t = fresh(pool, prev, (x) => x[0] + x[1]);
    return { key: t[0] + t[1], q: `${t[0]}  What kind of word is "${t[1]}"?`, choices: withAns(t[2], allowed), answer: t[2], explain: `"${t[1]}" is a ${t[2]}: ${E.POS_MEANING[t[2]]}.` };
  },
  punct(p, prev) {
    const t = fresh(E.END_MARKS, prev, (x) => x[0]);
    const name = { '.': 'full stop', '?': 'question mark', '!': 'exclamation mark' };
    return { key: t[0], q: `Which mark ends this sentence?  "${t[0]}…"`, choices: shuffle(['.', '?', '!']), answer: t[1], explain: `It needs a ${name[t[1]]} (${t[1]}). ${t[1] === '?' ? 'It asks something.' : t[1] === '!' ? 'It shows strong feeling.' : 'It tells something.'}` };
  },
  tense(p, prev) {
    const t = fresh(E.TENSES, prev, (x) => x[0]);
    return { key: t[0], q: `"${t[0]}" Is this past, present or future?`, choices: shuffle(['past', 'present', 'future']), answer: t[1], explain: `It is in the ${t[1]} tense.` };
  },
  article(p, prev) {
    const words = [['apple', 'an'], ['umbrella', 'an'], ['egg', 'an'], ['owl', 'an'], ['ant', 'an'], ['hour', 'an'], ['banana', 'a'], ['cat', 'a'], ['uniform', 'a'], ['elephant', 'an'], ['tree', 'a'], ['ice cream', 'an'], ['house', 'a'], ['orange', 'an']];
    const t = fresh(words, prev, (x) => x[0]);
    const why = t[0] === 'hour' ? '"hour" starts with a vowel SOUND (the h is silent).' : t[0] === 'uniform' ? '"uniform" starts with a "you" sound, which is a consonant sound.' : t[1] === 'an' ? 'We use "an" before a vowel sound.' : 'We use "a" before a consonant sound.';
    return { key: t[0], q: `___ ${t[0]}`, choices: ['a', 'an'], answer: t[1], explain: `${t[1]} ${t[0]}. ${why}` };
  },
};

// ---------------- Hindi generators ----------------
const HI = {
  matra(p, prev) {
    const groups = HB.MATRA_WORDS.filter((m) => p.matras.includes(m[0]));
    const g = pick(groups);
    const [w] = fresh(g[1], prev, (x) => x[0]);
    const other = HB.MATRA_WORDS.filter((m) => m[0] !== g[0] && p.matras.concat(['ा']).includes(m[0])).flatMap((m) => m[1].map((x) => x[0]));
    if (Math.random() < 0.5) return { key: w, lang: 'hi', q: `किस शब्द में "${g[0]}" की मात्रा है?`, choices: withAns(w, other.length >= 3 ? other : HB.MATRA_WORDS.flatMap((m) => (m[0] !== g[0] ? m[1].map((x) => x[0]) : []))), answer: w, explain: `"${w}" में ${g[0]} की मात्रा है।` };
    const all = HB.MATRA_WORDS.map((m) => m[0]);
    return { key: w + 'm', lang: 'hi', q: `"${w}" में कौन सी मात्रा है?`, choices: withAns(g[0], all.filter((m) => !w.includes(m))), answer: g[0], explain: `"${w}" में ${g[0]} की मात्रा है।` };
  },
  conjunct(p, prev) {
    const t = fresh(HB.CONJUNCTS, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[2]}" में कौन सा संयुक्त अक्षर है?`, choices: withAns(t[0], HB.CONJUNCTS.map((x) => x[0])), answer: t[0], explain: `"${t[2]}" में ${t[0]} है, जो ${t[1]} से बनता है।` };
  },
  vilom(p, prev) {
    const t = fresh(HB.VILOM, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" का विलोम शब्द क्या है?`, choices: withAns(t[1], HB.VILOM.map((x) => x[1])), answer: t[1], explain: `${t[0]} का उल्टा ${t[1]} है।` };
  },
  paryay(p, prev) {
    const t = fresh(HB.PARYAY, prev, (x) => x[0]);
    const ans = pick(t[1]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" का पर्यायवाची शब्द कौन सा है?`, choices: withAns(ans, HB.PARYAY.filter((x) => x !== t).flatMap((x) => x[1])), answer: ans, explain: `${t[0]} के पर्यायवाची: ${t[1].join(', ')}।` };
  },
  ling(p, prev) {
    const t = fresh(HB.LING, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" का स्त्रीलिंग क्या है?`, choices: withAns(t[1], HB.LING.map((x) => x[1])), answer: t[1], explain: `${t[0]} (पुल्लिंग) → ${t[1]} (स्त्रीलिंग)।` };
  },
  vachan(p, prev) {
    const t = fresh(HB.VACHAN, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" का बहुवचन क्या है?`, choices: withAns(t[1], HB.VACHAN.map((x) => x[1]).concat([t[0] + 'ें', t[0] + 'ों'])), answer: t[1], explain: `एक ${t[0]}, कई ${t[1]}।` };
  },
  muhavara(p, prev) {
    const t = fresh(HB.MUHAVARE, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" मुहावरे का अर्थ क्या है?`, choices: withAns(t[1], HB.MUHAVARE.map((x) => x[1])), answer: t[1], explain: `अर्थ: ${t[1]}। उदाहरण: ${t[2]}` };
  },
  shabd(p, prev) {
    const t = fresh(HB.SHABD_BHED, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" कौन सा शब्द है?`, choices: shuffle(['संज्ञा', 'सर्वनाम', 'क्रिया', 'विशेषण']), answer: t[1], explain: `"${t[0]}" ${t[1]} है: ${HB.SHABD_MEANING[t[1]]}।` };
  },
  number(p, prev) {
    const n = Math.floor(Math.random() * (p.max - p.min + 1)) + p.min;
    const ans = HB.HI_NUMBERS[n];
    const near = [n - 1, n + 1, n + 10, n - 10, n + 9].filter((k) => k >= 1 && k <= 100).map((k) => HB.HI_NUMBERS[k]);
    if (Math.random() < 0.5) return { key: 'n' + n, lang: 'hi', q: `${n} को हिंदी में क्या कहते हैं?`, choices: withAns(ans, near), answer: ans, explain: `${n} = ${ans}` };
    const nearN = [n - 1, n + 1, n + 10, n - 10].filter((k) => k >= 1 && k <= 100);
    return { key: 'w' + n, lang: 'hi', q: `"${ans}" कौन सी संख्या है?`, choices: withAns(String(n), nearN.map(String)), answer: String(n), explain: `${ans} = ${n}` };
  },
  days(p, prev) {
    const i = Math.floor(Math.random() * 7);
    if (Math.random() < 0.5) return { key: 'd' + i, lang: 'hi', q: `${HB.DAYS_EN[i]} को हिंदी में क्या कहते हैं?`, choices: withAns(HB.DAYS[i], HB.DAYS), answer: HB.DAYS[i], explain: `${HB.DAYS_EN[i]} = ${HB.DAYS[i]}` };
    return { key: 'n' + i, lang: 'hi', q: `${HB.DAYS[i]} के बाद कौन सा दिन आता है?`, choices: withAns(HB.DAYS[(i + 1) % 7], HB.DAYS), answer: HB.DAYS[(i + 1) % 7], explain: `${HB.DAYS[i]} के बाद ${HB.DAYS[(i + 1) % 7]} आता है।` };
  },
  ritu(p, prev) {
    const t = fresh(HB.RITU, prev, (x) => x[0]);
    return { key: t[0], lang: 'hi', q: `"${t[0]}" ऋतु लगभग किन महीनों में होती है?`, choices: withAns(t[2], HB.RITU.map((x) => x[2])), answer: t[2], explain: `${t[0]} (${t[1]}): ${t[2]}। भारत में छह ऋतुएँ मानी जाती हैं।` };
  },
};

// ---------------- dispatcher ----------------
export function makeQuiz(params, prev = []) {
  if (params.bank === 'math') {
    const it = MATH[params.topic].gen();
    return { key: it.q, lang: 'en', ...it };
  }
  if (params.bank === 'en') return { lang: 'en', ...EN[params.kind](params, prev) };
  if (params.bank === 'hi') return { lang: 'hi', ...HI[params.kind](params, prev) };
  if (params.bank === 'evs') {
    const pool = EVS.filter((x) => x[0] === params.level && (!params.units || params.units.includes(x[1])));
    const t = fresh(pool, prev, (x) => x[2]);
    return { key: t[2], lang: 'en', q: t[2], choices: withAns(t[3], t[4]), answer: t[3], explain: t[5] };
  }
  throw new Error('unknown bank ' + params.bank);
}

export const EN_KINDS = Object.keys(EN);
export const HI_KINDS = Object.keys(HI);
