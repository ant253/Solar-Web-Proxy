importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) =>
  event.respondWith(sw.fetch(event))
);