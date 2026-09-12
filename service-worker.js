const CACHE='peye-tours-v1';
const ASSETS=['./','./index.html','./css/styles.css','./js/app.js','./manifest.json','./assets/chivas-toluca.jpeg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
