const { cache } = require("react");

const cache_name = "task-app-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json"
]
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cache_name)
        .then(cache => cache.addAll(urlsToCache))
    );  
});

self.addEventListener("active", e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if(key !== cache_name) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return reponse || fetch(e.request);
        })
    );
});