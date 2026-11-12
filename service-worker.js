const CACHE = "codebound-atlas-v7";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js",
  "./data/guides.js", "./data/scenarios.js", "./scenarios-ui.js", "./data/workshops.js", "./workshop-ui.js", "./data/blueprints.js", "./blueprints-ui.js", "./src/blueprint-core.js", "./data/repairs.js", "./repair-ui.js", "./src/repair-core.js", "./data/preservation.js", "./preservation-ui.js", "./src/preservation-core.js", "./preservation-index.json", "./docs/PRESERVATION-PROTOCOL.md", "./drawings/label-holder-v1.svg", "./drawings/seed-tray-layout-v1.svg", "./drawings/water-zones-v1.svg", "./templates/seed-log-v1.csv", "./templates/notice-v1.txt", "./templates/verification-record-v1.txt", "./examples/label-holder.scad", "./docs/REPAIR-WORKSHEET.txt", "./src/workshop-core.js", "./src/core.js", "./manifest.webmanifest", "./icon.svg", "./fieldbook.html", "./fieldbook.txt"
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