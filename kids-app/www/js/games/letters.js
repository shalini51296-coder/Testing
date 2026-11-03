// Alphabet & phonics (EN-PH). Systematic synthetic phonics.
// Letters are taught as NAME + SOUND + KEY PICTURE (school uses names; reading needs sounds).
// Reading screens give "sound buttons": tap any part of a word to hear its sound,
// so she can decode independently (orthographic mapping, Ehri 2014).

import { h, shuffle, pick, sample, sleep } from '../core/util.js';
import { say, sfx } from '../core/audio.js';
import { getTara, taraSay, celebrate } from '../core/ui.js';
import { WORDS, byWord, decodable, soundOf } from '../content/words.js';
import { GROUPS, GRAPHEMES, phSeg, taughtThrough, TRICKY, ALPHABET } from '../content/phonics.js';
import { pic, letter, word, nChoices, fresh, choicesOf } from './parts.js';

const hi = (t) => ({ t, lang: 'hi' });
const CONFUSABLE = { b: ['d', 'p'], d: ['b', 'q'], p: ['q', 'b'], q: ['p', 'g'], m: ['n', 'w'], n: ['m', 'u'], u: ['n'], w: ['m'], i: ['l', 'j'], l: ['i'] };

// ---------- letters of my name ----------
export const namefind = {
  intro: (s, ctx) => [`${ctx.p.name}! Your name is made of letters. Let's find them!`],
  gen(skill, ctx) {
    const raw = /^[A-Za-z]+$/.test(ctx.p.name.replace(/\s/g, '')) ? ctx.p.name.replace(/\s/g, '') : 'Tara';
    const letters = [...new Set(raw.toUpperCase().split(''))];
    const target = ctx.diff === 0 ? letters[0] : fresh(letters, ctx);
    const others = ALPHABET.map((x) => x.toUpperCase()).filter((x) => !letters.includes(x));
    const choices = choicesOf(target, others, nChoices(ctx), (x) => letter(x), (x) => x);
    const nameRow = h(
      'div.name-row',
      {},
      ...raw.split('').map((c, i) => h(`span.name-ch${c.toUpperCase() === target ? '.hl' : ''}`, {}, i === 0 ? c.toUpperCase() : c.toLowerCase()))
    );
    return {
      key: target,
      visual: nameRow,
      say: [`Find the letter ${target}. It is in your name!`],
      sayHi: [hi(`अपने नाम का अक्षर ${target} ढूँढो`)],
      choices,
      answer: target,
      right: [`${target}! ${target} is in ${ctx.p.name}.`],
      wrong: (id) => [`That is ${id}. Look at your name again.`],
      explain: [`This is ${target}.`],
    };
  },
};

// ---------- capital ↔ small ----------
export const casematch = {
  intro: () => ['Every letter has a big shape and a small shape. Let\'s match them!'],
  gen(skill, ctx) {
    const pool = ctx.diff >= 2 ? ALPHABET : 'satpinmdgocklhbf'.split('');
    const t = fresh(pool, ctx);
    const conf = (CONFUSABLE[t] || []).filter((x) => pool.includes(x));
    const others = pool.filter((x) => x !== t);
    const distract = ctx.diff >= 2 && conf.length ? [...conf, ...sample(others, 2)] : others;
    const choices = choicesOf(t, distract, nChoices(ctx), (x) => letter(x), (x) => x);
    return {
      key: t,
      visual: h('div.target', {}, letter(t.toUpperCase(), 'big')),
      say: [`This is big ${t.toUpperCase()}. Find small ${t}.`],
      sayHi: [hi(`बड़ा ${t.toUpperCase()}, छोटा ${t} ढूँढो`)],
      choices,
      answer: t,
      right: [`Big ${t.toUpperCase()}, small ${t}.`],
      wrong: (id) => [`That is small ${id}.`],
      explain: [`Small ${t} looks like this.`],
    };
  },
};

// ---------- letter sounds ----------
function groupPool(groupId) {
  const idx = GROUPS.findIndex((g) => g.id === groupId);
  const current = GROUPS[idx].graphemes;
  const before = GROUPS.slice(0, idx).flatMap((g) => g.graphemes);
  return { current, before };
}
const keyPic = (g) => {
  const G = GRAPHEMES[g];
  return G.keyE || byWord[G.key]?.e || '❓';
};
const nameAndSound = (g) => [GRAPHEMES[g].name, 'says', phSeg(g), ', like', GRAPHEMES[g].key];

