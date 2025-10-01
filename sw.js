
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('ffc-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/ShushilanLogo.png'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST' && event.request.url.endsWith('index.html')) {
    event.respondWith(Response.redirect('index.html'));
    event.waitUntil(
      (async () => {
        const formData = await event.request.formData();
        const image = formData.get('image');
        const clientsArr = await self.clients.matchAll({includeUncontrolled: true, type: 'window'});
        if (clientsArr && clientsArr.length) {
          clientsArr[0].postMessage({ image });
        }
      })()
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
