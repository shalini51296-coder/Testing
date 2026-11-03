// Curriculum templates for ages 6+ (Explorer mode):
//  - quiz:   any bank (maths generators, English, Hindi, EVS) as a read-aloud question
//            with an explanation after every answer (retrieval + elaboration).
//  - reader: comprehension passage (read or listen), then literal / inference /
//            vocabulary / main-idea questions.

import { h } from '../core/util.js';
import { say } from '../core/audio.js';
import { taraSay, getTara } from '../core/ui.js';
import { makeQuiz } from '../content/curriculum/quizgen.js';
import { PASSAGES } from '../content/curriculum/reading.js';
import { runChoiceItem } from './runner.js';

// Make maths symbols speakable.
export function speakable(text) {
  return text
    .replace(/₹\s?(\d[\d,]*)/g, '$1 rupees')
    .replace(/×/g, ' times ')
    .replace(/÷/g, ' divided by ')
    .replace(/−/g, ' minus ')
    .replace(/□/g, ' box ')
    .replace(/☐/g, ' box ')
    .replace(/_{2,}/g, ' blank ')
    .replace(/→/g, ', ')
    .replace(/(\d+)\/(\d+)/g, '$1 over $2')
    .replace(/°/g, ' degrees')
    .replace(/\bsq m\b/g, 'square metres')
    .replace(/(\d+):(\d\d)/g, (m, a, b) => (b === '00' ? `${a} o'clock` : `${a} ${b}`));
}

const seg = (text, lang) => ({ t: lang === 'en' ? speakable(text) : text, lang });

function qNode(it) {
  const box = h('div.qbox');
  box.append(h(`div.qtext${it.lang === 'hi' ? '.hi' : ''}`, {}, it.q));
  if (it.visual) box.append(h('div.qvis', { html: it.visual }));
  return box;
}

function toItem(it) {
  const short = it.choices.every((c) => c.length <= 5);
  return {
    key: it.key || it.q,
    visual: qNode(it),
    say: [seg(it.q, it.lang)],
    choices: it.choices.map((c) => ({ id: c, node: h(`span.qchoice${it.lang === 'hi' ? '.hi' : ''}${short ? '.big' : ''}`, {}, c) })),
    answer: it.answer,
    layout: short ? 'row qshort' : 'qlist',
    right: [seg(it.explain, it.lang)],
    showExplain: it.explain,
    wrong: () => [it.lang === 'hi' ? { t: 'फिर से सोचो।', lang: 'hi' } : 'Not quite. Think again.'],
    explain: [seg(`${it.answer}. ${it.explain}`, it.lang)],
  };
}

export const quiz = {
  intro: (s) => (s.params.bank === 'hi' ? [{ t: 'चलो सोचें और सीखें!', lang: 'hi' }] : ['Let\'s think! Read the question, or tap the speaker to hear it.']),
  gen(skill, ctx) {
    const it = makeQuiz(skill.params, ctx.prev);
    return toItem(it);
  },
};

export const reader = {
  kind: 'custom',
  intro: (s) => (s.params.lang === 'hi' ? [{ t: 'कहानी पढ़ो या सुनो, फिर सवालों के जवाब दो।', lang: 'hi' }] : ['Read the passage, or tap the speaker to listen. Then answer the questions.']),
  async play(ctx, { setReplay }) {
    const { stage, skill } = ctx;
    const lang = skill.params.lang || 'en';
    ctx.rdDone ||= [];
    if (!ctx.rd || ctx.rd.qi >= ctx.rd.p.q.length) {
      const pool = PASSAGES.filter((p) => p.level === skill.params.level && p.lang === lang);
      const unread = pool.filter((p) => !ctx.rdDone.includes(p.id));
      const p = (unread.length ? unread : pool)[Math.floor(Math.random() * (unread.length || pool.length))];
      ctx.rd = { p, qi: 0 };
      ctx.rdDone.push(p.id);
      await showPassage(ctx, p, lang, setReplay);
    }
    const { p } = ctx.rd;
    const [type, q, ans, wrong] = p.q[ctx.rd.qi++];
    ctx.prev.push(p.id + ctx.rd.qi);
    const reopen = h('button.small-btn.reopen', { onclick: () => showPassage(ctx, p, lang, setReplay, true) }, lang === 'hi' ? '📖 फिर से पढ़ो' : '📖 Read again');
    const it = { lang, q, choices: [ans, ...wrong].sort(() => Math.random() - 0.5), answer: ans, explain: lang === 'hi' ? `सही उत्तर: ${ans}` : `The answer is: ${ans}.`, key: q };
    const item = toItem(it);
    item.visual = h('div.qbox', {}, h('div.qtitle', {}, p.title, ' ', reopen), h(`div.qtext${lang === 'hi' ? '.hi' : ''}`, {}, q));
    item.right = [lang === 'hi' ? { t: 'सही!', lang: 'hi' } : 'Correct!'];
    item.showExplain = null;
    return runChoiceItem(item, ctx, { setReplay, setHi: () => {} });
  },
};

function showPassage(ctx, p, lang, setReplay, overlay = false) {
  return new Promise((resolve) => {
    const read = () => taraSay([{ t: p.title, lang }, { pause: 300 }, { t: p.text, lang, rate: 0.85 }]);
    const done = h('button.big-btn.read-done', {}, lang === 'hi' ? 'पढ़ लिया ✔' : 'I have read it ✔');
    const listen = h('button.small-btn', { onclick: read }, lang === 'hi' ? '🔊 सुनो' : '🔊 Listen');
    const card = h(`div.reader${lang === 'hi' ? '.hi' : ''}`, {}, h('h3', {}, p.title), h('p', {}, p.text), h('div.row', {}, listen, done));
    if (overlay) {
      const ov = h('div.reader-ov', {}, card);
      ctx.scr.append(ov);
      done.addEventListener('click', () => {
        ov.remove();
        resolve();
      });
      return;
    }
    ctx.stage.replaceChildren(card);
    setReplay(read);
    getTara().mood('wave', 1200);
    say([lang === 'hi' ? { t: 'कहानी पढ़ो। सुनना हो तो सुनो बटन दबाओ।', lang: 'hi' } : 'Read the passage. Tap listen if you want me to read it.']);
    done.addEventListener('click', resolve);
  });
}
