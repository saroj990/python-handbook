import { marked } from "https://cdn.jsdelivr.net/npm/marked@13.0.3/+esm";
import hljs from "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/+esm";
import { sections, studio, allLessonPages, findPage, neighbors } from "/app/outline.js";

const STORAGE_DONE = "handbook-done";
const STORAGE_TASKS = "handbook-tasks";
const STORAGE_THEME = "handbook-theme";

const pageEl = document.getElementById("page");
const navEl = document.getElementById("nav");
const crumbsEl = document.getElementById("crumbs");
const pagerEl = document.getElementById("pager");
const searchEl = document.getElementById("search");
const sidebarEl = document.getElementById("sidebar");
const scrimEl = document.getElementById("scrim");

marked.use({ gfm: true, breaks: false });

function loadMap(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function saveMap(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function isDone(path) {
  return Boolean(loadMap(STORAGE_DONE)[path]);
}

function setDone(path, done) {
  const map = loadMap(STORAGE_DONE);
  if (done) map[path] = true;
  else delete map[path];
  saveMap(STORAGE_DONE, map);
}

function currentRoute() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  if (!raw) return { path: "", hash: "" };
  const [path, hash] = raw.split("#");
  return { path, hash: hash || "" };
}

function hrefFor(path, hash) {
  return hash ? `#/${path}#${hash}` : `#/${path}`;
}

function resolve(fromPath, href) {
  if (!href || href.startsWith("http") || href.startsWith("mailto:")) return href;
  const [file, hash] = href.split("#");
  if (!file) return href;
  if (file.startsWith("/")) {
    return file.slice(1) + (hash ? `#${hash}` : "");
  }
  const parts = fromPath.split("/").slice(0, -1);
  for (const bit of file.split("/")) {
    if (bit === "..") parts.pop();
    else if (bit && bit !== ".") parts.push(bit);
  }
  return parts.join("/") + (hash ? `#${hash}` : "");
}

function renderNav(filter = "") {
  const q = filter.trim().toLowerCase();
  const chunks = [];

  for (const section of sections) {
    const pages = section.pages.filter((page) => !q || page.title.toLowerCase().includes(q) || section.title.toLowerCase().includes(q));
    if (!pages.length) continue;
    const done = section.pages.filter((page) => isDone(page.path)).length;
    chunks.push(`<div class="nav-group">
      <div class="nav-label"><span>${section.title}</span><span>${done}/${section.pages.length}</span></div>
      ${pages
        .map(
          (page) => `<a class="nav-link" data-link href="${hrefFor(page.path)}">
            <span class="dot ${isDone(page.path) ? "done" : ""}"></span>${page.title}
          </a>`
        )
        .join("")}
    </div>`);
  }

  const extras = studio.filter((page) => !q || page.title.toLowerCase().includes(q));
  if (extras.length) {
    chunks.push(`<div class="nav-group">
      <div class="nav-label"><span>Studio</span></div>
      ${extras
        .map((page) => `<a class="nav-link" data-link href="${hrefFor(page.path)}">${page.title}</a>`)
        .join("")}
    </div>`);
  }

  navEl.innerHTML = chunks.join("") || `<p class="nav-label">No matches</p>`;
  markActive();
}

function markActive() {
  const { path } = currentRoute();
  navEl.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === hrefFor(path) || href === `#/${path}`);
  });
}

function homeHTML() {
  const lessons = allLessonPages();
  const done = lessons.filter((page) => isDone(page.path)).length;
  const pct = Math.round((done / lessons.length) * 100);
  const next = lessons.find((page) => !isDone(page.path)) || lessons[0];

  const cards = sections
    .map((section) => {
      const finished = section.pages.filter((page) => isDone(page.path)).length;
      const firstOpen = section.pages.find((page) => !isDone(page.path)) || section.pages[0];
      return `<a class="card" data-link href="${hrefFor(firstOpen.path)}">
        <h2>${section.title}</h2>
        <p>${section.blurb}</p>
        <div class="meta">${finished}/${section.pages.length} lessons · ${section.hours}</div>
      </a>`;
    })
    .join("");

  return `<section class="home-hero">
      <h1>Open the shop.</h1>
      <p>Read a lesson, fail a drill, fix it, then ship a café feature. Progress stays in this browser.</p>
      <div class="progress-row">
        <div class="bar" aria-hidden="true"><span style="width:${pct}%"></span></div>
        <strong>${done}/${lessons.length}</strong>
      </div>
    </section>
    <div class="cards">${cards}</div>
    <a class="continue" data-link href="${hrefFor(next.path)}">
      <span>
        <span>Continue</span>
        <strong>${next.title}</strong>
      </span>
      <b>Start →</b>
    </a>
    <p style="margin-top:1.4rem;color:var(--muted)">
      Prefer the raw book? <a data-link href="${hrefFor("README.md")}">Open the README</a>
      · <a data-link href="${hrefFor("labs/northside-cafe/README.md")}">Café lab</a>
      · <a data-link href="${hrefFor("practice/README.md")}">Drills</a>
    </p>`;
}

function rewriteLinks(currentPath) {
  pageEl.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;
    if (href.startsWith("#") && !href.startsWith("#/")) return;
    const resolved = resolve(currentPath, href);
    const [file, hash] = resolved.split("#");
    if (file.endsWith(".md") || file.endsWith(".py") || file.endsWith(".txt") || file.endsWith(".csv")) {
      anchor.setAttribute("href", hrefFor(file, hash));
      anchor.setAttribute("data-link", "");
    }
  });
}

