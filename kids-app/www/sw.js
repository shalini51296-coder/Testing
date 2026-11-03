// Offline cache for the installable web version (the Android app bundles files itself).
const CACHE = 'tara-v1';
const CORE = [
  './', 'index.html', 'css/app.css', 'manifest.webmanifest', 'icon.svg',
  'fonts/andika-400.woff2', 'fonts/andika-700.woff2', 'fonts/baloo2-latin.woff2', 'fonts/baloo2-deva.woff2',
  'js/main.js', 'js/studio.js',
  'js/core/util.js', 'js/core/storage.js', 'js/core/audio.js', 'js/core/recordings.js', 'js/core/engine.js', 'js/core/ui.js', 'js/core/tara.js',
  'js/content/words.js', 'js/content/phonics.js', 'js/content/hindi.js', 'js/content/skills.js',
  'js/games/index.js', 'js/games/runner.js', 'js/games/parts.js', 'js/games/language.js', 'js/games/sounds.js',
  'js/games/letters.js', 'js/games/math.js', 'js/games/thinking.js', 'js/games/hindi-games.js',
];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match('index.html'))));
});
