// Oral language & vocabulary games (EN-OL, HI oral, SE).
// Receptive first ("show me"), the earliest and most robust vocabulary measure
// (Peabody-style picture selection). Hindi helper bridges English words (Lugo-Neris 2010).

import { h, sample, shuffle, pick } from '../core/util.js';
import { WORDS, inCat, COLOURS, FEELINGS, CATEGORY_NAMES } from '../content/words.js';
import { pic, blob, nChoices, fresh, choicesOf } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });

function poolFor(cats) {
  const cs = cats.split(' ');
  const seen = new Set();
  return WORDS.filter((x) => x.c.some((c) => cs.includes(c))).filter((x) => {
    if (seen.has(x.w)) return false;
    seen.add(x.w);
    return true;
  });
}

export const showme = {
  intro: (s, ctx) =>
    s.params.lang === 'hi' ? [hi('मैं एक चीज़ का नाम बोलूँगी। तुम उसकी तस्वीर पर टैप करना।')] : ['I will say a word. You tap the picture!'],
  gen(skill, ctx) {
    const lang = skill.params.lang || 'en';
    const pool = poolFor(skill.params.cat);
    const t = fresh(pool, ctx, (x) => x.w);
    // distractors must have a different name in the spoken language (hat/cap are both टोपी)
    const others = pool.filter((x) => x.w !== t.w && (lang === 'hi' ? x.hi !== t.hi : true));
    const n = nChoices(ctx);
    const choices = choicesOf(t, others, n, (x) => pic(x.e, x.w), (x) => x.w);
    if (lang === 'hi') {
      return {
        key: t.w,
        say: [hi(`${t.hi} कहाँ है?`)],
        choices,
        answer: t.w,
        right: [hi(t.hi)],
        wrong: (id) => [hi(`यह ${WORDS.find((x) => x.w === id).hi} है। ${t.hi} ढूँढो।`)],
        explain: [hi(`यह रहा ${t.hi}। इस पर टैप करो।`)],
      };
    }
    return {
      key: t.w,
      say: [`Where is the ${t.w}?`],
      sayHi: [hi(`${t.hi} कहाँ है?`), { pause: 200 }, `${t.w}`],
      choices,
      answer: t.w,
      right: [`The ${t.w}!`],
      wrong: (id) => [`That's the ${id}. Find the ${t.w}.`],
      explain: [`Here is the ${t.w}. Tap it!`],
      demoSay: `The ${t.w}!`,
    };
  },
};

export const colours = {
  intro: () => ['Let\'s find colours!'],
  gen(skill, ctx) {
    const lang = skill.params.lang || 'en';
    const pool = COLOURS.slice(0, skill.params.set);
    const t = fresh(pool, ctx, (x) => x.w);
    const choices = choicesOf(t, pool.filter((x) => x !== t), nChoices(ctx), (x) => blob(x.hex, x.w), (x) => x.w);
    if (lang === 'hi') {
      return { key: t.w, say: [hi(`${t.hi} रंग दिखाओ`)], choices, answer: t.w, right: [hi(`${t.hi}!`)], wrong: () => [hi(`यह ${t.hi} नहीं है। फिर से देखो।`)], explain: [hi(`यह ${t.hi} है।`)] };
    }
    return {
      key: t.w,
      say: [`Tap ${t.w}.`],
      sayHi: [hi(`${t.hi} रंग`), { pause: 150 }, t.w],
      choices,
      answer: t.w,
      right: [`${t.w}!`],
      wrong: (id) => [`That's ${id}. Find ${t.w}.`],
      explain: [`This is ${t.w}.`],
    };
  },
};

export const bigsmall = {
  intro: () => ['Big and small! Listen carefully.'],
  gen(skill, ctx) {
    const t = fresh(WORDS.filter((x) => x.c.includes('animals') || x.c.includes('toys')), ctx, (x) => x.w);
    const which = pick(['big', 'small']);
    const big = h('span.pic.size-big', {}, t.e);
    const small = h('span.pic.size-small', {}, t.e);
    const choices = shuffle([
      { id: 'big', node: big },
      { id: 'small', node: small },
    ]);
    return {
      key: t.w + which,
      say: [`Tap the ${which} ${t.w}.`],
      sayHi: [hi(which === 'big' ? `बड़ा ${t.hi}` : `छोटा ${t.hi}`)],
      choices,
      answer: which,
      right: [`The ${which} ${t.w}!`],
      wrong: () => [`That one is ${which === 'big' ? 'small' : 'big'}.`],
      explain: [`This is the ${which} one.`],
    };
  },
};

