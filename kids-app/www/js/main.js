// App shell: onboarding -> home world -> sessions -> goodbye with off-screen mission.
import { h, today, sleep, pick } from './core/util.js';
import * as store from './core/storage.js';
import { say, stop, sfx, setVoicePrefs, listVoices } from './core/audio.js';
import { screen, getTara, taraSay, iconBtn, longPress, parentGate, celebrate, ICON } from './core/ui.js';
import { ensure, nextRound, uiMode, summary, strandLevel, available, levelForAge } from './core/engine.js';
import { SKILL, SKILLS, REGIONS } from './content/skills.js';
import { playRound } from './games/runner.js';
import { openStudio } from './studio.js';

const hi = (t) => ({ t, lang: 'hi' });

// ---------------- boot ----------------
function boot() {
  document.addEventListener('pointerdown', () => sfx.unlock(), { once: true });
  const p = store.active();
  if (!p) return onboarding();
  ensure(p);
  setVoicePrefs({ en: p.settings.voiceEn, hi: p.settings.voiceHi });
  home();
}

// ---------------- onboarding (parent) ----------------
function onboarding() {
  const name = h('input.inp', { placeholder: 'Child\'s name (e.g. Aarohi)', maxlength: 20, autocomplete: 'off' });
  const years = h('select.inp', {}, ...[2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => h('option', { value: y, selected: y === 4 }, `${y} years`)));
  const months = h('select.inp', {}, ...Array.from({ length: 12 }, (_, m) => h('option', { value: m }, `${m} months`)));
  const go = h('button.big-btn', {
    onclick: () => {
      if (!name.value.trim()) return name.focus();
      const p = store.createProfile({ name: name.value, ageMonths: Number(years.value) * 12 + Number(months.value) });
      ensure(p);
      welcome();
    },
  }, 'Start');
  screen(
    'onboard',
    h(
      'div.onboard-card',
      {},
      h('div.onboard-tara', {}, getTara(130).el),
      h('div.onboard-form', {},
        h('h1', {}, 'Hello! I am Tara.'),
        h('p.muted', {}, 'For grown-ups: tell me about your child. Everything stays on this phone.'),
        name,
        h('div.row', {}, years, months),
        go,
        h('p.small', {}, 'Tip: turn on screen pinning so your child stays in the app (Android Settings → Security → App pinning).')
      )
    )
  );
}

async function welcome() {
  const p = store.active();
  screen('welcome', h('div.center', {}, getTara(200).el));
  getTara().mood('wave');
  await taraSay([`Hello ${p.name}! I am Tara, the baby elephant.`, 'We will play and learn together!', hi('चलो खेलते हैं!')], 'wave');
  home();
}

// ---------------- limits ----------------
function limitReason(p) {
  const hr = new Date().getHours();
  if (hr >= p.settings.bedtimeHour || hr < 6) return 'bed';
  if ((p.minutes[today()] || 0) >= p.settings.dailyMinutes) return 'cap';
  return null;
}

function sleepingScreen(reason) {
  const p = store.active();
  const tara = getTara(190);
  tara.mood('sleepy');
  const gear = iconBtn('gear', 'Grown-ups', () => {}, 'gear');
  longPress(gear, 1500, async () => (await parentGate()) && parentCorner());
  screen('sleeping', h('div.night-sky'), h('div.center', {}, tara.el, h('p.sleep-text', {}, 'Zzz…')), h('div.corner-tr', {}, gear));
  say(
    reason === 'bed'
      ? [`Shh… Tara is sleeping, ${p.name}. Sleep helps your brain remember. See you tomorrow!`, hi('शुभ रात्रि!')]
      : [`We played a lot today, ${p.name}! Now it's time to play outside. See you tomorrow!`, hi('कल फिर मिलेंगे!')]
  );
}

