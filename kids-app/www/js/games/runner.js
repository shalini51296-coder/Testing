// Round runner: plays one round (4-6 items) of one skill.
//
// Pedagogy built in:
//  - "I do / we do / you do": the first item of a NEW skill is a worked example (Sweller; Renkl)
//  - choices unlock only after the spoken prompt (attention before action)
//  - help ladder on errors: informative feedback -> fewer choices + replay -> show answer
//    and let her complete it (errorless finish; no "fail" state, no lives, no timer)
//  - first-try correctness feeds BKT; hinted answers count as "not yet known"

import { h, sleep } from '../core/util.js';
import { say, stop, sfx } from '../core/audio.js';
import { getTara, taraSay, topBar, celebrate, screen } from '../core/ui.js';
import { recordItem, endRound } from '../core/engine.js';
import { GAMES } from './index.js';

const PRAISE = ['Yes!', 'Well done!', 'You got it!', 'Super!', 'Great listening!', 'Brilliant!', 'शाबाश!'];
const praise = () => {
  const x = PRAISE[Math.floor(Math.random() * PRAISE.length)];
  return /[ऀ-ॿ]/.test(x) ? { t: x, lang: 'hi' } : x;
};

export async function playRound({ p, skill, kind, mode, onHome }) {
  const game = GAMES[skill.game];
  if (!game) throw new Error('No game for ' + skill.game);
  const m = p.skills[skill.id];
  const n = kind === 'review' ? 4 : mode === 'tiny' ? 4 : 5;
  let quit = false;
  let replay = () => {};
  let replayHi = null;

  const bar = topBar({
    total: n,
    onReplay: () => replay(),
    onHome: () => {
      quit = true;
      stop();
      onHome();
    },
  });
  const hiBtn = h('button.hi-helper', { 'aria-label': 'हिंदी में सुनो', onclick: () => replayHi && replayHi() }, 'हिं');
  const stage = h('main.stage', {});
  const tara = getTara(mode === 'tiny' ? 120 : 104);
  const scr = screen(`activity.mode-${mode}.game-${skill.game}`, bar, stage, h('div.tara-dock', {}, tara.el), hiBtn);
  hiBtn.style.display = 'none';

  const ctx = { p, mode, skill, diff: m.diff, prev: [], stage, scr, isQuit: () => quit };
  let correct = 0;

  if (kind === 'new' && game.intro) {
    await taraSay(game.intro(skill, ctx), 'wave');
  }

  for (let i = 0; i < n && !quit; i++) {
    bar.setProgress(i, 'now');
    const t0 = Date.now();
    let res;
    const demo = kind === 'new' && i === 0 && game.kind !== 'custom';
    if (game.kind === 'custom') {
      res = await game.play(ctx, { setReplay: (f) => (replay = f), bar });
    } else {
      const item = game.gen(skill, ctx);
      ctx.prev.push(item.key);
      res = await runChoiceItem(item, ctx, {
        demo,
        setReplay: (f) => (replay = f),
        setHi: (f) => {
          replayHi = f;
          hiBtn.style.display = f && p.settings.helperHindi ? '' : 'none';
        },
      });
    }
    if (quit) break;
    if (!demo) {
      recordItem(p, skill.id, { correct: res.ok, hinted: res.hinted, choices: res.choices || 3, ms: Date.now() - t0 });
      if (res.ok && !res.hinted) correct++;
    } else if (res.ok) correct++; // demo item: counted toward round flow, not BKT
    bar.setProgress(i, res.ok && !res.hinted ? 'good' : 'tried');
    await sleep(250);
  }
  if (quit) return { quit: true };
  const out = endRound(p, skill.id, { correct, total: n, kind });
  return { ...out, correct, total: n };
}

// Render a choice item and resolve when finished.
// item: { say, sayHi?, visual?, choices:[{id, node, say?}], answer, right?, wrong?(id), explain?, layout? }
export async function runChoiceItem(item, ctx, { demo = false, setReplay, setHi }) {
  const { stage } = ctx;
  const tara = getTara();
  const prompt = h('div.prompt', {}, item.visual || '');
  const row = h(`div.choices.n${item.choices.length}.${item.layout || 'row'}`);
  stage.replaceChildren(prompt, row);

  const btns = item.choices.map((c) => {
    const b = h('button.choice', { 'data-id': c.id, disabled: true }, c.node);
    row.append(b);
    return b;
  });
  const correctBtn = btns[item.choices.findIndex((c) => c.id === item.answer)];

  const playPrompt = () => taraSay(item.say, 'talk');
  setReplay(playPrompt);
  setHi(item.sayHi ? () => taraSay(item.sayHi, 'talk') : null);
  if (item.onShow) item.onShow(prompt);

  await playPrompt();
  if (ctx.isQuit()) return { ok: false };

  if (demo) {
    correctBtn.classList.add('pulse');
    await taraSay(['Watch me.', item.demoSay || 'This one!', 'Now you tap it.'], 'talk');
  }
  btns.forEach((b) => (b.disabled = false));

  let wrongs = 0;
  return new Promise((resolve) => {
    let busy = false;
    btns.forEach((b, idx) => {
      b.addEventListener('click', async () => {
        if (busy || b.classList.contains('out')) return;
        busy = true;
        const c = item.choices[idx];
        if (c.id === item.answer) {
          b.classList.remove('pulse');
          b.classList.add('right');
          btns.forEach((x) => (x.disabled = true));
          tara.mood('happy', 1400);
          celebrate(b);
          await say(item.right ? [praise(), ...[].concat(item.right)] : [praise()]);
          resolve({ ok: true, hinted: wrongs > 0, choices: item.choices.length });
          return;
        }
        // wrong: informative, gentle
        wrongs++;
        sfx.oops();
        b.classList.add('shake');
        setTimeout(() => b.classList.remove('shake'), 500);
        tara.mood('encourage', 1500);
        if (wrongs === 1) {
          await say(item.wrong ? item.wrong(c.id) : ['Hmm, not that one. Try again!']);
          b.classList.add('out');
        } else if (wrongs === 2) {
          b.classList.add('out');
          // hint: leave only the answer and one other choice
          const keep = btns.filter((x) => !x.classList.contains('out') && x !== correctBtn).slice(0, 1);
          btns.forEach((x) => {
            if (x !== correctBtn && !keep.includes(x)) x.classList.add('out');
          });
          await say(['Let\'s listen again.']);
          await playPrompt();
        } else {
          b.classList.add('out');
          correctBtn.classList.add('pulse');
          await say(item.explain || ['It\'s this one. Tap it!']);
        }
        busy = false;
      });
    });
  });
}
