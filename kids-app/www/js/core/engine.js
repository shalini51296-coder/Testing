// Learning engine (master plan §6, syllabus §4).
// - Bayesian Knowledge Tracing per skill (Corbett & Anderson 1995)
// - Mastery = P(known) >= 0.95 AND correct on >= 2 different days
// - Expanding spaced review 1,3,7,16,35,90 days (Cepeda et al. 2008)
// - Difficulty steps keep rolling accuracy near 80-85%
// - Placement: age gives a starting guess; lower-level skills are "assumed" and
//   confirmed quickly by review (adaptive staircase in disguise).

import { SKILLS, SKILL, strandWeights } from '../content/skills.js';
import { today, addDays, daysBetween } from './util.js';
import { save, logEvent } from './storage.js';

const BKT = { init: 0.15, learn: 0.2, slip: 0.1 };
const MASTER_P = 0.95;
const INTERVALS = [1, 3, 7, 16, 35, 90];

export function levelForAge(ageMonths) {
  if (ageMonths < 30) return 0;
  if (ageMonths < 42) return 1;
  if (ageMonths < 54) return 2;
  if (ageMonths < 66) return 3;
  return 4;
}

export function uiMode(p) {
  return p.ageMonths < 42 ? 'tiny' : 'little';
}

function blank() {
  return { st: 'new', p: BKT.init, n: 0, c: 0, days: [], last: null, due: null, iv: 0, acc: [], diff: 0 };
}

// Create learner-model entries; on first run apply the age-based placement guess.
export function ensure(p) {
  const start = levelForAge(p.ageMonths);
  for (const s of SKILLS) {
    if (!p.skills[s.id]) {
      const m = blank();
      if (!p.placed && s.level <= start - 2) {
        m.st = 'assumed'; // probably known: confirm by quick review
        m.p = 0.7;
        m.due = today();
      }
      p.skills[s.id] = m;
    }
  }
  p.placed = true;
  save();
}

const isDone = (m) => m && (m.st === 'mastered' || m.st === 'assumed');

export function isUnlocked(p, s) {
  if (s.id.startsWith('hi.hs1') && p.settings.hindiScriptOverride) return true;
  return s.pre.every((id) => isDone(p.skills[id]));
}

export function available(p) {
  return SKILLS.filter((s) => isUnlocked(p, s) && !isDone(p.skills[s.id]));
}

export function dueReviews(p, d = today()) {
  return SKILLS.filter((s) => {
    const m = p.skills[s.id];
    return isDone(m) && m.due && m.due <= d;
  }).sort((a, b) => (p.skills[a.id].due < p.skills[b.id].due ? -1 : 1));
}

// Per-item update. guess = 1/choices; a hinted answer counts as not known.
export function recordItem(p, skillId, { correct, choices = 3, hinted = false, ms = 0 }) {
  const m = p.skills[skillId];
  if (!m) return;
  const ok = correct && !hinted;
  const g = Math.min(0.5, 1 / Math.max(2, choices));
  const s = BKT.slip;
  const prior = m.p;
  const post = ok ? (prior * (1 - s)) / (prior * (1 - s) + (1 - prior) * g) : (prior * s) / (prior * s + (1 - prior) * (1 - g));
  m.p = post + (1 - post) * BKT.learn;
  m.n++;
  if (ok) m.c++;
  m.acc.push(ok ? 1 : 0);
  if (m.acc.length > 10) m.acc.shift();
  const d = today();
  if (ok && !m.days.includes(d)) m.days.push(d);
  if (m.days.length > 6) m.days.shift();
  m.last = d;
  if (m.st === 'new') m.st = 'learning';
  logEvent(p, { s: skillId, ok: ok ? 1 : 0, h: hinted ? 1 : 0, ms });
}

