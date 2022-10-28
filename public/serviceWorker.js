const CACHE_NAME = "v-1";

const assets = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (e) => {
  // Precaching, storing assets in cache ahead of time
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assets);
      })
      .catch((err) => console.log(err))
  );
});

// Listen requests
//
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => {
        caches.match("offline.html");
      });
    })
  );
});

// Activate
//
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
