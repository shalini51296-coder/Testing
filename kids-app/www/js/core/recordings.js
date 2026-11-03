// Human voice clips (phonemes, akshara sounds, Tara's key lines) stored in IndexedDB.
// Recorded in-app by a parent/voice artist in the Recording Studio, or bundled later
// as files in /audio/<clipId>.mp3 (checked via a manifest).

const DB = 'tara-audio';
const STORE = 'clips';
let dbp = null;
const cache = new Map(); // clipId -> objectURL
let bundled = null; // Set of clip ids shipped as files

function db() {
  if (!dbp) {
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }).catch(() => null);
  }
  return dbp;
}

async function tx(mode, fn) {
  const d = await db();
  if (!d) return null;
  return new Promise((res, rej) => {
    const t = d.transaction(STORE, mode);
    const out = fn(t.objectStore(STORE));
    t.oncomplete = () => res(out?.result ?? null);
    t.onerror = () => rej(t.error);
  });
}

export async function putClip(id, blob) {
  await tx('readwrite', (s) => s.put(blob, id));
  if (cache.has(id)) URL.revokeObjectURL(cache.get(id));
  cache.delete(id);
}

export async function deleteClip(id) {
  await tx('readwrite', (s) => s.delete(id));
  cache.delete(id);
}

export async function listClips() {
  const keys = await tx('readonly', (s) => s.getAllKeys());
  return new Set(keys || []);
}

async function loadBundled() {
  if (bundled) return bundled;
  try {
    const r = await fetch('audio/manifest.json');
    bundled = new Set(r.ok ? await r.json() : []);
  } catch {
    bundled = new Set();
  }
  return bundled;
}

// Returns a playable URL for the clip, or null if no human recording exists.
export async function clipUrl(id) {
  if (cache.has(id)) return cache.get(id);
  try {
    const blob = await tx('readonly', (s) => s.get(id));
    if (blob) {
      const u = URL.createObjectURL(blob);
      cache.set(id, u);
      return u;
    }
  } catch {}
  const b = await loadBundled();
  if (b.has(id)) {
    const u = `audio/${id}.mp3`;
    cache.set(id, u);
    return u;
  }
  return null;
}
