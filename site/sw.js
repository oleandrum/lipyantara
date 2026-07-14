// sw.js — Lipyantara service worker
//
// Two caching strategies:
// 1. The Aksharamukha/Pyodide engine (cdn.jsdelivr.net): cache-first. These
//    assets are large (~17MB) and effectively immutable per version, so once
//    cached they're served instantly and never re-fetched.
// 2. The app shell (same-origin pages): network-first, falling back to cache
//    when offline, so content stays fresh when online but still works
//    without a connection.

const SHELL_CACHE = "lipyantara-shell-v1";
const ENGINE_CACHE = "lipyantara-engine-v1";

const SHELL_ASSETS = [
  "./app.html",
  "./index.html",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== ENGINE_CACHE)
          .map((key) => caches.delete(key)),
      )
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== "GET") return;

  // Cache-first for the CDN-hosted transliteration engine
  if (url.hostname === "cdn.jsdelivr.net") {
    event.respondWith(
      caches.open(ENGINE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }),
    );
    return;
  }

  // Network-first for same-origin pages, falling back to cache offline
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
  }
});
