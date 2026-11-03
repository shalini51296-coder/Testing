// Math games (MA). Trajectories: Clements & Sarama; counting: Gelman & Gallistel, Wynn,
// Sarnecka & Carey; number line: Siegler & Ramani (linear board game).
// Representations go concrete -> pictorial -> abstract (Bruner; Singapore CPA).

import { h, shuffle, pick, sample, randInt, sleep } from '../core/util.js';
import { say, sfx } from '../core/audio.js';
import { getTara, taraSay, celebrate } from '../core/ui.js';
import { HI_NUM } from '../content/hindi.js';
import { runChoiceItem } from './runner.js';
import { pic, numeral, objects, dots, nChoices, fresh, choicesOf, shape, SHAPES } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });
const THINGS = [
  { e: '🍌', w: 'bananas', one: 'banana', hi: 'केले' },
  { e: '🥭', w: 'mangoes', one: 'mango', hi: 'आम' },
  { e: '🎈', w: 'balloons', one: 'balloon', hi: 'गुब्बारे' },
  { e: '🐟', w: 'fish', one: 'fish', hi: 'मछलियाँ' },
  { e: '⭐', w: 'stars', one: 'star', hi: 'तारे' },
  { e: '🦆', w: 'ducks', one: 'duck', hi: 'बत्तखें' },
  { e: '🍎', w: 'apples', one: 'apple', hi: 'सेब' },
  { e: '🌸', w: 'flowers', one: 'flower', hi: 'फूल' },
  { e: '🐞', w: 'ladybirds', one: 'ladybird', hi: 'कीड़े' },
  { e: '🍪', w: 'biscuits', one: 'biscuit', hi: 'बिस्कुट' },
];
const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const countSay = (n) => Array.from({ length: n }, (_, i) => [NUM_WORDS[i + 1], { pause: 120 }]).flat();

// numeral with a dot strip underneath (dual coding) until she knows numerals
function numCard(n, withDots) {
  const c = h('span.numcard', {}, numeral(n));
  if (withDots && n <= 10) c.append(h('span.numdots', {}, '•'.repeat(n)));
  return c;
}
function numberChoices(ans, ctx, { min = 0, max = 10, withDots = false } = {}) {
  const n = nChoices(ctx);
  const near = [ans - 1, ans + 1, ans - 2, ans + 2, ans + 3].filter((x) => x >= Math.max(min, 0) && x <= max && x !== ans);
  return choicesOf(ans, near, n, (x) => numCard(x, withDots), (x) => x).sort((a, b) => a.id - b.id);
}

// ---------- compare quantities ----------
export const compare = {
  intro: (s) => (s.params.mode === 'onemany' ? ['One or many? Let\'s look!'] : ['Which group has more? Look carefully!']),
  gen(skill, ctx) {
    const t = pick(THINGS);
    if (skill.params.mode === 'onemany') {
      const ask = pick(['one', 'many']);
      const many = randInt(4, 7);
      const choices = shuffle([
        { id: 'one', node: objects(t.e, 1) },
        { id: 'many', node: objects(t.e, many) },
      ]);
      return {
        key: ask + t.e,
        say: ask === 'one' ? [`Where is ONE ${t.one}?`] : [`Where are MANY ${t.w}?`],
        sayHi: [hi(ask === 'one' ? `एक ${t.hi} कहाँ है?` : `बहुत सारे ${t.hi} कहाँ हैं?`)],
        choices,
        answer: ask,
        layout: 'row groups',
        right: [ask === 'one' ? `One ${t.one}!` : `Many ${t.w}!`],
        wrong: () => [ask === 'one' ? 'That is many. Find just one.' : 'That is just one. Find many.'],
      };
    }
    // ratio gets closer as difficulty rises (approximate number system: Halberda & Feigenson)
    const ratio = [0.4, 0.5, 0.67, 0.75][ctx.diff];
    const big = randInt(4, skill.params.max || 10);
    let small = Math.max(1, Math.round(big * ratio));
    if (small === big) small = big - 1;
    const askFewer = ctx.diff >= 2 && Math.random() < 0.5;
    const ans = askFewer ? 'small' : 'big';
    const choices = shuffle([
      { id: 'big', node: objects(t.e, big) },
      { id: 'small', node: objects(t.e, small) },
    ]);
    return {
      key: `${big}-${small}`,
      say: [askFewer ? `Which group has FEWER ${t.w}?` : `Which group has MORE ${t.w}?`],
      sayHi: [hi(askFewer ? `किसमें कम ${t.hi} हैं?` : `किसमें ज़्यादा ${t.hi} हैं?`)],
      choices,
      answer: ans,
      layout: 'row groups',
      right: [`${big} is more than ${small}.`],
      wrong: () => ['Let\'s count them.', `This group has ${big}. That group has ${small}.`],
      explain: [`${big} is more than ${small}.`],
    };
  },
};

