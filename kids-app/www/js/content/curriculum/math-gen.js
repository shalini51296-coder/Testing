// Maths item generators, levels L4-L8 (about Class 1 to Class 5).
// Aligned to NCERT/NCF-SE 2023 learning outcomes and Clements & Sarama / Siegler
// trajectories. Every generator returns:
//   { q: question text (shown + read aloud), visual?: SVG/HTML string,
//     choices: [string], answer: string, explain: string }
// Distractors model real misconceptions (e.g. not regrouping, reversing digits,
// adding numerators AND denominators), so wrong answers are diagnostic.

const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
const IN = (n) => n.toLocaleString('en-IN'); // Indian grouping: 1,00,000
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Build 4 unique choices: answer + misconception distractors + near misses.
function opts(answer, distract = [], { n = 4, fmt = String, near = 1 } = {}) {
  const set = new Set([fmt(answer)]);
  for (const d of distract) if (set.size < n && d !== answer && d != null && !(typeof d === 'number' && (d < 0 || !isFinite(d)))) set.add(fmt(d));
  let k = 1;
  while (set.size < n && k < 50) {
    const c = typeof answer === 'number' ? answer + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * near : null;
    if (c != null && c >= 0) set.add(fmt(c));
    k++;
  }
  return shuffle([...set]);
}

// answer + up to 3 other unique options from a pool
function withAns(ans, pool, n = 4) {
  const others = shuffle([...new Set(pool.map(String))].filter((x) => x !== String(ans))).slice(0, n - 1);
  return shuffle([String(ans), ...others]);
}

// ---------- visuals ----------
export function clockSVG(h, m) {
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const n = i === 0 ? 12 : i;
    return `<text x="${50 + 36 * Math.sin(a)}" y="${54 + -36 * Math.cos(a)}" font-size="9" text-anchor="middle" font-family="Andika" fill="#2E3150">${n}</text>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" class="qclock"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#5B6CC2" stroke-width="4"/>${ticks}
  <line x1="50" y1="50" x2="${50 + 22 * Math.sin((ha * Math.PI) / 180)}" y2="${50 - 22 * Math.cos((ha * Math.PI) / 180)}" stroke="#2E3150" stroke-width="5" stroke-linecap="round"/>
  <line x1="50" y1="50" x2="${50 + 33 * Math.sin((ma * Math.PI) / 180)}" y2="${50 - 33 * Math.cos((ma * Math.PI) / 180)}" stroke="#E8865A" stroke-width="3" stroke-linecap="round"/>
  <circle cx="50" cy="50" r="3" fill="#2E3150"/></svg>`;
}

export function fractionSVG(num, den, kind = pick(['bar', 'circle'])) {
  if (kind === 'bar') {
    const w = 96 / den;
    return `<svg viewBox="0 0 100 40" class="qfrac">${Array.from({ length: den }, (_, i) => `<rect x="${2 + i * w}" y="4" width="${w}" height="32" fill="${i < num ? '#FFB547' : '#fff'}" stroke="#5B6CC2" stroke-width="1.5"/>`).join('')}</svg>`;
  }
  const seg = (i) => {
    const a0 = (i / den) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / den) * 2 * Math.PI - Math.PI / 2;
    const large = 1 / den > 0.5 ? 1 : 0;
    return `<path d="M50 50 L${50 + 44 * Math.cos(a0)} ${50 + 44 * Math.sin(a0)} A44 44 0 ${large} 1 ${50 + 44 * Math.cos(a1)} ${50 + 44 * Math.sin(a1)} Z" fill="${i < num ? '#FFB547' : '#fff'}" stroke="#5B6CC2" stroke-width="1.5"/>`;
  };
  return `<svg viewBox="0 0 100 100" class="qfrac">${den === 1 ? '<circle cx="50" cy="50" r="44" fill="#FFB547" stroke="#5B6CC2"/>' : Array.from({ length: den }, (_, i) => seg(i)).join('')}</svg>`;
}

function baseTenSVG(n) {
  const t = Math.floor(n / 10), o = n % 10;
  let s = '';
  for (let i = 0; i < t; i++) s += `<rect x="${4 + i * 12}" y="4" width="9" height="90" fill="#4AA8D8" stroke="#2E3150" stroke-width="1"/>`;
  for (let i = 0; i < o; i++) s += `<rect x="${8 + t * 12 + (i % 3) * 12}" y="${64 - Math.floor(i / 3) * 12}" width="9" height="9" fill="#FFB547" stroke="#2E3150" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${Math.max(60, 20 + t * 12 + 40)} 100" class="qblocks">${s}</svg>`;
}

const COINS = [1, 2, 5, 10, 20];
function coinsHTML(list) {
  return `<div class="qcoins">${list.map((c) => `<span class="coin ${c >= 10 ? 'note' : ''}">₹${c}</span>`).join('')}</div>`;
}

const NAMES = ['Aarohi', 'Kabir', 'Meera', 'Arjun', 'Zoya', 'Ishaan', 'Anaya', 'Vihaan', 'Tara'];
const THINGS = [['mangoes', 'mango'], ['pencils', 'pencil'], ['marbles', 'marble'], ['laddoos', 'laddoo'], ['stickers', 'sticker'], ['books', 'book'], ['bangles', 'bangle']];