// Called after a round of items on one skill. Returns {mastered, slipped}.
export function endRound(p, skillId, { correct, total, kind }) {
  const m = p.skills[skillId];
  const s = SKILL[skillId];
  const acc = total ? correct / total : 0;
  const out = { mastered: false, slipped: false, acc };
  // difficulty control towards ~80-85% success
  if (acc >= 0.9 && total >= 4) m.diff = Math.min(3, m.diff + 1);
  else if (acc < 0.6) m.diff = Math.max(0, m.diff - 1);

  const d = today();
  if (isDone(m)) {
    // a review round
    if (acc >= 0.8) {
      if (m.st === 'assumed') {
        m.st = 'mastered';
        out.mastered = true;
      }
      const gap = m.lastReview ? daysBetween(m.lastReview, d) : 0;
      if (gap >= 14) m.retained = true;
      const idx = INTERVALS.findIndex((x) => x > m.iv);
      m.iv = INTERVALS[idx === -1 ? INTERVALS.length - 1 : idx];
      m.due = addDays(d, m.iv);
      m.lastReview = d;
    } else {
      // forgotten or not really known: back to learning (placement moves down)
      m.st = 'learning';
      m.p = Math.min(m.p, 0.6);
      m.iv = 0;
      m.due = null;
      out.slipped = true;
    }
  } else {
    const start = levelForAge(p.ageMonths);
    const perfectEarly = acc === 1 && total >= 5 && s.level < start; // skip-ahead
    if ((m.p >= MASTER_P && m.days.length >= 2) || perfectEarly) {
      m.st = 'mastered';
      m.iv = 1;
      m.due = addDays(d, 1);
      m.lastReview = d;
      out.mastered = true;
    }
  }
  if (out.mastered) {
    p.stickers.push({ id: skillId, date: d });
  }
  save();
  return out;
}

// Choose the next round for this session.
// ctx: { done: [skillId...], lastStrand, reviewsDone }
export function nextRound(p, ctx) {
  const d = today();
  // 1) spaced reviews first (up to 3 per session), never the same strand twice running
  if (ctx.reviewsDone < 3) {
    const due = dueReviews(p, d).filter((s) => !ctx.done.includes(s.id));
    const r = due.find((s) => s.strand !== ctx.lastStrand) || due[0];
    if (r) return { skill: r, kind: 'review' };
  }
  // 2) frontier skills, weighted by strand share for the child's level
  const av = available(p).filter((s) => ctx.done.filter((x) => x === s.id).length < 2);
  if (av.length) {
    const lvl = levelForAge(p.ageMonths);
    const w = strandWeights(lvl);
    // prefer skills already in progress (finish what we started) and the lowest level per strand
    const byStrand = {};
    for (const s of av) {
      const cur = byStrand[s.strand];
      const score = (x) => x.level * 10 - (p.skills[x.id].st === 'learning' ? 5 : 0);
      if (!cur || score(s) < score(cur)) byStrand[s.strand] = s;
    }
    let cands = Object.values(byStrand).filter((s) => s.strand !== ctx.lastStrand);
    if (!cands.length) cands = Object.values(byStrand);
    const total = cands.reduce((a, s) => a + (w[s.strand] || 5), 0);
    let r = Math.random() * total;
    for (const s of cands) {
      r -= w[s.strand] || 5;
      if (r <= 0) return { skill: s, kind: p.skills[s.id].n ? 'practice' : 'new' };
    }
    return { skill: cands[0], kind: 'practice' };
  }
  // 3) everything mastered: free practice on mastered skills
  const mastered = SKILLS.filter((s) => isDone(p.skills[s.id]));
  if (mastered.length) return { skill: mastered[Math.floor(Math.random() * mastered.length)], kind: 'review' };
  return null;
}

// Parent summary helpers
export function summary(p) {
  const byStatus = { mastered: [], learning: [], struggling: [] };
  for (const s of SKILLS) {
    const m = p.skills[s.id];
    if (!m) continue;
    if (m.st === 'mastered') byStatus.mastered.push(s);
    else if (m.st === 'learning') {
      const recent = m.acc.slice(-6);
      const a = recent.length ? recent.reduce((x, y) => x + y, 0) / recent.length : 1;
      (recent.length >= 4 && a < 0.6 ? byStatus.struggling : byStatus.learning).push(s);
    }
  }
  return byStatus;
}

export function strandLevel(p, strand) {
  const av = available(p).filter((s) => s.strand === strand);
  if (av.length) return Math.min(...av.map((s) => s.level));
  const all = SKILLS.filter((s) => s.strand === strand);
  return Math.max(...all.map((s) => s.level)) + 1;
}
