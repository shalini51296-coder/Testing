// Local-only persistence. No server, no analytics (DPDP Act 2023 / COPPA principles).
// Profiles + learner models live in localStorage (small JSON).
// Voice recordings live in IndexedDB (see recordings.js).

import { uid, today } from './util.js';

const KEY = 'tara.v1';

const blank = () => ({ version: 1, profiles: [], activeId: null });

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const s = JSON.parse(raw);
    return s && Array.isArray(s.profiles) ? s : blank();
  } catch {
    return blank();
  }
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('save failed', e);
  }
}

export const all = () => state.profiles;

export function active() {
  return state.profiles.find((p) => p.id === state.activeId) || null;
}

export function setActive(id) {
  state.activeId = id;
  save();
}

export function createProfile({ name, ageMonths }) {
  const p = {
    id: uid(),
    name: name.trim(),
    ageMonths,
    createdAt: today(),
    settings: {
      dailyMinutes: ageMonths < 42 ? 8 : ageMonths < 66 ? 15 : 20,
      helperHindi: true, // Hindi helper bubble for English instructions
      hindiScriptOverride: false, // parent can unlock Hindi script early
      bedtimeHour: 20, // no play after this hour (local time)
      voiceEn: null,
      voiceHi: null,
    },
    skills: {}, // skillId -> learner model (see engine.js)
    stickers: [], // [{id, emoji, label, date}]
    minutes: {}, // date -> minutes played
    sessions: 0,
    log: [], // trimmed event log for the parent summary
    placed: false,
  };
  state.profiles.push(p);
  state.activeId = p.id;
  save();
  return p;
}

export function deleteProfile(id) {
  state.profiles = state.profiles.filter((p) => p.id !== id);
  if (state.activeId === id) state.activeId = state.profiles[0]?.id || null;
  save();
}

export function logEvent(p, ev) {
  p.log.push({ t: Date.now(), ...ev });
  if (p.log.length > 4000) p.log.splice(0, p.log.length - 4000);
}

export function addMinutes(p, mins) {
  const d = today();
  p.minutes[d] = (p.minutes[d] || 0) + mins;
  save();
}

export function exportData() {
  return JSON.stringify(state, null, 2);
}

export function importData(json) {
  const s = JSON.parse(json);
  if (!s || !Array.isArray(s.profiles)) throw new Error('Not a Tara backup file');
  state = s;
  save();
}