// ---------- subitizing: see how many without counting ----------
export const subitize = {
  intro: () => ['Quick look! I will show some dots for a moment. How many did you see?'],
  gen(skill, ctx) {
    const max = skill.params.max;
    const n = fresh(Array.from({ length: max }, (_, i) => i + 1), ctx);
    const flashMs = [1600, 1300, 1000, 800][ctx.diff];
    const card = dots(n, { random: ctx.diff >= 2 && n > 3 });
    const opts = Array.from({ length: max }, (_, i) => i + 1).filter((x) => x !== n);
    const choices = choicesOf(n, opts, Math.min(nChoices(ctx), max), (x) => (max <= 3 ? dots(x, { random: true, color: '#F2A541' }) : numCard(x, true)), (x) => x).sort((a, b) => a.id - b.id);
    return {
      key: n,
      visual: card,
      say: ['Quick look!'],
      onShow: async (prompt) => {
        await sleep(300);
        setTimeout(() => card.classList.add('covered'), flashMs);
      },
      choices,
      answer: n,
      right: [`${NUM_WORDS[n]}!`],
      wrong: () => [`Let's look again.`],
      explain: [`It was ${NUM_WORDS[n]}.`],
    };
  },
};

// ---------- how many? (tap each to count: one-to-one support) ----------
export const howmany = {
  intro: (s) => (s.params.lang === 'hi' ? [hi('चलो गिनती करें! हर चीज़ पर टैप करके गिनो।')] : ['Let\'s count! Touch each one as you count.']),
  gen(skill, ctx) {
    const lang = skill.params.lang || 'en';
    const max = skill.params.max;
    const n = fresh(Array.from({ length: max }, (_, i) => i + 1).filter((x) => x >= (ctx.diff >= 2 ? 3 : 1)), ctx);
    const t = pick(THINGS);
    const group = objects(t.e, n, { cls: 'grid countable' });
    let counted = 0;
    [...group.children].forEach((o) =>
      o.addEventListener('click', () => {
        if (o.dataset.n) return;
        counted++;
        o.dataset.n = counted;
        o.classList.add('counted');
        sfx.step(counted);
        say([lang === 'hi' ? hi(HI_NUM[counted]) : NUM_WORDS[counted]]);
      })
    );
    const choices = numberChoices(n, ctx, { min: 1, max: Math.max(max, n + 2), withDots: ctx.diff === 0 });
    if (lang === 'hi') {
      return { key: n, visual: group, say: [hi(`कितने ${t.hi} हैं? गिनो!`)], choices, answer: n, right: [hi(`${HI_NUM[n]}!`)], wrong: () => [hi('फिर से गिनो, हर एक को छूकर।')], explain: [hi(`गिनो: ${HI_NUM.slice(1, n + 1).join(', ')}। ${HI_NUM[n]}।`)] };
    }
    return {
      key: n,
      visual: group,
      say: [`How many ${n === 1 ? t.one : t.w}? Count them!`],
      sayHi: [hi(`कितने ${t.hi} हैं?`)],
      choices,
      answer: n,
      right: [`${NUM_WORDS[n]} ${n === 1 ? t.one : t.w}!`],
      wrong: () => ['Count again. Touch each one.'],
      explain: ['Let\'s count together:', ...countSay(n), `${NUM_WORDS[n]}!`],
    };
  },
};

