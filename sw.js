self.addEventListener("install", e => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", e => {
  console.log("Service Worker activated");
});

self.addEventListener("fetch", e => {
  console.log("Fetching:", e.request.url);
});

const CACHE_NAME = "pwa-v1";
const urlsToCache = [
  "/AMBW_COBA_DEPLOY/",             // base path
  "/AMBW_COBA_DEPLOY/index.html",
  "/AMBW_COBA_DEPLOY/style.css",
  "/AMBW_COBA_DEPLOY/script.js",
  "/AMBW_COBA_DEPLOY/manifest.json",
  "/AMBW_COBA_DEPLOY/icon.png"      // ganti sesuai nama icon kamu
];


self.addEventListener("install", e => {
  console.log("Service Worker installed");
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", e => {
  console.log("Service Worker activated");
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", e => {
  console.log("Fetching:", e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
