// Logic, spatial and executive-function games (LG, SP, EF).
// EF games are practice inside play (Diamond & Lee 2011), not "IQ training".

import { h, shuffle, pick, sample, randInt, sleep } from '../core/util.js';
import { say, sfx } from '../core/audio.js';
import { getTara, taraSay, celebrate } from '../core/ui.js';
import { WORDS, inCat, COLOURS } from '../content/words.js';
import { pic, nChoices, fresh, choicesOf, shape, asym, ASYM } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });

// ---------- find the same (L0) ----------
export const match = {
  intro: () => ['Find the same picture!'],
  gen(skill, ctx) {
    const pool = WORDS.filter((x) => x.c.includes('animals') || x.c.includes('toys') || x.c.includes('fruits'));
    const t = fresh(pool, ctx, (x) => x.w);
    const choices = choicesOf(t, pool.filter((x) => x.w !== t.w), nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.w);
    return {
      key: t.w,
      visual: h('div.target', {}, pic(t.e, t.w)),
      say: ['Find the same one!'],
      sayHi: [hi('एक जैसी तस्वीर ढूँढो!')],
      choices,
      answer: t.w,
      right: [`The same ${t.w}!`],
      wrong: () => ['Look again. Which one looks just the same?'],
    };
  },
};

// ---------- odd one out ----------
const EASY = [
  ['animals', 'vehicles'],
  ['fruits', 'clothes'],
  ['animals', 'food'],
  ['vehicles', 'body'],
];
const HARD = [
  ['fruits', 'vegetables'],
  ['animals', 'people'],
  ['clothes', 'toys'],
  ['vehicles', 'home'],
];
export const oddone = {
  intro: () => ['One of these does not belong. Can you find it?'],
  gen(skill, ctx) {
    const pairs = skill.params.hard ? HARD : EASY;
    const [a, b] = shuffle(fresh(pairs, ctx, (p) => p.join()));
    const same = sample(inCat(a).filter((x) => !x.c.includes(b)), ctx.mode === 'tiny' ? 2 : 3);
    const odd = pick(inCat(b).filter((x) => !x.c.includes(a)));
    const choices = shuffle([...same, odd]).map((x) => ({ id: x.w, node: pic(x.e, x.w) }));
    return {
      key: a + b,
      say: ['Which one does not belong?'],
      sayHi: [hi('इनमें से कौन अलग है?')],
      choices,
      answer: odd.w,
      right: [`Yes! The others are ${a === 'food' ? 'food' : a}. The ${odd.w} is different.`],
      wrong: (id) => [`The ${id} goes with the others. Look again.`],
      explain: [`The ${odd.w} is not like the others.`],
    };
  },
};

// ---------- mental rotation (Uttal et al. 2013: spatial skills are trainable) ----------
export const rotate = {
  intro: () => ['Some shapes are turned around. Find the one that is the SAME shape, just turned.'],
  gen(skill, ctx) {
    const name = fresh(Object.keys(ASYM), ctx);
    const angles = skill.params.hard ? [90, 135, 180, 270] : [45, 90, 180];
    const target = asym(name, { color: '#4AA8D8' });
    const n = Math.min(nChoices(ctx, [2, 3, 3, 4]), skill.params.n || 3);
    const opts = [{ id: 'same', node: asym(name, { rot: pick(angles) }) }];
    for (let i = 1; i < n; i++) opts.push({ id: 'mirror' + i, node: asym(name, { rot: pick(angles), flip: true }) });
    return {
      key: name,
      visual: h('div.target', {}, target),
      say: ['Which one is the same shape, just turned?'],
      sayHi: [hi('कौन सा आकार वही है, बस घूमा हुआ?')],
      choices: shuffle(opts),
      answer: 'same',
      right: ['Yes! It is the same shape, turned around.'],
      wrong: () => ['That one is flipped, like in a mirror. Try again.'],
      explain: ['This one is the same. Imagine turning it.'],
    };
  },
};

// ---------- DCCS: sort by colour, then switch to shape (Zelazo 2006) ----------
const DC = [
  { shape: 'star', color: '#E53935', cname: 'red' },
  { shape: 'circle', color: '#1E88E5', cname: 'blue' },
];
export const dccs = {
  intro: () => ['A sorting game! Listen to the rule. The rule can change!'],
  gen(skill, ctx) {
    const i = ctx.prev.length; // item index in this round
    const border = ctx.diff >= 2;
    let rule = i < 2 ? 'colour' : 'shape';
    let card;
    // test cards conflict: shape of one box, colour of the other
    const flip = Math.random() < 0.5;
    card = flip ? { shape: DC[0].shape, color: DC[1].color } : { shape: DC[1].shape, color: DC[0].color };
    let hasBorder = false;
    if (border) {
      hasBorder = Math.random() < 0.5;
      rule = hasBorder ? 'colour' : 'shape';
    }
    const ansIdx = rule === 'colour' ? DC.findIndex((d) => d.color === card.color) : DC.findIndex((d) => d.shape === card.shape);
    const boxes = DC.map((d, k) => ({ id: k, node: h('span.dccs-box', {}, shape(d.shape, { color: d.color })) }));
    const cardNode = h(`div.target.dccs-card${hasBorder ? '.bordered' : ''}`, {}, shape(card.shape, { color: card.color }));
    const sayRule = border
      ? [hasBorder ? 'This card has a border. Border means COLOUR game!' : 'No border. That means SHAPE game!']
      : i === 2
      ? ['Now the rule changes! We play the SHAPE game. Match the shape, not the colour.']
      : [rule === 'colour' ? 'Colour game! Put it with the same colour.' : 'Shape game! Put it with the same shape.'];
    return {
      key: i + rule,
      visual: cardNode,
      say: sayRule,
      sayHi: [hi(rule === 'colour' ? 'रंग वाला खेल: एक जैसे रंग के साथ रखो' : 'आकार वाला खेल: एक जैसे आकार के साथ रखो')],
      choices: boxes,
      answer: ansIdx,
      right: [rule === 'colour' ? 'Same colour!' : 'Same shape!'],
      wrong: () => [rule === 'colour' ? 'Remember: colour game. Look at the colour.' : 'Remember: shape game. Look at the shape.'],
    };
  },
};