// ---------- numeral recognition ----------
export const numeral_ = {
  intro: () => ['Numbers! Let\'s find them.'],
  gen(skill, ctx) {
    const min = skill.params.min || 1,
      max = skill.params.max;
    const n = fresh(Array.from({ length: max - min + 1 }, (_, i) => i + min), ctx);
    const pool = Array.from({ length: max - min + 3 }, (_, i) => i + Math.max(1, min - 1)).filter((x) => x !== n);
    // teens: also offer the reversal (13 vs 31)
    if (n > 12 && ctx.diff >= 2) pool.push(Number(String(n).split('').reverse().join('')));
    const choices = choicesOf(n, pool, nChoices(ctx), (x) => numCard(x, false), (x) => x);
    return {
      key: n,
      say: [`Tap number ${NUM_WORDS[n] || n}.`],
      sayHi: [hi(`नंबर ${n} पर टैप करो`)],
      choices,
      answer: n,
      right: [`${NUM_WORDS[n] || n}!`],
      wrong: (id) => [`That is ${NUM_WORDS[id] || id}.`],
      explain: n > 10 ? [`${NUM_WORDS[n]} is ten and ${NUM_WORDS[n - 10]}. It looks like this.`] : [`${NUM_WORDS[n]} looks like this.`],
    };
  },
};

// ---------- one more / one less ----------
export const onemore = {
  intro: () => ['Tara will add one more, or take one away. Watch!'],
  gen(skill, ctx) {
    const max = skill.params.max;
    const less = ctx.diff >= 2 && Math.random() < 0.5;
    const n = randInt(less ? 2 : 1, max - 1);
    const t = pick(THINGS);
    const ans = less ? n - 1 : n + 1;
    const group = objects(t.e, n, { cls: 'grid' });
    return {
      key: `${n}${less}`,
      visual: group,
      say: [`Here are ${NUM_WORDS[n]} ${t.w}.`, less ? 'Tara takes one away.' : 'Tara adds one more.', 'How many now?'],
      sayHi: [hi(less ? 'एक कम। अब कितने?' : 'एक और। अब कितने?')],
      onShow: async () => {
        await sleep(1700);
        if (less) group.lastElementChild?.classList.add('gone');
        else group.append(h('span.obj.added', {}, t.e));
        sfx.pop();
      },
      choices: numberChoices(ans, ctx, { min: 0, max: max + 1 }),
      answer: ans,
      right: [less ? `One less than ${n} is ${ans}.` : `One more than ${n} is ${ans}.`],
      wrong: () => ['Count them now.'],
      explain: [less ? `${n}, take away one, is ${ans}.` : `${n}, and one more, is ${ans}.`],
    };
  },
};

// ---------- number bonds with a five-/ten-frame ----------
function frame(total, filled, emoji = '🔴') {
  const f = h(`div.frame.f${total}`);
  for (let i = 0; i < total; i++) f.append(h(`span.cell${i < filled ? '.on' : ''}`, {}, i < filled ? emoji : ''));
  return f;
}
export const bonds = {
  intro: (s) => [`Let's make ${NUM_WORDS[s.params.total]}! How many more do we need to fill the frame?`],
  gen(skill, ctx) {
    const total = skill.params.total;
    const k = fresh(Array.from({ length: total - 1 }, (_, i) => i + 1), ctx);
    const ans = total - k;
    return {
      key: k,
      visual: frame(total, k),
      say: [`We have ${NUM_WORDS[k]}. How many more to make ${NUM_WORDS[total]}?`],
      sayHi: [hi(`${k} हैं। ${total} बनाने के लिए और कितने चाहिए?`)],
      choices: numberChoices(ans, ctx, { min: 1, max: total }),
      answer: ans,
      right: [`${NUM_WORDS[k]} and ${NUM_WORDS[ans]} make ${NUM_WORDS[total]}.`],
      wrong: () => ['Count the empty boxes.'],
      explain: [`Count the empty boxes:`, ...countSay(ans), `${NUM_WORDS[k]} and ${NUM_WORDS[ans]} make ${NUM_WORDS[total]}.`],
    };
  },
};