function enhanceTasks(path) {
  const tasks = loadMap(STORAGE_TASKS);
  pageEl.querySelectorAll("input[type=checkbox]").forEach((box, index) => {
    const label = (box.parentElement?.textContent || "").trim();
    const key = `${path}::${index}::${label}`;
    box.disabled = false;
    box.checked = Boolean(tasks[key] || box.checked);
    box.addEventListener("change", () => {
      const map = loadMap(STORAGE_TASKS);
      if (box.checked) map[key] = true;
      else delete map[key];
      saveMap(STORAGE_TASKS, map);
    });
    box.closest("li")?.classList.add("task");
  });
}

function highlightCode() {
  pageEl.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
}

function renderPager(path) {
  const meta = findPage(path);
  const { prev, next } = neighbors(path);
  if (!meta && !prev && !next) {
    pagerEl.hidden = true;
    pagerEl.innerHTML = "";
    return;
  }
  const done = isDone(path);
  pagerEl.hidden = false;
  pagerEl.innerHTML = `
    ${prev ? `<a data-link href="${hrefFor(prev.path)}">← ${prev.title}</a>` : "<span></span>"}
    ${meta && allLessonPages().some((page) => page.path === path)
      ? `<button class="done" id="done-btn" type="button" aria-pressed="${done}">${done ? "Completed" : "Mark done"}</button>`
      : "<span></span>"}
    ${next ? `<a class="next" data-link href="${hrefFor(next.path)}">${next.title} →</a>` : "<span></span>"}
  `;
  document.getElementById("done-btn")?.addEventListener("click", () => {
    setDone(path, !isDone(path));
    renderNav(searchEl.value);
    renderPager(path);
  });
}

async function loadFile(path) {
  const response = await fetch(`/${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`${response.status} ${path}`);
  return response.text();
}

function languageFor(path) {
  if (path.endsWith(".py")) return "python";
  if (path.endsWith(".csv")) return "plaintext";
  if (path.endsWith(".json")) return "json";
  return "plaintext";
}

async function show(path, hash) {
  closeMenu();
  window.scrollTo(0, 0);

  if (!path) {
    crumbsEl.textContent = "Home";
    document.title = "Python Handbook";
    pageEl.innerHTML = homeHTML();
    pagerEl.hidden = true;
    markActive();
    return;
  }

  const meta = findPage(path);
  crumbsEl.textContent = meta ? meta.title : path;
  document.title = `${meta ? meta.title : path} · Handbook`;
  pageEl.innerHTML = `<p class="file-note">Loading…</p>`;

  try {
    const text = await loadFile(path);
    if (path.endsWith(".md")) {
      pageEl.innerHTML = marked.parse(text);
      rewriteLinks(path);
      enhanceTasks(path);
      highlightCode();
    } else {
      const lang = languageFor(path);
      const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      pageEl.innerHTML = `
        <p class="file-note">This is a source file. Edit it in Cursor, then run <code>python3 practice/check.py</code> in a terminal.</p>
        <h1>${path.split("/").pop()}</h1>
        <pre><code class="language-${lang}">${escaped}</code></pre>`;
      highlightCode();
    }
    renderPager(path);
    markActive();
    if (hash) {
      const target = document.getElementById(hash) || document.querySelector(`[id="${CSS.escape(hash)}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (error) {
    pageEl.innerHTML = `<h1>Could not open</h1><p>${error.message}</p>
      <p class="file-note">If you are online, launch with <code>python3 serve.py</code> or wait for the Vercel deploy. If you installed the app, open this lesson once while online so it can be cached.</p>`;
    pagerEl.hidden = true;
  }
}

function route() {
  const { path, hash } = currentRoute();
  show(path, hash);
}

function closeMenu() {
  sidebarEl.classList.remove("open");
  scrimEl.hidden = true;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_THEME, theme);
}

document.getElementById("theme-btn").addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("menu-btn").addEventListener("click", () => {
  sidebarEl.classList.add("open");
  scrimEl.hidden = false;
});
scrimEl.addEventListener("click", closeMenu);

searchEl.addEventListener("input", () => renderNav(searchEl.value));

document.body.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#/")) return;
  event.preventDefault();
  if (location.hash !== href) location.hash = href;
  else route();
  closeMenu();
});

window.addEventListener("hashchange", route);
window.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea")) return;
  const { path } = currentRoute();
  const { prev, next } = neighbors(path);
  if (event.key === "ArrowLeft" && prev) location.hash = hrefFor(prev.path);
  if (event.key === "ArrowRight" && next) location.hash = hrefFor(next.path);
});

applyTheme(localStorage.getItem(STORAGE_THEME) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
renderNav();
route();

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

const installBtn = document.getElementById("install-btn");
let deferredPrompt = null;

if (isStandalone()) {
  document.documentElement.dataset.installed = "true";
} else if (isIOS()) {
  installBtn.hidden = false;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installBtn.hidden = true;
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
    return;
  }
  if (isIOS()) {
    window.alert("On iPhone or iPad: tap Share, then Add to Home Screen.");
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
    console.warn("Service worker not registered", error);
  });
}