export const lettersound = {
  intro: (s) => {
    const { current } = groupPool(s.params.group);
    return ['New letters! Each letter has a name and a sound.', ...current.flatMap((g) => [...nameAndSound(g), { pause: 300 }])];
  },
  gen(skill, ctx) {
    const { current, before } = groupPool(skill.params.group);
    // 70% current group, 30% interleaved review of earlier letters (Rohrer & Taylor 2007)
    const pool = before.length && Math.random() < 0.3 ? before : current;
    const g = fresh(pool, ctx);
    const all = [...before, ...current].filter((x) => soundOf(x) !== soundOf(g));
    const mode = ctx.diff >= 1 && Math.random() < 0.4 ? 'see' : 'hear';
    if (mode === 'see') {
      // see the letter -> tap the picture that starts with its sound
      const t = { g, e: keyPic(g), w: GRAPHEMES[g].key };
      const others = all.map((x) => ({ g: x, e: keyPic(x), w: GRAPHEMES[x].key }));
      const choices = choicesOf(t, others, nChoices(ctx), (x) => pic(x.e, x.w), (x) => x.g);
      return {
        key: g,
        visual: h('div.target', { onclick: () => say([phSeg(g)]) }, letter(g, 'big')),
        say: ['What sound does this letter make? Tap the picture that starts with that sound.'],
        sayHi: [hi('यह अक्षर कौन सी आवाज़ बनाता है? उस आवाज़ वाली तस्वीर पर टैप करो।')],
        choices,
        answer: g,
        right: nameAndSound(g),
        wrong: (id) => [GRAPHEMES[id].key, 'starts with', phSeg(id), '. This letter says', phSeg(g)],
        explain: nameAndSound(g),
      };
    }
    const conf = (CONFUSABLE[g] || []).filter((x) => all.includes(x));
    const distract = ctx.diff >= 2 && conf.length ? [...conf, ...sample(all, 2)] : all;
    const choices = choicesOf(g, distract, nChoices(ctx), (x) => letter(x), (x) => x);
    return {
      key: g,
      visual: h('div.target.sound-cue', {}, pic('👂', 'listen')),
      say: ['Which letter says', phSeg(g), '?'],
      sayHi: [hi('कौन सा अक्षर यह आवाज़ बनाता है?'), phSeg(g)],
      choices,
      answer: g,
      right: nameAndSound(g),
      wrong: (id) => [`That is ${GRAPHEMES[id].name}. It says`, phSeg(id), '. Find', phSeg(g)],
      explain: nameAndSound(g),
    };
  },
};

// A written word with tappable "sound buttons" under each grapheme.
export function soundButtonWord(graphemes) {
  const w = h('div.sbw');
  graphemes.forEach((g) => {
    const part = h('button.sb', { onclick: (e) => { e.stopPropagation(); sfx.pop(); say([phSeg(g)]); } }, h('span.sb-g', {}, g), h('span.sb-dot', {}, g.length > 1 ? '—' : '•'));
    w.append(part);
  });
  return w;
}

// ---------- read a word -> find its picture ----------
export const readword = {
  intro: () => ['Now YOU read! Tap the letters to hear their sounds, then put them together.'],
  gen(skill, ctx) {
    const taught = taughtThrough(skill.params.through);
    const maxLen = ctx.diff >= 2 ? 5 : 4;
    let pool = decodable(taught, { maxLen });
    if (pool.length < 4) pool = decodable(taughtThrough('g6'), { maxLen: 4 });
    const t = fresh(pool, ctx, (x) => x.w);
    const near = pool.filter((x) => x.w !== t.w && (x.fs === t.fs || x.rh === t.rh));
    const others = near.length >= 2 && ctx.diff >= 1 ? near : pool.filter((x) => x.w !== t.w);
    const choices = choicesOf(t, others, nChoices(ctx, [2, 3, 3, 3]), (x) => pic(x.e, x.w), (x) => x.w);
    const segs = t.ph.flatMap((g) => [phSeg(g), { pause: 300 }]);
    return {
      key: t.w,
      visual: soundButtonWord(t.ph),
      say: ['Read the word. Then tap its picture.'],
      sayHi: [hi('शब्द पढ़ो, फिर उसकी तस्वीर पर टैप करो।')],
      choices,
      answer: t.w,
      right: [...t.ph.flatMap((g) => [phSeg(g), { pause: 100 }]), t.w],
      wrong: (id) => ['That is a', id, '. Let\'s sound it out:', ...segs],
      explain: [...segs, t.w],
      demoSay: 'Sound it out, then find the picture.',
    };
  },
};

