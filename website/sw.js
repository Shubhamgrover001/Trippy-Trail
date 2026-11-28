/* Trippy Trail service worker: offline-first for the site shell and assets. Bump CACHE on every release. */
const CACHE = 'trippy-trail-v7';
const PRECACHE = [
 "./assets/css/privacy.css",
 "./assets/css/site.css",
 "./assets/fonts/dm-sans-400.woff2",
 "./assets/fonts/dm-sans-600.woff2",
 "./assets/fonts/manrope-800.woff2",
 "./assets/icons/apple-touch-icon.png",
 "./assets/icons/favicon-32.png",
 "./assets/icons/icon-192.png",
 "./assets/icons/icon-512.png",
 "./assets/icons/maskable-512.png",
 "./assets/img/jibhi-forest-canopy-800.webp",
 "./assets/img/jibhi-forest-canopy.webp",
 "./assets/img/jibhi-mist-hills-hero-800.webp",
 "./assets/img/jibhi-mist-hills-hero.webp",
 "./assets/img/jibhi-mountain-views-800.webp",
 "./assets/img/jibhi-mountain-views.webp",
 "./assets/img/kashmir-gadsar-lake-800.webp",
 "./assets/img/kashmir-gadsar-lake.webp",
 "./assets/img/shangarh-green-meadows-800.webp",
 "./assets/img/shangarh-green-meadows.webp",
 "./assets/img/shangarh-village-sunset-800.webp",
 "./assets/img/shangarh-village-sunset.webp",
 "./assets/js/app.js",
 "./assets/js/config.js",
 "./assets/js/live.js",
 "./assets/js/trust.js",
 "./assets/js/pdf-libs.js",
 "./assets/js/privacy.js",
 "./",
 "./index.html",
 "./privacy.html",
 "./manifest.webmanifest"
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (/^\/(api|admin)(\/|$)/.test(url.pathname)) return; // live seats, prices and the admin page are never cached
  if (url.pathname.endsWith('/assets/js/config.js')) { // the live-mode switch must reach returning visitors: network first, cache only when offline
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => caches.match(req)));
    return;
  }
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(hit => hit || caches.match(req, { ignoreSearch: true })).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })));
});
