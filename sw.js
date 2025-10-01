
self.addEventListener('install', (event) => {
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

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST') {
    event.respondWith(Response.redirect('index.html'));
    event.waitUntil(
      (async () => {
        const formData = await event.request.formData();
        const image = formData.get('image');
        const client = await self.clients.get(event.resultingClientId);
        client.postMessage({ image });
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
