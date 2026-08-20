const VERSION = "handbook-v2";

const SHELL = [
  "/app/",
  "/app/index.html",
  "/app/styles.css",
  "/app/app.js",
  "/app/outline.js",
  "/app/manifest.webmanifest",
  "/app/icons/icon-192.png",
  "/app/icons/icon-512.png",
  "/app/icons/icon-maskable-512.png",
  "/app/icons/apple-touch-icon.png",
];

const LESSONS = [
  "/README.md",
  "/PROGRESS.md",
  "/01-basics/README.md",
  "/01-basics/01-getting-started.md",
  "/01-basics/02-variables-and-data-types.md",
  "/01-basics/03-operators.md",
  "/01-basics/04-strings.md",
  "/01-basics/05-collections.md",
  "/01-basics/06-control-flow.md",
  "/01-basics/07-functions.md",
  "/01-basics/08-modules-and-files.md",
  "/01-basics/09-hands-on.md",
  "/01-basics/10-practice.md",
  "/02-intermediate/README.md",
  "/02-intermediate/01-comprehensions.md",
  "/02-intermediate/02-error-handling.md",
  "/02-intermediate/03-object-oriented-python.md",
  "/02-intermediate/04-iterators-and-generators.md",
  "/02-intermediate/05-decorators-and-context-managers.md",
  "/02-intermediate/06-functional-tools.md",
  "/02-intermediate/07-datetime-and-regex.md",
  "/03-advanced/README.md",
  "/03-advanced/01-type-hints.md",
  "/03-advanced/02-dataclasses.md",
  "/03-advanced/03-async-and-concurrency.md",
  "/03-advanced/04-testing.md",
  "/03-advanced/05-performance-and-internals.md",
  "/03-advanced/06-packaging-and-tooling.md",
  "/04-data-science/README.md",
  "/04-data-science/01-numpy.md",
  "/04-data-science/02-pandas.md",
  "/04-data-science/03-visualization.md",
  "/04-data-science/04-scipy-and-stats.md",
  "/04-data-science/05-end-to-end-project.md",
  "/labs/README.md",
  "/labs/northside-cafe/README.md",
  "/practice/README.md",
  "/quizzes/01-basics.md",
  "/quizzes/02-intermediate.md",
  "/quizzes/03-advanced.md",
  "/quizzes/04-data-science.md",
];

const CDN = [
  "https://cdn.jsdelivr.net/npm/marked@13.0.3/+esm",
  "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/+esm",
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css",
];

async function putAll(cache, urls) {
  await Promise.all(
    urls.map((url) =>
      cache.add(url).catch((error) => {
        console.warn("[sw] skip", url, error);
      })
    )
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      await putAll(cache, SHELL);
      await putAll(cache, LESSONS);
      await putAll(cache, CDN);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match("/app/index.html")) || Response.error())
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);

      if (url.origin === location.origin || url.hostname.includes("jsdelivr.net") || url.hostname.includes("gstatic.com") || url.hostname.includes("googleapis.com")) {
        return cached || network;
      }
      return network;
    })()
  );
});