// ---------- tricky words ----------
export const tricky = {
  intro: () => ['Some words are tricky. They have a tricky part we must remember.'],
  gen(skill, ctx) {
    const set = TRICKY.find((x) => x.set === skill.params.set).words;
    const all = TRICKY.filter((x) => x.set <= skill.params.set).flatMap((x) => x.words);
    const t = fresh(set, ctx);
    const choices = choicesOf(t, all.filter((x) => x !== t), nChoices(ctx), (x) => word(x), (x) => x);
    return {
      key: t,
      say: [`Find the word: ${t}.`],
      sayHi: [hi('यह शब्द ढूँढो:'), t],
      choices,
      answer: t,
      right: [`${t}!`],
      wrong: (id) => [`That word is ${id}. Find ${t}.`],
      explain: [`This word is ${t}.`],
    };
  },
};

// ---------- build (spell) a word with letter tiles: custom template ----------
export const build = {
  kind: 'custom',
  intro: () => ['Let\'s build words! Listen to the sounds, then tap the letters in order.'],
  async play(ctx, { setReplay }) {
    const { stage, skill } = ctx;
    const taught = taughtThrough(skill.params.through);
    const maxLen = ctx.diff >= 2 ? 5 : ctx.mode === 'tiny' ? 3 : 4;
    let pool = decodable(taught, { maxLen }).filter((x) => x.ph.length >= 2);
    if (pool.length < 3) pool = decodable(taughtThrough('g6'), { maxLen: 3 });
    const t = fresh(pool, ctx, (x) => x.w);
    ctx.prev.push(t.w);
    const extra = sample([...taught].filter((g) => !t.ph.includes(g) && g.length === 1), ctx.diff >= 1 ? 2 : 1);
    const tiles = shuffle([...t.ph, ...extra]);
    const slots = t.ph.map(() => h('span.slot'));
    const tileBtns = tiles.map((g) => h('button.tile', {}, g));
    stage.replaceChildren(
      h('div.prompt', {}, h('div.build-top', {}, pic(t.e, t.w), h('div.slots', {}, ...slots))),
      h('div.tiles', {}, ...tileBtns)
    );
    const segs = t.ph.flatMap((g) => [phSeg(g), { pause: 300 }]);
    const prompt = () => taraSay([t.w, { pause: 250 }, ...segs]);
    setReplay(prompt);
    await taraSay(['Build the word', t.w]);
    await say(segs);
    let pos = 0,
      errors = 0;
    const tara = getTara();
    return new Promise((resolve) => {
      tileBtns.forEach((b, i) => {
        b.addEventListener('click', async () => {
          if (b.disabled || ctx.isQuit()) return;
          const g = tiles[i];
          const need = t.ph[pos];
          if (soundOf(g) === soundOf(need) && g === need) {
            b.disabled = true;
            b.classList.add('used');
            slots[pos].textContent = g;
            slots[pos].classList.add('filled');
            sfx.step(pos);
            say([phSeg(g)]);
            pos++;
            if (pos === t.ph.length) {
              tara.mood('happy', 1400);
              await sleep(500);
              celebrate(stage);
              await say([...t.ph.flatMap((x) => [phSeg(x), { pause: 100 }]), t.w, '. You built it!']);
              resolve({ ok: errors === 0, hinted: errors > 1, choices: tiles.length });
            }
          } else {
            errors++;
            sfx.oops();
            b.classList.add('shake');
            setTimeout(() => b.classList.remove('shake'), 500);
            tara.mood('encourage', 1200);
            await say(['That says', phSeg(g), '. We need', phSeg(need)]);
            if (errors >= 3) tileBtns.find((x, k) => tiles[k] === need && !x.disabled)?.classList.add('pulse');
          }
        });
      });
    });
  },
};