// ---------- adding & taking-away stories ----------
const WHO = ['Mummy', 'Papa', 'Dadi', 'Nani', 'her friend Moti'];
export const addstory = {
  intro: (s) => (s.params.op === '+' ? ['Story sums! Listen to the story.'] : ['Take-away stories! Listen carefully.']),
  gen(skill, ctx) {
    const max = skill.params.max;
    const t = pick(THINGS);
    const who = pick(WHO);
    let a, b, ans, story;
    if (skill.params.op === '+') {
      a = randInt(1, max - 1);
      b = randInt(1, max - a);
      ans = a + b;
      story = [`Tara has ${NUM_WORDS[a]} ${a === 1 ? t.one : t.w}.`, `${who} gives her ${NUM_WORDS[b]} more.`, 'How many now?'];
    } else {
      a = randInt(2, max);
      b = randInt(1, a - 1);
      ans = a - b;
      story = [`Tara has ${NUM_WORDS[a]} ${t.w}.`, `She gives ${NUM_WORDS[b]} to ${who}.`, 'How many are left?'];
    }
    const vis = h('div.sum');
    const g1 = objects(t.e, a, { cls: 'grid' });
    vis.append(g1);
    let g2 = null;
    if (skill.params.op === '+') {
      g2 = objects(t.e, b, { cls: 'grid incoming' });
      vis.append(h('span.op', {}, '+'), g2);
    }
    const showSym = ctx.diff >= 2; // abstract notation only after pictorial success
    if (showSym) vis.append(h('span.eq', {}, `${a} ${skill.params.op === '+' ? '+' : '−'} ${b} = ?`));
    return {
      key: `${a}${b}`,
      visual: vis,
      say: story,
      onShow: async () => {
        if (skill.params.op === '-') {
          await sleep(2600);
          [...g1.children].slice(-b).forEach((o) => o.classList.add('gone'));
        } else {
          await sleep(1800);
          g2.classList.add('arrived');
        }
      },
      choices: numberChoices(ans, ctx, { min: 0, max: max }),
      answer: ans,
      right: [skill.params.op === '+' ? `${NUM_WORDS[a]} and ${NUM_WORDS[b]} make ${NUM_WORDS[ans]}.` : `${NUM_WORDS[a]} take away ${NUM_WORDS[b]} leaves ${NUM_WORDS[ans]}.`],
      wrong: () => ['Let\'s count them.'],
      explain: ['Count with me:', ...countSay(ans), `${NUM_WORDS[ans]}!`],
    };
  },
};

// ---------- patterns ----------
const PATTERN_SETS = [
  ['🍎', '🍌', '🍇'],
  ['🔴', '🔵', '🟡'],
  ['🐶', '🐱', '🐰'],
  ['⭐', '🌙', '☀️'],
  ['🚗', '🚌', '🚲'],
];
const UNIT = { AB: [0, 1], AAB: [0, 0, 1], ABB: [0, 1, 1], ABC: [0, 1, 2] };
export const pattern = {
  intro: () => ['Patterns repeat again and again. What comes next?'],
  gen(skill, ctx) {
    let kind = skill.params.kind;
    if (kind === 'AAB' && Math.random() < 0.5) kind = 'ABB';
    const set = shuffle(pick(PATTERN_SETS));
    const unit = UNIT[kind].map((i) => set[i]);
    const reps = ctx.diff >= 2 ? 2 : 3;
    const seq = Array.from({ length: unit.length * reps }, (_, i) => unit[i % unit.length]);
    const cut = seq.length - 1 - (ctx.diff >= 3 ? randInt(0, 1) : 0);
    const ans = seq[cut];
    const row = h('div.pattern', {}, ...seq.map((x, i) => (i === cut ? h('span.pslot', {}, '?') : i > cut ? h('span.pitem.faint', {}, x) : h('span.pitem', {}, x))));
    const choices = choicesOf(ans, set.filter((x) => x !== ans), Math.min(nChoices(ctx, [2, 2, 3, 3]), 3), (x) => pic(x), (x) => x);
    return {
      key: kind + set[0],
      visual: row,
      say: ['What comes next in the pattern?'],
      sayHi: [hi('पैटर्न में आगे क्या आएगा?')],
      choices,
      answer: ans,
      right: ['Yes! The pattern repeats.'],
      wrong: () => ['Say the pattern with me, then look again.'],
      explain: ['This one keeps the pattern going.'],
    };
  },
};

