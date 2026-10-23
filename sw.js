const CACHE = "divadoecom-6d414844cd";
const ARQUIVOS = ["./", "index.html", "manifest.webmanifest", "icone-180.png", "icone-192.png", "icone-512.png"];
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS))); });
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html"))));
});
