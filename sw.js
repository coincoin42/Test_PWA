// Nom du cache
const CACHE_NAME = 'site-cache-v1';

// Liste des ressources à mettre en cache
const RESOURCES_TO_CACHE = [
  './',
  'pwa.html',
  'styles.css',
  'imgs/a.jpg',
  'imgs/b.jpg',
  'imgs/c.jpg',
  'imgs/d.jpg',
  'imgs/icone.png'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des ressources');
      return cache.addAll(RESOURCES_TO_CACHE);
    })
  );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Suppression du cache obsolète', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      
      return response || fetch(event.request);
    })
  );
});