// ---------------- home ----------------
function garden(p) {
  const n = p.stickers.length;
  const g = h('div.garden');
  const FLOWERS = ['🌼', '🌷', '🌻', '🌸', '🌺', '🪻'];
  for (let i = 0; i < Math.min(n, 40); i++) {
    const f = h('span.flower', {}, FLOWERS[i % FLOWERS.length]);
    f.style.left = ((i * 37) % 96) + 2 + '%';
    f.style.bottom = ((i * 13) % 14) + 'px';
    g.append(f);
  }
  return g;
}

function questDoors(p) {
  // up to 3 doors from different strands: she chooses (autonomy, SDT)
  const av = available(p);
  const byStrand = {};
  for (const s of av) if (!byStrand[s.strand] || s.level < byStrand[s.strand].level) byStrand[s.strand] = s;
  const picks = Object.values(byStrand).sort(() => Math.random() - 0.5).slice(0, 3);
  return picks.map((s) => {
    const r = REGIONS[s.strand];
    return h('button.door', { style: { '--c': r.color }, onclick: () => runSession(s.id) }, h('span.door-icon', {}, r.icon), h('span.door-name', {}, r.name));
  });
}

export function home() {
  stop();
  const p = store.active();
  if (!p) return onboarding();
  const why = limitReason(p);
  if (why) return sleepingScreen(why);
  const tara = getTara(uiMode(p) === 'tiny' ? 170 : 150);
  const play = h('button.play-btn', { 'aria-label': 'Play', onclick: () => runSession(null), html: ICON.play });
  const gear = iconBtn('gear', 'Grown-ups (hold)', () => {}, 'gear');
  longPress(gear, 1500, async () => (await parentGate()) && parentCorner());
  const stickers = h('button.icon-btn.stickers', { 'aria-label': 'My stickers', onclick: stickerBook }, '📒');
  const doors = uiMode(p) === 'tiny' ? [] : questDoors(p);
  screen(
    `home-screen.mode-${uiMode(p)}`,
    h('div.sky', {}, h('span.sun', {}, '☀️'), h('span.cloud.c1', {}, '☁️'), h('span.cloud.c2', {}, '☁️')),
    h('div.hills'),
    garden(p),
    h('div.home-tara', { onclick: () => taraSay([pick([`Hi ${p.name}!`, 'Shall we play?', 'I love learning with you!', 'Tap the big button to play!'])], 'wave') }, tara.el),
    h('div.home-main', {}, play, doors.length ? h('div.doors', {}, ...doors) : null),
    h('div.corner-tr', {}, stickers, gear)
  );
  tara.mood('wave', 1600);
  const firstToday = !(p.minutes[today()] > 0);
  taraSay(firstToday ? [`Hello ${p.name}!`, 'Tap the big button to play!'] : ['Tap play!'], 'wave');
}

// ---------------- session ----------------
async function runSession(firstSkillId) {
  const p = store.active();
  const mode = uiMode(p);
  const targetMin = Math.min(mode === 'tiny' ? 6 : 13, p.settings.dailyMinutes - (p.minutes[today()] || 0));
  const started = Date.now();
  const ctx = { done: [], lastStrand: null, reviewsDone: 0 };
  let home_ = false;
  p.sessions++;
  store.save();
  const addTime = () => {
    const mins = (Date.now() - started) / 60000;
    store.addMinutes(p, Math.max(0.1, mins));
  };
  const goHome = () => {
    home_ = true;
    addTime();
    home();
  };

  let rounds = 0;
  while (!home_) {
    let next = null;
    if (firstSkillId && rounds === 0) next = { skill: SKILL[firstSkillId], kind: p.skills[firstSkillId].n ? 'practice' : 'new' };
    else next = nextRound(p, ctx);
    if (!next) break;
    const res = await playRound({ p, skill: next.skill, kind: next.kind, mode, onHome: goHome });
    if (res.quit || home_) return;
    rounds++;
    ctx.done.push(next.skill.id);
    ctx.lastStrand = next.skill.strand;
    if (next.kind === 'review') ctx.reviewsDone++;
    if (res.mastered) await masteredScreen(next.skill);
    else await betweenRounds(res);
    const elapsed = (Date.now() - started) / 60000;
    if (elapsed >= targetMin) break;
  }
  if (home_) return;
  addTime();
  await goodbye();
}

