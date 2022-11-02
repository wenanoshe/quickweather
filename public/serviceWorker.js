const CACHE_NAME = "v-1";

const assets = [
  "index.html",
  "offline.html",
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Raleway:wght@200;300;600;700;800&display=swap",
];

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

// Activate/

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

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

// Listen requests/
self.addEventListener("fetch", (e) => {
  const result = caches
    .match(e.request)
    .then((response) => response || fetch(e.request))
    .catch((err) => {
      console.log(err);
      return caches.match("offline.html");
    });

  e.respondWith(result);
});
