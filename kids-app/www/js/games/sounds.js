// Phonological & phonemic awareness (EN-PA). Oral only: no letters on screen.
// Progression: syllables -> rhyme -> first sound -> blending -> last sound (NRP 2000; Kilpatrick 2015).

import { h, shuffle, pick, sample } from '../core/util.js';
import { WORDS, soundOf } from '../content/words.js';
import { phSeg, GRAPHEMES } from '../content/phonics.js';
import { pic, nChoices, fresh, choicesOf } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });
const sylSay = (x) => x.syl.flatMap((s) => [s, { pause: 280 }]);

export const syllables = {
  intro: () => ['Words have beats. Let\'s clap them! El - e - phant. Three claps!'],
  gen(skill, ctx) {
    const max = ctx.diff >= 3 ? 4 : 3;
    const pool = WORDS.filter((x) => x.syl.length <= max && x.c.length);
    const t = fresh(pool, ctx, (x) => x.w);
    const opts = [1, 2, 3, 4].slice(0, max);
    const n = Math.min(nChoices(ctx, [2, 3, 3, 4]), opts.length);
    const choices = choicesOf(
      t.syl.length,
      opts.filter((k) => k !== t.syl.length),
      n,
      (k) => h('span.claps', {}, '👏'.repeat(k)),
      (k) => k
    ).sort((a, b) => a.id - b.id);
    return {
      key: t.w,
      visual: pic(t.e, t.w),
      say: [t.w, { pause: 300 }, 'How many claps?'],
      sayHi: [hi('कितनी ताली?'), t.w],
      choices,
      answer: t.syl.length,
      right: [...sylSay(t), `${t.syl.length} ${t.syl.length === 1 ? 'clap' : 'claps'}!`],
      wrong: () => ['Let\'s clap it slowly.', ...sylSay(t)],
      explain: ['Clap with me:', ...sylSay(t)],
    };
  },
};

function rhymePool() {
  const groups = {};
  for (const x of WORDS) if (x.rh) (groups[x.rh] ||= []).push(x);
  return Object.values(groups).filter((g) => g.length >= 2);
}

export const rhyme = {
  intro: () => ['Rhyming words sound the same at the end. Cat, hat! They rhyme!'],
  gen(skill, ctx) {
    const groups = rhymePool();
    const g = fresh(groups, ctx, (gr) => gr[0].rh);
    const [t, a] = sample(g, 2);
    const others = WORDS.filter((x) => x.rh !== t.rh && x.w !== t.w);
    // harder distractors share the first sound with the target (diff >= 2)
    const sameStart = others.filter((x) => x.fs && x.fs === t.fs);
    const pool = ctx.diff >= 2 && sameStart.length >= 2 ? sameStart.concat(sample(others, 3)) : others;
    const choices = choicesOf(a, pool, nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.w);
    return {
      key: t.rh,
      visual: h('div.target', {}, pic(t.e, t.w)),
      say: [`Which one rhymes with ${t.w}?`],
      sayHi: [hi(`कौन सा शब्द ${t.w} जैसा सुनाई देता है?`), t.w],
      choices,
      answer: a.w,
      right: [`${t.w}, ${a.w}. They rhyme!`],
      wrong: (id) => [`${t.w}, ${id}. They don't rhyme.`],
      explain: [`${t.w}, ${a.w}. Hear it? They rhyme.`],
    };
  },
};

const PA_SOUNDS = ['s', 'm', 'f', 'n', 't', 'p', 'd', 'k', 'g', 'b', 'h', 'l', 'r', 'sh', 'ch', 'a', 'e', 'i', 'o', 'u', 'j', 'w', 'z', 'v'];

export const firstsound = {
  intro: (s) =>
    s.params.pos === 'last'
      ? ['Now listen for the LAST sound in a word. Bus ends with sss.']
      : ['Every word starts with a sound. Sun starts with sss!'],
  gen(skill, ctx) {
    const last = skill.params.pos === 'last';
    const soundOfWord = (x) => (last ? (x.ph ? soundOf(x.ph[x.ph.length - 1]) : null) : x.fs);
    const allowed = skill.params.sounds === 'all' ? PA_SOUNDS : skill.params.sounds;
    const usable = WORDS.filter((x) => allowed.includes(soundOfWord(x)) && GRAPHEMES[soundOfWord(x)]);
    const sounds = [...new Set(usable.map(soundOfWord))];
    const snd = fresh(sounds, ctx);
    const t = pick(usable.filter((x) => soundOfWord(x) === snd));
    const others = WORDS.filter((x) => soundOfWord(x) && soundOfWord(x) !== snd);
    const choices = choicesOf(t, others, nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.w);
    const where = last ? 'ends' : 'starts';
    return {
      key: snd,
      say: [`Which one ${where} with`, phSeg(snd), '?'],
      sayHi: [hi(last ? 'कौन सा शब्द इस आवाज़ पर ख़त्म होता है?' : 'कौन सा शब्द इस आवाज़ से शुरू होता है?'), phSeg(snd)],
      choices,
      answer: t.w,
      right: last ? [t.w, `ends with`, phSeg(snd)] : [phSeg(snd), t.w, `starts with`, phSeg(snd)],
      wrong: (id) => {
        const x = WORDS.find((y) => y.w === id);
        return [id, `${where} with`, phSeg(soundOfWord(x)), '. Listen for', phSeg(snd)];
      },
      explain: [t.w, `${where} with`, phSeg(snd)],
    };
  },
};

export const blend = {
  intro: () => ['I will say a word in little sounds. You put them together! c - a - t. Cat!'],
  gen(skill, ctx) {
    const maxLen = ctx.diff >= 2 ? 4 : 3;
    const pool = WORDS.filter((x) => x.ph && x.ph.length >= 2 && x.ph.length <= maxLen);
    const t = fresh(pool, ctx, (x) => x.w);
    // harder: distractors share the rime or first sound
    const near = pool.filter((x) => x.w !== t.w && (x.rh === t.rh || x.fs === t.fs));
    const pool2 = ctx.diff >= 1 && near.length >= 2 ? near : pool.filter((x) => x.w !== t.w);
    const choices = choicesOf(t, pool2, nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.w);
    const segs = t.ph.flatMap((g) => [phSeg(g), { pause: 350 }]);
    return {
      key: t.w,
      say: [...segs, 'What word is it?'],
      sayHi: [hi('आवाज़ें जोड़ो'), ...segs],
      choices,
      answer: t.w,
      right: [...t.ph.flatMap((g) => [phSeg(g), { pause: 120 }]), t.w],
      wrong: (id) => [`That's ${id}. Listen again.`, ...segs],
      explain: [...segs, t.w],
    };
  },
};