async function betweenRounds(res) {
  const p = store.active();
  const t = getTara(150);
  screen('between', h('div.center', {}, t.el, h('div.stars-row', {}, ...Array.from({ length: res.total }, (_, i) => h(`span.rstar${i < res.correct ? '.on' : ''}`, {}, '★')))));
  t.mood(res.acc >= 0.6 ? 'happy' : 'encourage');
  sfx.pop();
  // informational feedback about effort and learning, not ability (Mueller & Dweck 1998)
  const lines = res.acc >= 0.8 ? ['You are learning so much!', 'Great thinking!', 'Your brain is growing!'] : ['Good trying! Practice makes it easier.', 'You kept trying. Well done!'];
  await taraSay([pick(lines)], 'happy');
}

async function masteredScreen(skill) {
  const r = REGIONS[skill.strand];
  const t = getTara(140);
  const badge = h('div.sticker-big', { style: { '--c': r.color } }, h('span', {}, r.icon), h('small', {}, skill.title));
  const scr = screen('mastered', h('div.center', {}, badge, t.el));
  sfx.fanfare();
  celebrate(scr, true);
  t.mood('happy');
  await taraSay(['You learned something new!', skill.title, 'A new flower is growing in your garden!'], 'happy');
}

const MISSIONS = [
  { min: 0, en: 'Find something red in your room and show it to someone!', hi: 'अपने कमरे में कोई लाल चीज़ ढूँढो!' },
  { min: 0, en: 'Give someone a big hug, like an elephant!', hi: 'किसी को हाथी जैसी बड़ी झप्पी दो!' },
  { min: 1, en: 'Jump five times and count: one, two, three, four, five!', hi: 'पाँच बार कूदो और गिनो!' },
  { min: 1, en: 'Build a tall tower with blocks or boxes. How many did you use?', hi: 'डिब्बों से ऊँचा टावर बनाओ!' },
  { min: 1, en: 'Find something round, like a circle!', hi: 'कोई गोल चीज़ ढूँढो!' },
  { min: 2, en: 'Count the spoons in the kitchen!', hi: 'रसोई में चम्मच गिनो!' },
  { min: 2, en: 'Draw a circle, a square and a triangle on paper.', hi: 'काग़ज़ पर गोला, वर्ग और त्रिभुज बनाओ।' },
  { min: 2, en: 'Write the first letter of your name on paper, three times.', hi: 'अपने नाम का पहला अक्षर तीन बार लिखो।' },
  { min: 2, en: 'Find something that starts with the sound sss. Maybe a spoon, or soap?', hi: 'स की आवाज़ से शुरू होने वाली चीज़ ढूँढो!' },
  { min: 2, en: 'Tell Mummy or Papa one new word you learned today.', hi: 'मम्मी या पापा को आज का नया शब्द बताओ।' },
  { min: 2, en: 'Play a game: stand on one leg while someone counts to ten!', hi: 'एक पैर पर खड़े रहो, कोई दस तक गिने!' },
  { min: 3, en: 'Write a short word like cat or sun on paper. Say each sound as you write.', hi: 'कागज़ पर एक छोटा शब्द लिखो।' },
  { min: 3, en: 'Look out of the window. What is the weather like today?', hi: 'खिड़की से देखो, आज मौसम कैसा है?' },
  { min: 3, en: 'Help set the table. Count the plates for everyone!', hi: 'खाने की मेज़ पर सबके लिए थालियाँ गिनो!' },
];