// ---------- memory pairs (custom) ----------
const MEM = ['🐘', '🦁', '🐸', '🦋', '🐢', '🦜', '🐬', '🐝'];
export const memory = {
  kind: 'custom',
  intro: () => ['Memory game! Find two cards that are the same. Remember where they are!'],
  async play(ctx, { setReplay }) {
    const { stage } = ctx;
    const pairs = ctx.mode === 'tiny' ? 2 : Math.min(ctx.skill.params.pairs + (ctx.diff >= 2 ? 1 : 0), 4);
    const faces = sample(MEM, pairs);
    const deck = shuffle([...faces, ...faces]);
    const grid = h(`div.mem.n${deck.length}`);
    const cards = deck.map((f) => {
      const c = h('button.card', {}, h('span.back', {}, '❓'), h('span.front', {}, f));
      grid.append(c);
      return c;
    });
    stage.replaceChildren(h('div.prompt.mem-wrap', {}, grid));
    setReplay(() => taraSay(['Find two cards that are the same.']));
    await taraSay(['Find the pairs!']);
    let open = [],
      found = 0,
      misses = 0,
      lock = false;
    return new Promise((resolve) => {
      cards.forEach((c, i) =>
        c.addEventListener('click', async () => {
          if (lock || c.classList.contains('up')) return;
          c.classList.add('up');
          sfx.pop();
          open.push(i);
          if (open.length === 2) {
            lock = true;
            const [a, b] = open;
            if (deck[a] === deck[b]) {
              found++;
              sfx.correct();
              cards[a].classList.add('done');
              cards[b].classList.add('done');
              open = [];
              lock = false;
              if (found === pairs) {
                celebrate(stage);
                getTara().mood('happy', 1500);
                await say(['You found them all!']);
                resolve({ ok: misses <= pairs, hinted: misses > pairs * 2, choices: 3 });
              }
            } else {
              misses++;
              await sleep(900);
              cards[a].classList.remove('up');
              cards[b].classList.remove('up');
              open = [];
              lock = false;
            }
          }
        })
      );
    });
  },
};

// ---------- go / no-go (custom): feed Tara fruit, never the cactus ----------
const GO = ['🍎', '🍌', '🍇', '🥭', '🍉', '🍊'];
const NOGO = '🌵';
export const gonogo = {
  kind: 'custom',
  intro: () => ['Tara loves fruit! When you see fruit, tap it fast. But NEVER tap the cactus. Ouch!'],
  async play(ctx, { setReplay }) {
    const { stage } = ctx;
    const trials = 10;
    const show = [1700, 1500, 1300, 1100][ctx.diff];
    const seq = shuffle([...Array(trials - 3).fill('go'), ...Array(3).fill('nogo')]);
    const spot = h('div.gng-spot');
    const score = h('div.gng-score');
    stage.replaceChildren(h('div.prompt.gng', {}, spot), score);
    setReplay(() => taraSay(['Tap fruit. Do not tap the cactus.']));
    await taraSay(['Ready? Tap fruit, not cactus!']);
    let hits = 0,
      fa = 0;
    for (const kind of seq) {
      if (ctx.isQuit()) break;
      const e = kind === 'go' ? pick(GO) : NOGO;
      let tapped = false;
      const b = h('button.gng-item', { style: { left: randInt(10, 70) + '%' } }, e);
      b.addEventListener('click', () => {
        if (tapped) return;
        tapped = true;
        if (kind === 'go') {
          hits++;
          sfx.pop();
          b.classList.add('eaten');
          score.append(h('span', {}, '🍽️'));
        } else {
          fa++;
          sfx.oops();
          b.classList.add('ouch');
        }
      });
      spot.replaceChildren(b);
      await sleep(show);
      spot.replaceChildren();
      await sleep(350);
    }
    const goN = seq.filter((x) => x === 'go').length;
    const ok = hits / goN >= 0.8 && fa <= 1;
    getTara().mood(ok ? 'happy' : 'encourage', 1500);
    await say(ok ? ['Great stopping! You did not tap the cactus.'] : fa > 1 ? ['Careful! Stop when you see the cactus. Let\'s try again soon.'] : ['Good! Try to tap faster next time.']);
    return { ok, hinted: false, choices: 2 };
  },
};
