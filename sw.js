const CACHE_NAME = 'tct-trail-demo-v1';
const APP_BASE = new URL('./', self.location.href);
const APP_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'model.js',
  'leaflet.css',
  'leaflet.js',
  'LEAFLET-LICENSE.txt',
  'WORKFLOW.md',
  'manifest.webmanifest',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(
    APP_FILES.map(file => new URL(file, APP_BASE))
  )));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(
    names.filter(name => name.startsWith('tct-trail-demo-') && name !== CACHE_NAME)
      .map(name => caches.delete(name))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== APP_BASE.origin) return;
  if (!new URL(request.url).href.startsWith(APP_BASE.href)) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(new URL('index.html', APP_BASE))));
    return;
  }

  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});