async function goodbye() {
  const p = store.active();
  const lvl = levelForAge(p.ageMonths);
  const m = pick(MISSIONS.filter((x) => x.min <= lvl));
  const t = getTara(150);
  const done = h('button.big-btn.mission-done', { onclick: () => home() }, '✔ I did it!');
  screen('goodbye', h('div.mission-card', {}, h('div.mission-tara', {}, t.el), h('div.mission-body', {}, h('p.mission-title', {}, 'Your mission'), h('p.mission-text', {}, m.en), h('p.mission-hi', {}, m.hi), done)));
  t.mood('wave');
  await taraSay(['Before you go, here is a mission for you!', m.en], 'wave');
  if (p.settings.helperHindi) await say([hi(m.hi)]);
}

// ---------------- sticker book ----------------
function stickerBook() {
  const p = store.active();
  const items = p.stickers.map((s) => {
    const sk = SKILL[s.id];
    const r = sk ? REGIONS[sk.strand] : { icon: '⭐', color: '#F2A541' };
    return h('button.sticker', { style: { '--c': r.color }, onclick: () => say([sk ? sk.title : 'Well done']) }, h('span', {}, r.icon), h('small', {}, sk ? sk.title : ''));
  });
  screen(
    'stickers-screen',
    h('header.topbar', {}, h('span'), h('h2.title', {}, 'My stickers'), iconBtn('home', 'Home', home, 'home')),
    items.length ? h('div.sticker-grid', {}, ...items) : h('div.center', {}, h('p.muted', {}, 'Play to collect stickers!'))
  );
  say([items.length ? `You have ${items.length} stickers! Each one is something you learned.` : 'Play with me to get stickers!']);
}

// ---------------- parent corner ----------------
const STRAND_NAMES = { 'EN-OL': 'English words', 'EN-PA': 'Listening for sounds', 'EN-PH': 'Letters & reading', MA: 'Maths', SP: 'Spatial', LG: 'Logic', EF: 'Attention & self-control', HI: 'Hindi', SE: 'Feelings' };