// ---------- shapes (non-prototypical orientations: Clements et al. 1999) ----------
const SHAPE_COLORS = ['#F2A541', '#4AA8D8', '#7BC67E', '#E9788F', '#9C7BD9'];
export const shapes = {
  intro: () => ['Shapes are everywhere! Let\'s find them.'],
  gen(skill, ctx) {
    const names = Object.keys(SHAPES).slice(0, skill.params.set);
    const t = fresh(names, ctx);
    const rot = () => (ctx.diff >= 1 ? pick([0, 15, 45, 90, 180, 200]) : 0);
    const choices = choicesOf(t, names.filter((x) => x !== t), nChoices(ctx), (x) => shape(x, { color: pick(SHAPE_COLORS), rot: rot() }), (x) => x);
    return {
      key: t,
      say: [`Tap the ${SHAPES[t].en}.`],
      sayHi: [hi(`${SHAPES[t].hi} पर टैप करो`)],
      choices,
      answer: t,
      right: [t === 'triangle' ? 'A triangle has three sides, even when it is turned!' : t === 'square' ? 'A square has four equal sides.' : `That is a ${SHAPES[t].en}.`],
      wrong: (id) => [`That is a ${SHAPES[id].en}.`],
      explain: [`This is a ${SHAPES[t].en}.`],
    };
  },
};

// ---------- give-N: feed Tara (custom) ----------
export const feed = {
  kind: 'custom',
  intro: () => ['Tara is hungry! Give her exactly what she asks for.'],
  async play(ctx, { setReplay }) {
    const { stage } = ctx;
    const max = ctx.skill.params.max;
    const n = fresh(Array.from({ length: max }, (_, i) => i + 1), ctx);
    ctx.prev.push(n);
    const t = pick(THINGS.slice(0, 4));
    const plate = h('div.plate');
    const pile = h('div.pile');
    const avail = Math.min(10, Math.max(n + 3, 6));
    let given = 0,
      tries = 0;
    for (let i = 0; i < avail; i++) {
      const o = h('button.obj.food', {}, t.e);
      o.addEventListener('click', () => {
        if (o.parentElement === pile) {
          plate.append(o);
          given++;
          sfx.step(given);
          say([NUM_WORDS[given]]);
        } else {
          pile.append(o);
          given--;
          sfx.pop();
        }
      });
      pile.append(o);
    }
    const done = h('button.done-btn', { 'aria-label': 'Done', html: '✔' });
    stage.replaceChildren(h('div.prompt.feed-top', {}, h('div.plate-wrap', {}, plate, h('span.plate-label', {}, '🍽️'))), h('div.feed-bottom', {}, pile, done));
    const ask = () => taraSay([`Give me ${NUM_WORDS[n]} ${n === 1 ? t.one : t.w}, please!`]);
    setReplay(ask);
    await ask();
    const tara = getTara();
    return new Promise((resolve) => {
      done.addEventListener('click', async () => {
        if (given === n) {
          tara.mood('happy', 1500);
          celebrate(stage);
          await say([`${NUM_WORDS[n]}! Yummy, thank you!`]);
          resolve({ ok: tries === 0, hinted: tries > 1, choices: 4 });
        } else {
          tries++;
          sfx.oops();
          tara.mood('encourage', 1500);
          await say(['Let\'s count:', ...countSay(given), `You gave me ${NUM_WORDS[given] || 'zero'}. I wanted ${NUM_WORDS[n]}.`, given < n ? 'Give me more!' : 'That is too many. Take some back.']);
        }
      });
    });
  },
};

