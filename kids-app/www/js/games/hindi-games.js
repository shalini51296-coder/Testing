// Hindi script games (HI-SC). Akshara taught as a unit with its sound and a keyword picture.
// Instructions are in Hindi. Devanagari and Roman letters never share a matching screen.

import { h, pick } from '../core/util.js';
import { say, sfx } from '../core/audio.js';
import { HI_GROUPS, LETTER, akSeg, HI_WORDS_NOMATRA } from '../content/hindi.js';
import { pic, letter, nChoices, fresh, choicesOf } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });

function letterPools(groupId) {
  const idx = HI_GROUPS.findIndex((g) => g.id === groupId);
  return { current: HI_GROUPS[idx].letters, before: HI_GROUPS.slice(0, idx).flatMap((g) => g.letters) };
}

export const hiletter = {
  intro: (s) => {
    const { current } = letterPools(s.params.group);
    return [hi('नए अक्षर सीखते हैं!'), ...current.flatMap((l) => [akSeg(l), LETTER[l].k ? hi(`${l} से ${LETTER[l].k}`) : { pause: 200 }, { pause: 300 }])];
  },
  gen(skill, ctx) {
    const { current, before } = letterPools(skill.params.group);
    const pool = before.length && Math.random() < 0.3 ? before : current;
    const l = fresh(pool, ctx);
    const all = [...before, ...current].filter((x) => x !== l);
    const L = LETTER[l];
    const withPic = all.filter((x) => LETTER[x].e);
    if (ctx.diff >= 1 && L.e && Math.random() < 0.4 && withPic.length >= 2) {
      const choices = choicesOf(l, withPic, nChoices(ctx), (x) => pic(LETTER[x].e, LETTER[x].k), (x) => x);
      return {
        key: l,
        visual: h('div.target', { onclick: () => say([akSeg(l)]) }, letter(l, 'big deva')),
        say: [hi('यह कौन सा अक्षर है? इस अक्षर से शुरू होने वाली तस्वीर पर टैप करो।')],
        choices,
        answer: l,
        right: [akSeg(l), hi(`${l} से ${L.k}`)],
        wrong: (id) => [hi(`यह ${LETTER[id].k} है। ${LETTER[id].k} ${id} से शुरू होता है।`)],
        explain: [akSeg(l), hi(`${l} से ${L.k}`)],
      };
    }
    const choices = choicesOf(l, all, nChoices(ctx), (x) => letter(x, 'deva'), (x) => x);
    return {
      key: l,
      visual: L.e ? h('div.target', {}, pic(L.e, L.k)) : h('div.target.sound-cue', {}, pic('👂')),
      say: [hi('कौन सा अक्षर है'), akSeg(l), hi('?')],
      choices,
      answer: l,
      right: L.k ? [akSeg(l), hi(`${l} से ${L.k}`)] : [akSeg(l)],
      wrong: (id) => [hi('यह'), akSeg(id), hi('है। ढूँढो'), akSeg(l)],
      explain: [hi('यह रहा'), akSeg(l)],
    };
  },
};

export const hiword = {
  intro: () => [hi('अब तुम हिंदी शब्द पढ़ोगी! हर अक्षर पर टैप करके उसकी आवाज़ सुनो।')],
  gen(skill, ctx) {
    const t = fresh(HI_WORDS_NOMATRA, ctx, (x) => x.w);
    const choices = choicesOf(t, HI_WORDS_NOMATRA.filter((x) => x.w !== t.w), nChoices(ctx, [2, 3, 3, 3]), (x) => pic(x.e, x.w), (x) => x.w);
    const btns = h(
      'div.sbw.deva',
      {},
      ...t.l.map((l) => h('button.sb', { onclick: (e) => { e.stopPropagation(); sfx.pop(); say([akSeg(l)]); } }, h('span.sb-g', {}, l), h('span.sb-dot', {}, '•')))
    );
    return {
      key: t.w,
      visual: btns,
      say: [hi('शब्द पढ़ो, फिर उसकी तस्वीर पर टैप करो।')],
      choices,
      answer: t.w,
      right: [...t.l.map((l) => akSeg(l)), hi(t.w)],
      wrong: () => [hi('फिर से पढ़ो:'), ...t.l.map((l) => akSeg(l))],
      explain: [...t.l.map((l) => akSeg(l)), hi(t.w)],
    };
  },
};