const CATS = ['fruits', 'animals', 'vehicles', 'clothes', 'body', 'vegetables', 'toys'];
export const category = {
  intro: () => ['Some things go together. Let\'s find them!'],
  gen(skill, ctx) {
    const cat = fresh(CATS, ctx);
    const inside = inCat(cat);
    const t = pick(inside);
    const outside = WORDS.filter((x) => !x.c.includes(cat) && !(cat === 'fruits' && x.c.includes('food')) && !(cat === 'vegetables' && x.c.includes('food')));
    const choices = choicesOf(t, outside, nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.w);
    const name = CATEGORY_NAMES[cat];
    const article = /^[aeiou]/.test(name.en) ? 'an' : 'a';
    return {
      key: cat,
      say: [`Which one is ${article} ${name.en}?`],
      sayHi: [hi(`इनमें से ${name.hi} कौन सा है?`)],
      choices,
      answer: t.w,
      right: [`The ${t.w} is ${article} ${name.en}.`],
      wrong: (id) => [`A ${id} is not ${article} ${name.en}.`],
      explain: [`The ${t.w} is ${article} ${name.en}.`],
    };
  },
};

export const feelings = {
  intro: () => ['Let\'s talk about feelings. Everyone has feelings!'],
  gen(skill, ctx) {
    const lvl = skill.params.lvl;
    const pool = FEELINGS.filter((f) => f.lvl <= Math.max(lvl, 1) + (lvl >= 3 ? 0 : 0));
    const t = fresh(pool, ctx, (x) => x.w);
    const choices = choicesOf(t, pool.filter((x) => x !== t), Math.min(nChoices(ctx), pool.length), (x) => pic(x.e, x.w), (x) => x.w);
    if (skill.params.why) {
      return {
        key: t.w,
        say: [t.story, { pause: 300 }, 'How does Tara feel?'],
        choices,
        answer: t.w,
        right: [`Tara feels ${t.w}.`],
        wrong: (id) => [`Hmm. Would Tara feel ${id}? Think again.`],
        explain: [`Tara feels ${t.w}. ${t.story}`],
      };
    }
    return {
      key: t.w,
      say: [`Tap the ${t.w} face.`],
      sayHi: [hi(`${t.hi} चेहरा`)],
      choices,
      answer: t.w,
      right: [`That face is ${t.w}.`],
      wrong: (id) => [`That face looks ${id}.`],
      explain: [`This face is ${t.w}.`],
    };
  },
};

// Spatial language: in, on, under, behind, next to (with a cat and a box).
const PREP = {
  in: { hi: 'अंदर', cat: { left: 34, top: 18, z: 1, s: 0.8 }, box: { left: 25, top: 42 } },
  on: { hi: 'ऊपर', cat: { left: 33, top: 0, z: 3, s: 0.8 }, box: { left: 25, top: 42 } },
  under: { hi: 'नीचे', cat: { left: 33, top: 60, z: 3, s: 0.7 }, box: { left: 25, top: 4 } },
  behind: { hi: 'पीछे', cat: { left: 46, top: 28, z: 1, s: 0.75 }, box: { left: 20, top: 42 } },
  'next to': { hi: 'बगल में', cat: { left: 64, top: 46, z: 3, s: 0.7 }, box: { left: 4, top: 42 } },
};
function prepScene(k) {
  const c = PREP[k];
  const sc = h('span.scene');
  sc.append(
    h('span.scene-obj', { style: { left: c.box.left + '%', top: c.box.top + '%', zIndex: 2, fontSize: 'calc(var(--pic) * .9)' } }, '📦'),
    h('span.scene-obj', { style: { left: c.cat.left + '%', top: c.cat.top + '%', zIndex: c.cat.z, fontSize: `calc(var(--pic) * ${c.cat.s})` } }, '🐈')
  );
  return sc;
}
export const prepositions = {
  intro: () => ['Where is the cat? Look carefully!'],
  gen(skill, ctx) {
    const keys = ctx.diff >= 2 ? Object.keys(PREP) : ['in', 'on', 'under'];
    const t = fresh(keys, ctx);
    const n = Math.min(nChoices(ctx, [2, 3, 3, 3]), keys.length);
    const choices = choicesOf(t, keys.filter((x) => x !== t), n, (k) => prepScene(k), (k) => k);
    return {
      key: t,
      say: [`Tap the cat ${t} the box.`],
      sayHi: [hi(`बिल्ली डिब्बे के ${PREP[t].hi}`)],
      choices,
      answer: t,
      layout: 'row scenes',
      right: [`The cat is ${t} the box!`],
      wrong: (id) => [`Here the cat is ${id} the box.`],
      explain: [`Here the cat is ${t} the box.`],
    };
  },
};