// ---------- generators by topic ----------
export const MATH = {
  // ===== L4 (Class 1) =====
  tensones: { level: 4, title: 'Tens and ones', gen() {
    const n = R(11, 99), t = Math.floor(n / 10), o = n % 10;
    const askT = Math.random() < 0.5;
    return { q: askT ? `How many tens are in ${n}?` : `How many ones are in ${n}?`, visual: baseTenSVG(n), choices: opts(askT ? t : o, [askT ? o : t, n]), answer: String(askT ? t : o), explain: `${n} is ${t} tens and ${o} ones.` };
  } },
  add20: { level: 4, title: 'Adding within 20 (make 10)', gen() {
    const a = R(6, 9), b = R(11 - a, 9), s = a + b;
    return { q: `${a} + ${b} = ?`, choices: opts(s, [s - 10, s + 1, s - 1]), answer: String(s), explain: `Make 10 first: ${a} + ${10 - a} = 10, then add ${b - (10 - a)} more → ${s}.` };
  } },
  sub20: { level: 4, title: 'Subtracting within 20', gen() {
    const a = R(11, 19), b = R(2, 9), d = a - b;
    return { q: `${a} − ${b} = ?`, choices: opts(d, [a + b, d + 1, Math.abs((a % 10) - b)]), answer: String(d), explain: `Count back from ${a} by ${b}, or think: ${b} + ? = ${a}. Answer ${d}.` };
  } },
  missing: { level: 4, title: 'Missing number (□ + 4 = 9)', gen() {
    const a = R(1, 9), b = R(1, 10), s = a + b;
    return { q: `□ + ${b} = ${s}. What is □?`, choices: opts(a, [s + b, s, b]), answer: String(a), explain: `${s} − ${b} = ${a}, so ${a} + ${b} = ${s}.` };
  } },
  compare100: { level: 4, title: 'Bigger or smaller (>, <, =)', gen() {
    const a = R(10, 99);
    let b = Math.random() < 0.15 ? a : R(10, 99);
    if (Math.random() < 0.3) b = Number(String(a).split('').reverse().join('')) || b; // reversal trap
    const sign = a > b ? '>' : a < b ? '<' : '=';
    return { q: `${a} ☐ ${b}. Which sign goes in the box?`, choices: ['>', '<', '='], answer: sign, explain: `Compare tens first. ${a} ${sign} ${b}.` };
  } },
  skip: { level: 4, title: 'Skip counting by 2, 5, 10', gen() {
    const step = pick([2, 5, 10]), start = step * R(1, 8);
    const seq = [start, start + step, start + 2 * step];
    return { q: `${seq.join(', ')}, ___ ?`, choices: opts(start + 3 * step, [start + 3 * step + 1, start + 2 * step + 1], { near: step }), answer: String(start + 3 * step), explain: `We are counting by ${step}s: add ${step} each time.` };
  } },
  evenodd: { level: 4, title: 'Even and odd', gen() {
    const n = R(1, 50);
    return { q: `Is ${n} even or odd?`, choices: ['even', 'odd'], answer: n % 2 ? 'odd' : 'even', explain: `${n} ${n % 2 ? 'cannot' : 'can'} be shared into 2 equal groups. Even numbers end in 0, 2, 4, 6 or 8.` };
  } },
  coins: { level: 4, title: 'Counting money (coins)', gen() {
    const list = Array.from({ length: R(2, 4) }, () => pick([1, 2, 5, 10]));
    const s = list.reduce((a, b) => a + b, 0);
    return { q: 'How much money is this?', visual: coinsHTML(list), choices: opts(s, [list.length, s + 1, s - 1], { fmt: (x) => '₹' + x }), answer: '₹' + s, explain: `${list.map((c) => '₹' + c).join(' + ')} = ₹${s}.` };
  } },
  clockhour: { level: 4, title: "Time: o'clock and half past", gen() {
    const h = R(1, 12), half = Math.random() < 0.5;
    const ans = half ? `half past ${h}` : `${h} o'clock`;
    const alt = half ? [`${h} o'clock`, `half past ${(h % 12) + 1}`, `6 o'clock`] : [`half past ${h}`, `12 o'clock`, `${(h % 12) + 1} o'clock`];
    return { q: 'What time is it?', visual: clockSVG(h, half ? 30 : 0), choices: shuffle([ans, ...[...new Set(alt)].filter((x) => x !== ans).slice(0, 3)]), answer: ans, explain: half ? `The long hand is on 6: that is half past. The short hand is just after ${h}.` : `The long hand is on 12: that is o'clock. The short hand points to ${h}.` };
  } },

  // ===== L5 (Class 2) =====
  add100: { level: 5, title: 'Adding 2-digit numbers', gen(d = 0) {
    const a = R(15, 79), b = R(12, 99 - a), s = a + b;
    const noCarry = (Math.floor(a / 10) + Math.floor(b / 10)) * 10 + ((a % 10) + (b % 10)) % 10;
    return { q: `${a} + ${b} = ?`, choices: opts(s, [noCarry, s + 10, s - 1]), answer: String(s), explain: `Add ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}${(a % 10) + (b % 10) >= 10 ? ' (carry 1 ten)' : ''}. Add tens. Total ${s}.` };
  } },
  sub100: { level: 5, title: 'Subtracting 2-digit numbers', gen() {
    const a = R(30, 99), b = R(11, a - 5), d = a - b;
    const wrong = Math.abs((a % 10) - (b % 10)) + (Math.floor(a / 10) - Math.floor(b / 10)) * 10; // "smaller from bigger" bug
    return { q: `${a} − ${b} = ?`, choices: opts(d, [wrong, d + 10, a + b > 99 ? d + 1 : a + b]), answer: String(d), explain: `${a % 10 < b % 10 ? `Not enough ones: take 1 ten from ${a} to make ${(a % 10) + 10} ones. ` : ''}Answer ${d}. Check: ${d} + ${b} = ${a}.` };
  } },
  groups: { level: 5, title: 'Multiplication as equal groups', gen() {
    const g = R(2, 5), e = R(2, 5);
    const visual = `<div class="qgroups">${Array.from({ length: g }, () => `<span class="qg">${'●'.repeat(e)}</span>`).join('')}</div>`;
    return { q: `${g} groups of ${e}. How many in all?`, visual, choices: opts(g * e, [g + e, g * e + e, g * e - 1]), answer: String(g * e), explain: `${g} groups of ${e} = ${Array(g).fill(e).join(' + ')} = ${g} × ${e} = ${g * e}.` };
  } },
  tables2510: { level: 5, title: 'Tables of 2, 5 and 10', gen() {
    const t = pick([2, 5, 10]), k = R(2, 10);
    return { q: `${t} × ${k} = ?`, choices: opts(t * k, [t + k, t * (k + 1), t * (k - 1)], { near: t }), answer: String(t * k), explain: `Count in ${t}s ${k} times: ${t * k}.` };
  } },
  hundreds: { level: 5, title: 'Hundreds, tens and ones', gen() {
    const n = R(101, 999), h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, o = n % 10;
    const which = pick(['hundreds', 'tens', 'ones']);
    const v = { hundreds: h, tens: t, ones: o }[which];
    return { q: `In ${n}, what digit is in the ${which} place?`, choices: opts(v, [h, t, o].filter((x) => x !== v)), answer: String(v), explain: `${n} = ${h} hundreds, ${t} tens, ${o} ones.` };
  } },
  shop: { level: 5, title: 'Shopping and change (₹)', gen() {
    const items = [['a pencil', R(3, 9)], ['a notebook', R(15, 35)], ['a ball', R(20, 45)], ['a kite', R(10, 25)], ['an eraser', R(2, 6)]];
    const [it, price] = pick(items);
    const paid = price <= 10 ? 10 : price <= 20 ? 20 : 50;
    const ch = paid - price;
    return { q: `${pick(NAMES)} buys ${it} for ₹${price} and pays with a ₹${paid} note. How much change?`, choices: opts(ch, [paid + price, price, ch + 10], { fmt: (x) => '₹' + x }), answer: '₹' + ch, explain: `₹${paid} − ₹${price} = ₹${ch}. Count up from ${price} to ${paid}.` };
  } },
  clock5: { level: 5, title: 'Time to 5 minutes', gen() {
    const h = R(1, 12), m = 5 * R(1, 11);
    const fmt = (hh, mm) => `${hh}:${String(mm).padStart(2, '0')}`;
    const ans = fmt(h, m);
    const wrong = [fmt(h, m / 5), fmt((m / 5) || 12, h * 5 % 60), fmt(h % 12 + 1, m)];
    return { q: 'What time does the clock show?', visual: clockSVG(h, m), choices: shuffle([ans, ...[...new Set(wrong)].filter((x) => x !== ans).slice(0, 3)]), answer: ans, explain: `Short hand: hour (${h}). Long hand on ${m / 5}: count by 5s → ${m} minutes.` };
  } },
  lengthcm: { level: 5, title: 'Length: metres and centimetres', gen() {
    const m = R(1, 9);
    const ask = Math.random() < 0.5;
    return ask
      ? { q: `${m} m = ? cm`, choices: opts(m * 100, [m * 10, m * 1000, m], { fmt: (x) => x + ' cm' }), answer: m * 100 + ' cm', explain: `1 metre = 100 centimetres, so ${m} m = ${m * 100} cm.` }
      : { q: 'Which is longer?', choices: shuffle([`${m} m`, `${m * 10} cm`]), answer: `${m} m`, explain: `${m} m = ${m * 100} cm, which is more than ${m * 10} cm.` };
  } },
  fraction1: { level: 5, title: 'Halves, thirds and quarters', gen() {
    const den = pick([2, 3, 4]), num = 1;
    const ans = `1/${den}`;
    return { q: 'What part is coloured?', visual: fractionSVG(num, den), choices: withAns(ans, ['1/2', '1/3', '1/4', '2/3', '3/4']), answer: ans, explain: `The whole is cut into ${den} equal parts and 1 part is coloured: one ${['', '', 'half', 'third', 'quarter'][den]} (1/${den}).` };
  } },
  numpattern: { level: 5, title: 'Number patterns', gen() {
    const start = R(1, 30), step = pick([3, 4, 5, 10, 11, 20]), dir = Math.random() < 0.25 ? -1 : 1;
    const s0 = dir < 0 ? start + step * 6 : start;
    const seq = [0, 1, 2, 3].map((i) => s0 + dir * step * i);
    const ans = s0 + dir * step * 4;
    return { q: `${seq.join(', ')}, ___`, choices: opts(ans, [ans + dir, ans + step], { near: step }), answer: String(ans), explain: `Each number is ${dir > 0 ? step + ' more' : step + ' less'} than the one before.` };
  } },
  wordaddsub: { level: 5, title: 'Word problems (+ and −)', gen() {
    const nm = pick(NAMES), [things] = pick(THINGS), a = R(12, 48), b = R(5, 40);
    if (Math.random() < 0.5) return { q: `${nm} has ${a} ${things}. She gets ${b} more. How many now?`, choices: opts(a + b, [Math.abs(a - b), a + b + 10, a + b - 1]), answer: String(a + b), explain: `"Gets more" means add: ${a} + ${b} = ${a + b}.` };
    const big = a + b;
    return { q: `${nm} had ${big} ${things}. ${b} were given away. How many are left?`, choices: opts(a, [big + b, a + 10, a - 1]), answer: String(a), explain: `"Given away" means subtract: ${big} − ${b} = ${a}.` };
  } },

  // ===== L6 (Class 3) =====
  add1000: { level: 6, title: 'Adding 3-digit numbers', gen() {
    const a = R(120, 680), b = R(110, 999 - a), s = a + b;
    return { q: `${a} + ${b} = ?`, choices: opts(s, [s - 10, s + 100, s - 100], { near: 10 }), answer: String(s), explain: `Add ones, then tens, then hundreds, carrying when a column makes 10 or more. Total ${s}.` };
  } },
  sub1000: { level: 6, title: 'Subtracting 3-digit numbers', gen() {
    const a = R(300, 999), b = R(101, a - 50), d = a - b;
    return { q: `${a} − ${b} = ?`, choices: opts(d, [d + 10, d - 10, d + 100], { near: 10 }), answer: String(d), explain: `Subtract column by column, borrowing when needed. Check: ${d} + ${b} = ${a}.` };
  } },
  tables: { level: 6, title: 'Times tables 2-10', gen() {
    const a = R(2, 10), b = R(2, 10);
    return { q: `${a} × ${b} = ?`, choices: opts(a * b, [a + b, a * (b + 1), (a - 1) * b], { near: a }), answer: String(a * b), explain: `${a} × ${b} = ${a * b}. Tip: ${a} × ${b} is the same as ${b} × ${a}.` };
  } },
  mult2x1: { level: 6, title: 'Multiplying 2-digit by 1-digit', gen() {
    let a = R(12, 49);
    if (a % 10 === 0) a++;
    const b = R(2, 9), p = a * b;
    const t = Math.floor(a / 10) * 10, o = a % 10;
    return { q: `${a} × ${b} = ?`, choices: opts(p, [t * b + o, Math.floor(a / 10) * b * 10 + ((o * b) % 10), p + 10], { near: 10 }), answer: String(p), explain: `Split ${a} into ${t} + ${o}: ${t} × ${b} = ${t * b}, ${o} × ${b} = ${o * b}. ${t * b} + ${o * b} = ${p}.` };
  } },
  divfacts: { level: 6, title: 'Division facts', gen() {
    const b = R(2, 10), q = R(2, 10), a = b * q;
    return { q: `${a} ÷ ${b} = ?`, choices: opts(q, [a - b, b, q + 1]), answer: String(q), explain: `${a} shared into ${b} equal groups gives ${q} in each, because ${b} × ${q} = ${a}.` };
  } },
  divrem: { level: 6, title: 'Division with remainders', gen() {
    const b = R(3, 9), q = R(2, 9), r = R(1, b - 1), a = b * q + r;
    const ans = `${q} r ${r}`;
    return { q: `${a} ÷ ${b} = ?`, choices: withAns(ans, [`${q + 1} r ${r}`, `${q} r ${(r + 1) % b}`, `${q - 1} r ${r}`, `${q} r ${b}`]), answer: ans, explain: `${b} × ${q} = ${b * q}. ${a} − ${b * q} = ${r} left over. The remainder (${r}) must be less than ${b}.` };
  } },
  unitfrac: { level: 6, title: 'Comparing unit fractions', gen() {
    let a = R(2, 10), b = R(2, 10);
    while (b === a) b = R(2, 10);
    const ans = `1/${Math.min(a, b)}`;
    return { q: `Which is bigger: 1/${a} or 1/${b}?`, choices: shuffle([`1/${a}`, `1/${b}`]), answer: ans, explain: `With 1 part each, fewer parts means bigger parts. 1/${Math.min(a, b)} is bigger than 1/${Math.max(a, b)}.` };
  } },
  equivfrac: { level: 6, title: 'Equivalent fractions', gen() {
    const den = pick([2, 3, 4, 5]), num = R(1, den - 1), k = R(2, 4);
    const ans = `${num * k}/${den * k}`;
    return { q: `Which fraction is equal to ${num}/${den}?`, choices: shuffle([ans, `${num + k}/${den + k}`, `${num * k}/${den}`, `${num}/${den * k}`]), answer: ans, explain: `Multiply top and bottom by the same number (${k}): ${num}×${k} / ${den}×${k} = ${ans}.` };
  } },
  thousands: { level: 6, title: 'Place value to 9999', gen() {
    const n = R(1001, 9999), d = String(n).split('').map(Number);
    const places = ['thousands', 'hundreds', 'tens', 'ones'];
    const i = R(0, 3), val = d[i] * 10 ** (3 - i);
    return { q: `What is the value of the digit ${d[i]} in ${n}? (${places[i]} place)`, choices: opts(val, [d[i], d[i] * 10 ** (2 - i < 0 ? 0 : 2 - i), d[i] * 10 ** (4 - i)].filter((x) => x !== val)), answer: String(val), explain: `${d[i]} in the ${places[i]} place is worth ${val}.` };
  } },
  round: { level: 6, title: 'Rounding to 10 and 100', gen() {
    const to = pick([10, 100]), n = to === 10 ? R(11, 99) : R(110, 990);
    const ans = Math.round(n / to) * to;
    return { q: `Round ${n} to the nearest ${to}.`, choices: opts(ans, [Math.floor(n / to) * to, Math.ceil(n / to) * to, ans + to], { near: to }), answer: String(ans), explain: `Look at the ${to === 10 ? 'ones' : 'tens'} digit: 5 or more rounds up, less than 5 rounds down. ${n} → ${ans}.` };
  } },
  perimeter: { level: 6, title: 'Perimeter of rectangles', gen() {
    const l = R(3, 15), w = R(2, 10);
    return { q: `A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter?`, visual: `<svg viewBox="0 0 120 70" class="qrect"><rect x="10" y="10" width="${Math.min(100, l * 6)}" height="${Math.min(50, w * 5)}" fill="#EAF6FF" stroke="#5B6CC2" stroke-width="2"/></svg>`, choices: opts(2 * (l + w), [l * w, l + w, 2 * l + w], { fmt: (x) => x + ' cm' }), answer: 2 * (l + w) + ' cm', explain: `Perimeter = distance all the way round = ${l} + ${w} + ${l} + ${w} = ${2 * (l + w)} cm.` };
  } },
  roman: { level: 6, title: 'Roman numerals (I to XXXIX)', gen() {
    const toR = (n) => { const m = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let s = ''; for (const [v, r] of m) while (n >= v) { s += r; n -= v; } return s; };
    const n = R(1, 39), r = toR(n);
    if (Math.random() < 0.5) return { q: `What number is ${r}?`, choices: opts(n, [n + 1, n - 1, n + 5]), answer: String(n), explain: `I = 1, V = 5, X = 10. A smaller numeral before a bigger one is subtracted (IV = 4, IX = 9). ${r} = ${n}.` };
    return { q: `Write ${n} in Roman numerals.`, choices: shuffle([r, toR(n + 1), toR(Math.max(1, n - 1)), r.replace('IV', 'IIII').replace('IX', 'VIIII') !== r ? r.replace('IV', 'IIII').replace('IX', 'VIIII') : toR(n + 2)].filter((x, i, a) => a.indexOf(x) === i)), answer: r, explain: `${n} = ${r}.` };
  } },
  calendar: { level: 6, title: 'Calendar and days', gen() {
    const months = [['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30], ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31]];
    const t = R(0, 2);
    if (t === 0) { const [m, d] = pick(months); return { q: `How many days are there in ${m}${m === 'February' ? ' (not a leap year)' : ''}?`, choices: shuffle(['28', '29', '30', '31']), answer: String(d), explain: `${m} has ${d} days. (February has 29 days in a leap year.)` }; }
    if (t === 1) { const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; const i = R(0, 6), k = R(1, 3); return { q: `Today is ${days[i]}. What day will it be in ${k} day${k > 1 ? 's' : ''}?`, choices: shuffle([days[(i + k) % 7], days[(i + k + 1) % 7], days[(i + k + 6) % 7], days[(i + 3 + k) % 7]].filter((x, j, a) => a.indexOf(x) === j)), answer: days[(i + k) % 7], explain: `Count forward ${k} from ${days[i]}: ${days[(i + k) % 7]}.` }; }
    const w = R(2, 6); return { q: `How many days are in ${w} weeks?`, choices: opts(w * 7, [w + 7, w * 5, w * 7 + 1]), answer: String(w * 7), explain: `1 week = 7 days. ${w} × 7 = ${w * 7}.` };
  } },
  units: { level: 6, title: 'Weight and capacity (kg, g, L, mL)', gen() {
    const t = pick(['kg', 'L']), n = R(1, 9);
    const big = t === 'kg' ? 'kg' : 'L', small = t === 'kg' ? 'g' : 'mL';
    if (Math.random() < 0.5) return { q: `${n} ${big} = ? ${small}`, choices: opts(n * 1000, [n * 100, n * 10, n * 10000], { fmt: (x) => `${IN(x)} ${small}` }), answer: `${IN(n * 1000)} ${small}`, explain: `1 ${big} = 1,000 ${small}. So ${n} ${big} = ${IN(n * 1000)} ${small}.` };
    const things = t === 'kg' ? [['a feather', '10 g'], ['a sack of rice', '25 kg'], ['an apple', '200 g'], ['a baby elephant', '100 kg']] : [['a spoon of medicine', '5 mL'], ['a bucket of water', '10 L'], ['a glass of milk', '250 mL']];
    const [obj, ans] = pick(things);
    return { q: `About how much is ${obj}?`, choices: withAns(ans, things.map((x) => x[1])), answer: ans, explain: `${obj[0].toUpperCase() + obj.slice(1)} is about ${ans}. Estimating helps us check answers.` };
  } },

  // ===== L7 (Class 4) =====
  lakh: { level: 7, title: 'Indian place value (lakhs)', gen() {
    const n = R(10000, 999999);
    if (Math.random() < 0.5) return { q: `How do we write ${IN(n)} with Indian commas? Which is correct?`, choices: shuffle([IN(n), n.toLocaleString('en-US'), String(n)].filter((x, i, a) => a.indexOf(x) === i)), answer: IN(n), explain: `Indian system: first comma after 3 digits from the right, then every 2 digits (lakh, thousand, hundred). ${IN(n)}.` };
    const lakhs = Math.floor(n / 100000);
    return { q: `In ${IN(n)}, how many lakhs are there?`, choices: opts(lakhs, [Math.floor(n / 10000), Math.floor(n / 1000) % 100, lakhs + 1]), answer: String(lakhs), explain: `1 lakh = 1,00,000. ${IN(n)} has ${lakhs} lakh${lakhs === 1 ? '' : 's'}.` };
  } },
  multmulti: { level: 7, title: 'Multiplying bigger numbers', gen() {
    const two = Math.random() < 0.5;
    const a = two ? R(12, 59) : R(102, 499), b = two ? R(11, 29) : R(3, 9), p = a * b;
    return { q: `${a} × ${b} = ?`, choices: opts(p, [two ? a * (b % 10) + a * Math.floor(b / 10) : p + 100, p + 10, p - b], { near: 10 }), answer: String(p), explain: two ? `${a} × ${b} = ${a} × ${b % 10} + ${a} × ${Math.floor(b / 10) * 10} = ${a * (b % 10)} + ${a * Math.floor(b / 10) * 10} = ${p}.` : `Multiply ones, tens and hundreds by ${b}, carrying as needed: ${p}.` };
  } },
  longdiv: { level: 7, title: 'Long division (3-digit ÷ 1-digit)', gen() {
    const b = R(2, 9), q = R(21, 199), a = b * q;
    return { q: `${a} ÷ ${b} = ?`, choices: opts(q, [q + 10, q - 1, Math.floor(q / 10)], { near: 10 }), answer: String(q), explain: `Divide, multiply, subtract, bring down. Check: ${q} × ${b} = ${a}.` };
  } },
  fracadd: { level: 7, title: 'Adding fractions (same denominator)', gen() {
    const den = R(4, 12), a = R(1, den - 2), b = R(1, den - a - 1);
    const ans = `${a + b}/${den}`;
    return { q: `${a}/${den} + ${b}/${den} = ?`, choices: withAns(ans, [`${a + b}/${den * 2}`, `${a * b}/${den}`, `${a + b + 1}/${den}`, `${a + b - 1}/${den}`, `${a}/${den + b}`]), answer: ans, explain: `The parts are the same size (${den}ths), so add only the tops: ${a} + ${b} = ${a + b}. Answer ${ans}.` };
  } },
  fracof: { level: 7, title: 'Fraction of a quantity', gen() {
    const den = pick([2, 3, 4, 5, 10]), num = R(1, den - 1), k = R(2, 8), total = den * k;
    return { q: `What is ${num}/${den} of ${total}?`, choices: opts(num * k, [k, total - num * k, num * den]), answer: String(num * k), explain: `${total} ÷ ${den} = ${k} (one part). ${num} part${num > 1 ? 's' : ''} = ${num} × ${k} = ${num * k}.` };
  } },
  angles: { level: 7, title: 'Types of angles', gen() {
    const t = pick(['acute', 'right', 'obtuse', 'straight']);
    const deg = { acute: R(10, 80), right: 90, obtuse: R(100, 170), straight: 180 }[t];
    const r = (deg * Math.PI) / 180;
    const visual = `<svg viewBox="0 0 120 70" class="qangle"><line x1="20" y1="60" x2="110" y2="60" stroke="#2E3150" stroke-width="3"/><line x1="60" y1="60" x2="${60 + 45 * Math.cos(r)}" y2="${60 - 45 * Math.sin(r)}" stroke="#E8865A" stroke-width="3"/></svg>`;
    return { q: `An angle of ${deg}°. What type of angle is it?`, visual, choices: shuffle(['acute', 'right', 'obtuse', 'straight']), answer: t, explain: `Acute: less than 90°. Right: exactly 90°. Obtuse: between 90° and 180°. Straight: 180°.` };
  } },
  area: { level: 7, title: 'Area of rectangles', gen() {
    const l = R(3, 12), w = R(2, 9);
    return { q: `A rectangle is ${l} m by ${w} m. What is its area?`, choices: opts(l * w, [2 * (l + w), l + w, l * w + l], { fmt: (x) => x + ' sq m' }), answer: l * w + ' sq m', explain: `Area = length × width = ${l} × ${w} = ${l * w} square metres. (Perimeter would be ${2 * (l + w)} m.)` };
  } },
  time24: { level: 7, title: '24-hour time', gen() {
    const h = R(13, 23), m = 5 * R(0, 11);
    const ans = `${h - 12}:${String(m).padStart(2, '0')} pm`;
    return { q: `What is ${h}:${String(m).padStart(2, '0')} in 12-hour time?`, choices: shuffle([ans, `${h - 10}:${String(m).padStart(2, '0')} pm`, `${h - 12}:${String(m).padStart(2, '0')} am`, `${h}:${String(m).padStart(2, '0')} pm`]), answer: ans, explain: `After 12 noon, subtract 12 from the hour: ${h} − 12 = ${h - 12}, so it is ${ans}.` };
  } },
  factors: { level: 7, title: 'Factors and multiples', gen() {
    const n = pick([12, 18, 20, 24, 30, 36, 16, 28]);
    const fs = []; for (let i = 1; i <= n; i++) if (n % i === 0) fs.push(i);
    const f = pick(fs.filter((x) => x > 1 && x < n));
    const nonf = [5, 7, 8, 9, 11, 10].filter((x) => n % x !== 0);
    return { q: `Which of these is a factor of ${n}?`, choices: shuffle([String(f), ...nonf.slice(0, 3).map(String)]), answer: String(f), explain: `${f} × ${n / f} = ${n}, so ${f} divides ${n} exactly. Factors of ${n}: ${fs.join(', ')}.` };
  } },
  wordmultdiv: { level: 7, title: 'Word problems (× and ÷)', gen() {
    const nm = pick(NAMES);
    if (Math.random() < 0.5) { const boxes = R(3, 9), each = R(6, 24); return { q: `There are ${boxes} boxes with ${each} laddoos in each. How many laddoos in all?`, choices: opts(boxes * each, [boxes + each, boxes * each + each, each]), answer: String(boxes * each), explain: `Equal groups → multiply: ${boxes} × ${each} = ${boxes * each}.` }; }
    const kids = R(3, 9), each = R(4, 12), tot = kids * each;
    return { q: `${nm} shares ${tot} stickers equally among ${kids} friends. How many does each friend get?`, choices: opts(each, [tot - kids, kids, each + 1]), answer: String(each), explain: `Sharing equally → divide: ${tot} ÷ ${kids} = ${each}.` };
  } },

  // ===== L8 (Class 5) =====
  decimals: { level: 8, title: 'Decimals (tenths, hundredths)', gen() {
    const t = R(0, 2);
    if (t === 0) { const a = R(1, 99) / 10, b = R(1, 99) / 10; if (a === b) return MATH.decimals.gen(); const big = Math.max(a, b); return { q: `Which is bigger: ${a} or ${b}?`, choices: shuffle([String(a), String(b)]), answer: String(big), explain: `Compare whole parts first, then tenths. ${big} is bigger.` }; }
    if (t === 1) { const a = (R(10, 99) / 10), b = (R(10, 99) / 10), s = Math.round((a + b) * 10) / 10; return { q: `${a} + ${b} = ?`, choices: opts(s, [Math.round((a + b + 1) * 10) / 10, Math.round((a + b - 0.1) * 10) / 10, Math.round((a + b + 0.1) * 10) / 10], { fmt: (x) => String(Math.round(x * 10) / 10), near: 0.1 }), answer: String(s), explain: `Line up the decimal points and add: ${a} + ${b} = ${s}.` }; }
    const n = R(1, 99); return { q: `Write ${n}/100 as a decimal.`, choices: shuffle([(n / 100).toFixed(2), (n / 10).toFixed(1), String(n), (n / 1000).toFixed(3)].filter((x, i, a) => a.indexOf(x) === i)), answer: (n / 100).toFixed(2), explain: `Hundredths have two decimal places: ${n}/100 = ${(n / 100).toFixed(2)}.` };
  } },
  fracdec: { level: 8, title: 'Fractions ↔ decimals ↔ percent', gen() {
    const pairs = [['1/2', '0.5', '50%'], ['1/4', '0.25', '25%'], ['3/4', '0.75', '75%'], ['1/10', '0.1', '10%'], ['1/5', '0.2', '20%'], ['2/5', '0.4', '40%']];
    const p = pick(pairs), from = R(0, 2), to = (from + R(1, 2)) % 3;
    const names = ['fraction', 'decimal', 'percent'];
    return { q: `Write ${p[from]} as a ${names[to]}.`, choices: withAns(p[to], pairs.map((x) => x[to])), answer: p[to], explain: `${p[0]} = ${p[1]} = ${p[2]}.` };
  } },
  primes: { level: 8, title: 'Prime numbers', gen() {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const comps = [4, 6, 8, 9, 10, 12, 14, 15, 21, 25, 27, 33, 35, 39, 49, 51];
    const p = pick(primes);
    return { q: 'Which number is prime?', choices: shuffle([String(p), ...shuffle(comps).slice(0, 3).map(String)]), answer: String(p), explain: `A prime number has exactly two factors: 1 and itself. ${p} is prime. (1 is not prime.)` };
  } },
  lcmhcf: { level: 8, title: 'Common multiples and factors', gen() {
    const a = pick([4, 6, 8, 9, 10, 12]), b = pick([3, 4, 5, 6, 8, 15].filter((x) => x !== a));
    if (Math.random() < 0.5) { const l = (a * b) / gcd(a, b); return { q: `What is the smallest number that is a multiple of both ${a} and ${b}?`, choices: opts(l, [a * b === l ? l * 2 : a * b, a + b, l + a]), answer: String(l), explain: `Multiples of ${a}: ${[1, 2, 3, 4, 5, 6].map((k) => a * k).join(', ')}… The first one also in ${b}'s table is ${l}.` }; }
    const g = gcd(a, b); return { q: `What is the biggest number that divides both ${a} and ${b}?`, choices: opts(g, [1, Math.min(a, b), g + 1].filter((x) => x !== g)), answer: String(g), explain: `Factors in common for ${a} and ${b}: the highest is ${g}.` };
  } },
  volume: { level: 8, title: 'Volume (cubes)', gen() {
    const l = R(2, 5), w = R(2, 4), h = R(2, 4);
    return { q: `A box is ${l} cubes long, ${w} wide and ${h} high. How many cubes fill it?`, choices: opts(l * w * h, [l + w + h, l * w, 2 * (l * w + w * h + l * h)]), answer: String(l * w * h), explain: `Volume = length × width × height = ${l} × ${w} × ${h} = ${l * w * h} cubes.` };
  } },
  percent: { level: 8, title: 'Percent of a number', gen() {
    const p = pick([10, 20, 25, 50, 75]), n = pick([20, 40, 60, 80, 100, 200]);
    const ans = (p * n) / 100;
    return { q: `What is ${p}% of ${n}?`, choices: opts(ans, [p, n - ans, ans * 2]), answer: String(ans), explain: `${p}% means ${p} out of 100. ${p}/100 × ${n} = ${ans}.` };
  } },
  average: { level: 8, title: 'Average', gen() {
    const k = R(3, 5), avg = R(5, 30);
    const xs = Array.from({ length: k - 1 }, () => avg + R(-5, 5));
    xs.push(avg * k - xs.reduce((a, b) => a + b, 0));
    if (xs.some((x) => x <= 0)) return MATH.average.gen();
    return { q: `Find the average of ${xs.join(', ')}.`, choices: opts(avg, [xs.reduce((a, b) => a + b, 0), avg + 1, Math.max(...xs)]), answer: String(avg), explain: `Add them (${xs.reduce((a, b) => a + b, 0)}) and divide by how many (${k}): ${avg}.` };
  } },
  algebra: { level: 8, title: 'Find the unknown', gen() {
    const t = R(0, 2), x = R(2, 15), a = R(2, 9);
    if (t === 0) return { q: `□ + ${a * 3} = ${x + a * 3}. What is □?`, choices: opts(x, [x + a * 3 * 2, x + 1, a * 3]), answer: String(x), explain: `Undo adding by subtracting: ${x + a * 3} − ${a * 3} = ${x}.` };
    if (t === 1) return { q: `${a} × □ = ${a * x}. What is □?`, choices: opts(x, [a * x - a, a, x + 1]), answer: String(x), explain: `Undo multiplying by dividing: ${a * x} ÷ ${a} = ${x}.` };
    return { q: `□ − ${a} = ${x}. What is □?`, choices: opts(x + a, [x - a, x, x + a + 1]), answer: String(x + a), explain: `Undo subtracting by adding: ${x} + ${a} = ${x + a}.` };
  } },
  crore: { level: 8, title: 'Large numbers (lakhs and crores)', gen() {
    const t = R(0, 1);
    if (t === 0) { const n = pick([1, 10, 100]); return { q: `How many lakhs make ${n === 1 ? 'one crore' : n + ' crore'}?`, choices: opts(100 * n, [10 * n, 1000 * n, n], { fmt: (x) => IN(x) }), answer: IN(100 * n), explain: `100 lakh = 1 crore = 1,00,00,000.` }; }
    const n = R(1000000, 99999999); return { q: `Read ${IN(n)}. About how many crores or lakhs is it?`, choices: shuffle([n >= 10000000 ? `${Math.floor(n / 10000000)} crore and more` : `${Math.floor(n / 100000)} lakh and more`, `${Math.floor(n / 1000)} lakh and more`, `${Math.floor(n / 1000000)} thousand`, `${Math.floor(n / 100)} crore`]), answer: n >= 10000000 ? `${Math.floor(n / 10000000)} crore and more` : `${Math.floor(n / 100000)} lakh and more`, explain: `Indian place values from the right: ones, tens, hundreds, thousands, ten thousands, lakhs, ten lakhs, crores.` };
  } },
  bargraph: { level: 8, title: 'Reading a bar graph', gen() {
    const fruits = ['Mango', 'Apple', 'Banana', 'Guava'];
    const vals = fruits.map(() => R(2, 10));
    const max = Math.max(...vals);
    const bars = vals.map((v, i) => `<rect x="${10 + i * 28}" y="${90 - v * 8}" width="20" height="${v * 8}" fill="${['#FFB547', '#E53935', '#FDD835', '#7BC67E'][i]}"/><text x="${20 + i * 28}" y="100" font-size="7" text-anchor="middle">${fruits[i]}</text><text x="${20 + i * 28}" y="${86 - v * 8}" font-size="7" text-anchor="middle">${v}</text>`).join('');
    const visual = `<svg viewBox="0 0 125 104" class="qgraph"><line x1="6" y1="90" x2="122" y2="90" stroke="#2E3150"/>${bars}</svg>`;
    if (Math.random() < 0.5) { const ans = fruits[vals.indexOf(max)]; if (vals.filter((v) => v === max).length > 1) return MATH.bargraph.gen(); return { q: 'Which fruit did most children choose?', visual, choices: shuffle([...fruits]), answer: ans, explain: `The tallest bar is ${ans} with ${max}.` }; }
    const i = R(0, 3), j = (i + R(1, 3)) % 4, diff = Math.abs(vals[i] - vals[j]);
    return { q: `How many more children chose ${vals[i] >= vals[j] ? fruits[i] : fruits[j]} than ${vals[i] >= vals[j] ? fruits[j] : fruits[i]}?`, visual, choices: opts(diff, [vals[i] + vals[j], vals[i], vals[j]]), answer: String(diff), explain: `${Math.max(vals[i], vals[j])} − ${Math.min(vals[i], vals[j])} = ${diff}.` };
  } },
};