function parentCorner() {
  stop();
  const p = store.active();
  const sum = summary(p);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const k = today(d);
    return { k, m: Math.round(p.minutes[k] || 0), label: d.toLocaleDateString('en-IN', { weekday: 'short' }) };
  });
  const maxM = Math.max(10, ...week.map((x) => x.m));
  const levels = Object.keys(STRAND_NAMES).map((s) => h('div.lv-row', {}, h('span', {}, STRAND_NAMES[s]), h('b', {}, 'L' + strandLevel(p, s))));
  const list = (arr) => (arr.length ? h('ul', {}, ...arr.slice(0, 12).map((s) => h('li', {}, s.title))) : h('p.muted', {}, '—'));

  const sel = (opts, val, onchange) => h('select.inp', { onchange: (e) => onchange(e.target.value) }, ...opts.map(([v, l]) => h('option', { value: v, selected: String(v) === String(val) }, l)));
  const toggle = (val, label, onchange) => h('label.tg', {}, h('input', { type: 'checkbox', checked: val, onchange: (e) => onchange(e.target.checked) }), ' ', label);
  const set = (k, v) => {
    p.settings[k] = v;
    store.save();
  };
  const voiceSel = (lang) => {
    const vs = listVoices(lang);
    const key = lang === 'en' ? 'voiceEn' : 'voiceHi';
    return h(
      'div.row',
      {},
      sel([['', 'Automatic (prefers Indian female)'], ...vs.map((v) => [v.voiceURI, `${v.name} (${v.lang})`])], p.settings[key] || '', (v) => {
        set(key, v || null);
        setVoicePrefs({ [lang]: v || null });
      }),
      h('button.small-btn', { onclick: () => say(lang === 'en' ? ['Hello! I am Tara. Sun starts with sss.'] : [hi('नमस्ते! मैं तारा हूँ। आम, आ से आम।')]) }, 'Test')
    );
  };

  const fileIn = h('input', { type: 'file', accept: 'application/json', style: { display: 'none' }, onchange: async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      store.importData(await f.text());
      alert('Backup restored.');
      boot();
    } catch (err) {
      alert(err.message);
    }
  } });

  screen(
    'parent',
    h('header.topbar', {}, h('span'), h('h2.title', {}, 'Parent Corner'), iconBtn('home', 'Back to child', home, 'home')),
    h(
      'div.parent-body',
      {},
      h('section.pcard', {},
        h('h3', {}, `${p.name} · ${Math.floor(p.ageMonths / 12)}y ${p.ageMonths % 12}m`),
        h('p.muted', {}, `${p.sessions} sessions · ${p.stickers.length} skills mastered`),
        h('div.bars', {}, ...week.map((d) => h('div.bar', {}, h('span.bar-fill', { style: { height: (d.m / maxM) * 100 + '%' } }), h('small', {}, d.label), h('small.bm', {}, d.m + 'm'))))
      ),
      h('section.pcard', {}, h('h3', {}, 'Struggling — try this off-screen'), list(sum.struggling), sum.struggling.length ? h('p.small', {}, 'Tip: practise these together for 2 minutes with real objects or a book. Keep it playful.') : null),
      h('section.pcard', {}, h('h3', {}, 'Learning now'), list(sum.learning)),
      h('section.pcard', {}, h('h3', {}, 'Mastered'), list(sum.mastered.slice().reverse())),
      h('section.pcard', {}, h('h3', {}, 'Level by area'), ...levels),
      h('section.pcard', {},
        h('h3', {}, 'Settings'),
        h('label', {}, 'Daily play limit'),
        sel([[5, '5 min'], [8, '8 min'], [10, '10 min'], [15, '15 min'], [20, '20 min'], [30, '30 min']], p.settings.dailyMinutes, (v) => set('dailyMinutes', Number(v))),
        h('label', {}, 'No play after'),
        sel([[18, '6 pm'], [19, '7 pm'], [20, '8 pm'], [21, '9 pm'], [24, 'No limit']], p.settings.bedtimeHour, (v) => set('bedtimeHour', Number(v))),
        toggle(p.settings.helperHindi, 'Hindi helper button (हिं) in English games', (v) => set('helperHindi', v)),
        toggle(p.settings.hindiScriptOverride, 'Start Hindi letters now (school has started वर्णमाला)', (v) => set('hindiScriptOverride', v)),
        h('label', {}, 'English voice'),
        voiceSel('en'),
        h('label', {}, 'Hindi voice'),
        voiceSel('hi'),
        h('button.small-btn', { onclick: () => { p.minutes[today()] = 0; store.save(); home(); } }, 'Allow more play today')
      ),
      h('section.pcard', {},
        h('h3', {}, 'Voice recordings'),
        h('p.small', {}, 'Record the letter sounds in your own voice. Pure sounds ("sss", not "suh") matter for phonics.'),
        h('button.small-btn', { onclick: openStudio }, '🎙️ Open Recording Studio')
      ),
      h('section.pcard', {},
        h('h3', {}, 'Children & data'),
        h('div.row', {}, ...store.all().map((x) => h(`button.small-btn${x.id === p.id ? '.on' : ''}`, { onclick: () => { store.setActive(x.id); ensure(x); parentCorner(); } }, x.name))),
        h('button.small-btn', { onclick: onboarding }, '+ Add child'),
        h('button.small-btn', { onclick: () => {
          const blob = new Blob([store.exportData()], { type: 'application/json' });
          const a = h('a', { href: URL.createObjectURL(blob), download: `tara-backup-${today()}.json` });
          document.body.append(a);
          a.click();
          a.remove();
        } }, 'Download backup'),
        h('button.small-btn', { onclick: () => fileIn.click() }, 'Restore backup'),
        fileIn,
        h('button.small-btn.danger', { onclick: () => { if (confirm(`Delete ${p.name}'s progress? This cannot be undone.`)) { store.deleteProfile(p.id); boot(); } } }, 'Delete this child')
      )
    )
  );
}

window.addEventListener('DOMContentLoaded', boot);
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
