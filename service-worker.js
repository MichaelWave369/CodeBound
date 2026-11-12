const CACHE = "codebound-atlas-v5";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js",
  "./data/guides.js", "./data/scenarios.js", "./scenarios-ui.js", "./data/workshops.js", "./workshop-ui.js", "./data/blueprints.js", "./blueprints-ui.js", "./src/blueprint-core.js", "./src/workshop-core.js", "./src/core.js", "./manifest.webmanifest", "./icon.svg", "./fieldbook.html", "./fieldbook.txt"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((names) =>
    Promise.all(names.filter((name) => name.startsWith("codebound-atlas-") && name !== CACHE).map((name) => caches.delete(name)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put("./index.html", copy));
      }
      return response;
    }).catch(async () => (await caches.match("./index.html")) || Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then((cached) =>
    cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
  ));
});