// ---------- Number Race: linear board game (Siegler & Ramani 2008/2009) ----------
export const race = {
  kind: 'custom',
  intro: (s) => [`Number Race! We hop along the numbers from one to ${NUM_WORDS[s.params.to]}. Say each number as you hop!`],
  async play(ctx, { setReplay }) {
    const { stage } = ctx;
    const to = ctx.skill.params.to;
    ctx.race ||= { me: 0, tara: 0 };
    const R = ctx.race;
    const board = h(`div.board.to${to}`);
    const cells = [];
    for (let i = 1; i <= to; i++) {
      const c = h('span.bcell', {}, String(i));
      cells.push(c);
      board.append(c);
    }
    const me = h('span.token.me', {}, '🐥');
    const tt = h('span.token.tara', {}, '🐘');
    const place = () => {
      cells.forEach((c) => c.querySelectorAll('.token').forEach((x) => x.remove()));
      if (R.me) cells[R.me - 1].append(me);
      if (R.tara) cells[R.tara - 1].append(tt);
    };
    place();
    const spin = randInt(1, 2);
    const spinner = h('div.spinner', {}, dots(spin, { color: '#E8865A' }));
    const hop = h('button.hop-btn', {}, 'Hop!');
    stage.replaceChildren(h('div.prompt.race-top', {}, board), h('div.race-bottom', {}, spinner, hop));
    const hint = () => taraSay([`You got ${NUM_WORDS[spin]}. Tap hop ${spin === 1 ? 'one time' : 'two times'}, and say the numbers!`]);
    setReplay(hint);
    await hint();
    let hops = 0;
    await new Promise((res) => {
      hop.addEventListener('click', async () => {
        if (hops >= spin) return;
        hops++;
        R.me = Math.min(to, R.me + 1);
        place();
        sfx.step(R.me);
        await say([NUM_WORDS[R.me]]);
        if (hops >= spin || R.me === to) res();
      });
    });
    hop.disabled = true;
    // assessment item: which number are you on? (rendered under the board)
    const pos = R.me;
    const qArea = h('div.race-q');
    stage.querySelector('.race-bottom').replaceWith(qArea);
    const res = await runChoiceItem(
      {
        say: ['Which number are you on?'],
        sayHi: [hi('तुम किस नंबर पर हो?')],
        choices: numberChoices(pos, ctx, { min: 1, max: to }),
        answer: pos,
        right: [`${NUM_WORDS[pos]}!`],
        wrong: () => ['Look at your chick. Read the number under it.'],
        explain: [`You are on ${NUM_WORDS[pos]}.`],
      },
      { ...ctx, stage: qArea },
      { setReplay, setHi: () => {} }
    );
    // Tara's turn (keeps the game social and the board moving)
    if (R.me < to) {
      const ts = randInt(1, 2);
      for (let k = 0; k < ts && R.tara < to; k++) {
        R.tara++;
        place();
        sfx.step(R.tara);
        await say([NUM_WORDS[R.tara]], { rate: 1 });
      }
    }
    if (R.me >= to) {
      celebrate(stage, true);
      await taraSay([`You reached ${NUM_WORDS[to]}! What a race!`], 'happy');
      ctx.race = { me: 0, tara: 0 };
    } else if (R.tara >= to) {
      await taraSay(['I reached the end! Let\'s play again.'], 'happy');
      ctx.race = { me: 0, tara: 0 };
    }
    return res;
  },
};
