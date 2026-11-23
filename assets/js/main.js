/* ============================================================
   MIZANORA PLATFORM — main site logic (shared)
   ============================================================ */
import { Store } from "./store.js";

const MZ = window.MZ;

/* ---------- utils ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = d => {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch (e) { return d; }
};
window.MZU = { $, $$, esc, fmtDate };

/* ---------- minimal markdown renderer ---------- */
function md(src) {
  if (!src) return "";
  let t = esc(src);
  // code blocks
  t = t.replace(/```([\s\S]*?)```/g, (_, c) => `<pre><code>${c.trim()}</code></pre>`);
  // tables
  t = t.replace(/^((?:\|.+\|\n?)+)/gm, block => {
    const rows = block.trim().split("\n").filter(r => !/^\|[\s\-:|]+\|$/.test(r));
    if (!rows.length) return block;
    const head = rows[0].split("|").slice(1, -1).map(c => `<th>${c.trim()}</th>`).join("");
    const body = rows.slice(1).map(r => "<tr>" + r.split("|").slice(1, -1).map(c => `<td>${c.trim()}</td>`).join("") + "</tr>").join("");
    return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  });
  // headings
  t = t.replace(/^### (.+)$/gm, "<h3>$1</h3>")
       .replace(/^## (.+)$/gm, "<h2>$1</h2>")
       .replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // blockquote
  t = t.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  // bold / italic / inline code
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
       .replace(/\*([^*]+)\*/g, "<em>$1</em>")
       .replace(/`([^`]+)`/g, "<code>$1</code>");
  // links & images
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
       .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // lists
  t = t.replace(/^(?:- (.+)\n?)+/gm, b => "<ul>" + b.trim().split("\n").map(l => `<li>${l.replace(/^- /, "")}</li>`).join("") + "</ul>");
  // paragraphs (jo abhi tag nahi hain)
  t = t.split(/\n{2,}/).map(p => {
    const s = p.trim();
    if (!s) return "";
    if (/^<(h\d|ul|ol|pre|table|blockquote)/.test(s)) return s;
    return `<p>${s.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  return t;
}
window.MZMD = md;

/* ---------- header / footer injection ---------- */
function injectChrome() {
  const page = document.body.dataset.page || "";
  const links = [
    ["index.html", "Home", "home"],
    ["projects.html", "Projects", "projects"],
    ["blog.html", "Blog", "blog"],
    ["team.html", "Team", "team"],
    ["about.html", "About Muaaz", "about"]
  ];
  const nav = links.map(([href, label, key]) =>
    `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`).join("");

  const header = $("#site-header");
  if (header) header.innerHTML = `
    <div class="container nav-row">
      <a class="brand" href="index.html">
        <div class="brand-logo"><img src="assets/img/logo-64.png" width="38" height="38" alt="Mizanora logo" decoding="async"></div>
        <div>Mizanora<small>Platform · Muaaz Iqbal</small></div>
      </a>
      <button class="menu-btn" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
      <nav class="nav-links">
        ${nav}
        <a href="admin.html" class="nav-cta">Admin Panel</a>
      </nav>
    </div>`;

  const footer = $("#site-footer");
  if (footer) footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4 class="foot-brand"><img src="assets/img/logo-64.png" width="24" height="24" alt="" aria-hidden="true"> Mizanora Platform</h4>
          <p>Mizan (balance) + Noor (illumination). Pakistan-based digital infrastructure, halal e-commerce aur ethical AI — founded by <b>Muaaz Iqbal</b>, Kasur, Punjab.</p>
          <p>“Unchi soch. Chhote qadam.”</p>
        </div>
        <div>
          <h4>Pages</h4>
          <a href="index.html">Home</a>
          <a href="projects.html">Projects</a>
          <a href="blog.html">Blog</a>
          <a href="team.html">Team</a>
          <a href="about.html">About Muaaz Iqbal</a>
        </div>
        <div>
          <h4>Ecosystem</h4>
          <a href="https://mizanora.vercel.app" target="_blank" rel="noopener">Mizanora Store</a>
          <a href="https://barakatwave.vercel.app" target="_blank" rel="noopener">BarakatWave TV</a>
          <a href="https://asaan-lang.vercel.app" target="_blank" rel="noopener">Asaan Lang</a>
          <a href="https://github.com/Mizanoraorg" target="_blank" rel="noopener">GitHub · Mizanoraorg</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:mezanora.market@gmail.com">mezanora.market@gmail.com</a>
          <a href="https://wa.me/923062015326" target="_blank" rel="noopener">WhatsApp: +92 306 2015326</a>
          <a href="https://youtube.com/@MuaazIqbalofficial" target="_blank" rel="noopener">YouTube</a>
          <a href="https://x.com/MizanoraApps" target="_blank" rel="noopener">X / Twitter</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Mizanora · Kasur, Punjab, Pakistan. Built & maintained by Muaaz Iqbal.</span>
        <span>Mode: <b id="store-mode">…</b> · <a href="sitemap.xml">sitemap</a> · <a href="rss.xml">rss</a> · <a href="llms.txt">llms.txt</a> · <a href="admin.html">admin</a></span>
      </div>
    </div>`;
}

/* ---------- HOME ---------- */
async function renderHome() {
  const [status, projects, blogs] = await Promise.all([
    Store.list("status"), Store.list("projects"), Store.list("blogs")
  ]);

  // ticker
  const ticker = $("#ticker");
  if (ticker) {
    const words = projects.slice(0, 10).map(p => `<span>🚀 <b>${esc(p.name)}</b> — ${esc(p.tagline)}</span>`).join("");
    ticker.innerHTML = words + words;
  }

  // stats
  const stats = [
    ["90+", "Public Repositories"],
    ["13.7 MB", "Code Written"],
    ["800+", "Live TV Channels"],
    ["11,000+", "Store Products"],
    ["38", "Free Tools"],
    ["2–3 saal", "Continuous Mehnat"]
  ];
  const statsEl = $("#home-stats");
  if (statsEl) statsEl.innerHTML = stats.map(([n, l]) => `
    <div class="card stat-card"><div class="stat-num">${n}</div><div class="stat-label">${l}</div></div>`).join("");

  // status feed
  const feedEl = $("#home-status");
  if (feedEl) {
    const sorted = [...status].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    feedEl.innerHTML = sorted.slice(0, 7).map(s => `
      <div class="feed-item">
        <div class="feed-date">${fmtDate(s.date)}</div>
        <div class="feed-text"><span class="badge badge-gold">${esc(s.tag || "update")}</span> &nbsp;${esc(s.text)}</div>
      </div>`).join("");
  }

  // featured projects
  const projEl = $("#home-projects");
  if (projEl) {
    projEl.innerHTML = projects.slice(0, 6).map(p => projectCardHTML(p)).join("");
    bindProjectCards();
  }

  // latest blogs
  const blogEl = $("#home-blogs");
  if (blogEl) {
    const sorted = [...blogs].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    blogEl.innerHTML = sorted.slice(0, 3).map(b => blogCardHTML(b)).join("");
    bindBlogCards();
  }
}

/* ---------- shared card builders ---------- */
function statusBadge(s) {
  const map = { active: "badge-active", past: "badge-past", affected: "badge-affected" };
  const label = { active: "Active", past: "Past", affected: "Suspension Affected" };
  return `<span class="badge ${map[s] || "badge-gold"}">${label[s] || s}</span>`;
}

function projectCardHTML(p) {
  return `
    <div class="card project-card" data-slug="${esc(p.slug)}">
      <div class="top">
        <div class="icon">${p.icon || "🚀"}</div>
        <div><h3>${esc(p.name)}</h3>${statusBadge(p.status)}</div>
      </div>
      <p>${esc(p.tagline)}</p>
      <div class="chips">${(p.stack || []).slice(0, 4).map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      <div class="proj-meta">
        <span class="proj-dates">🗓 ${esc(p.started || "?")} → ${esc(p.updated || "?")}</span>
        <span class="badge badge-gold">${esc(p.category || "Project")}</span>
      </div>
    </div>`;
}

function blogCardHTML(b) {
  return `
    <div class="card blog-card" data-slug="${esc(b.slug)}">
      <div class="blog-cover">
        ${b.cover
          ? `<img src="${esc(b.cover)}" alt="${esc(b.title)}" loading="lazy" decoding="async">`
          : `<span class="cover-fallback">✍️</span>`}
      </div>
      <div class="blog-meta">
        <span class="badge badge-gold">${esc(b.template || "blog")}</span>
        <span>${fmtDate(b.date)}</span><span>· ${esc(b.author || "Mizanora")}</span>
      </div>
      <div class="blog-title-link">${esc(b.title)}</div>
      <p style="margin-top:8px">${esc(b.excerpt || "")}</p>
    </div>`;
}

function bindProjectCards() {
  $$(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(card.dataset.slug));
  });
}
function bindBlogCards() {
  $$(".blog-card").forEach(card => {
    card.addEventListener("click", () => { location.href = `blog.html?slug=${encodeURIComponent(card.dataset.slug)}`; });
  });
}

/* ---------- project modal ---------- */
async function openProject(slug) {
  const projects = await Store.list("projects");
  const p = projects.find(x => x.slug === slug);
  if (!p) return;
  const el = $("#modal-root");
  el.innerHTML = `
    <div class="modal-backdrop open" id="proj-modal">
      <div class="modal">
        <button class="modal-close" onclick="document.getElementById('proj-modal').classList.remove('open')">✕</button>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:8px">
          <div class="icon" style="width:58px;height:58px;font-size:1.8rem;border-radius:16px;background:rgba(212,175,55,0.12);display:grid;place-items:center">${p.icon || "🚀"}</div>
          <div><h2>${esc(p.name)}</h2>${statusBadge(p.status)} <span class="badge badge-gold">${esc(p.category || "")}</span></div>
        </div>
        <p style="color:var(--muted)">${esc(p.tagline || "")}</p>
        <div class="chips">${(p.stack || []).map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>

        <h4>📖 Kahani / Overview</h4>
        <div class="article-body">${md(p.story)}</div>

        <h4>⚙️ Kaise kaam karta hai</h4>
        <div class="article-body">${md(p.how)}</div>

        ${p.incident && p.incident !== "—" ? `<h4>⚠️ Kya hadsa hua</h4><div class="incident-box">${md(p.incident)}</div>` : ""}

        <h4>🗓 Dates</h4>
        <p><b>Start:</b> ${esc(p.started || "?")} &nbsp;·&nbsp; <b>Last update:</b> ${esc(p.updated || "?")}</p>
        ${p.metrics ? `<h4>📊 Numbers</h4><p>${esc(p.metrics)}</p>` : ""}
        ${(p.links && p.links.length) ? `<h4>🔗 Links</h4><p>${p.links.map(l => `<a class="btn btn-ghost btn-sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" ")}</p>` : ""}
      </div>
    </div>`;
  $("#proj-modal").addEventListener("click", e => {
    if (e.target.id === "proj-modal") e.target.classList.remove("open");
  });
}
window.MZopenProject = openProject;

/* ---------- PROJECTS page ---------- */
async function renderProjects() {
  const projects = await Store.list("projects");
  const grid = $("#projects-grid");
  const bar = $("#filter-bar");
  const cats = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
  let active = "All";

  function paint() {
    const list = active === "All" ? projects : projects.filter(p => p.category === active);
    grid.innerHTML = list.map(projectCardHTML).join("");
    bindProjectCards();
  }
  if (bar) {
    bar.innerHTML = cats.map(c => `<button class="filter-btn ${c === "All" ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    bar.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      active = btn.dataset.cat;
      $$(".filter-btn", bar).forEach(b => b.classList.toggle("active", b === btn));
      paint();
    });
  }
  paint();
}

/* ---------- BLOG page ---------- */
async function renderBlog() {
  const blogs = await Store.list("blogs");
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const listEl = $("#blog-list");
  const articleEl = $("#blog-article");

  if (slug && articleEl) {
    const b = blogs.find(x => x.slug === slug);
    if (b) {
      document.title = `${b.title} — Mizanora Blog`;
      articleEl.innerHTML = `
        ${b.cover ? `<figure class="article-cover"><img src="${esc(b.cover)}" alt="${esc(b.title)}" loading="lazy" decoding="async"></figure>` : ""}
        <div class="blog-meta" style="justify-content:center">
          <span class="badge badge-gold">${esc(b.template || "blog")}</span>
          <span>${fmtDate(b.date)}</span><span>· ${esc(b.author || "Mizanora Team")}</span>
          <span>· ${esc(b.category || "")}</span>
        </div>
        <h1 style="text-align:center;font-size:clamp(1.8rem,4vw,2.7rem);margin:14px 0 30px">${esc(b.title)}</h1>
        <div class="article-body">${md(b.content)}</div>
        <div class="chips" style="justify-content:center;margin:30px 0">${(b.tags || []).map(t => `<span class="chip">#${esc(t)}</span>`).join("")}</div>
        <div style="text-align:center"><a class="btn btn-ghost" href="blog.html">← Sab blogs</a></div>`;
      return;
    }
  }
  if (listEl) {
    const sorted = [...blogs].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    listEl.innerHTML = sorted.map(blogCardHTML).join("");
    bindBlogCards();
  }
}

/* ---------- TEAM page ---------- */
async function renderTeam() {
  const team = await Store.list("team");
  const el = $("#team-grid");
  if (!el) return;
  el.innerHTML = team.map(m => {
    const initial = (m.name || "?").trim().charAt(0).toUpperCase();
    const links = Object.entries(m.links || {}).filter(([, v]) => v);
    return `
      <div class="card member-card">
        <div class="avatar">${esc(initial)}</div>
        <h3>${esc(m.name)}</h3>
        <div class="badge badge-gold" style="margin:8px 0">${esc(m.role || "Member")}</div>
        <p>${esc(m.bio || "")}</p>
        ${m.email ? `<p style="margin-top:10px"><a href="mailto:${esc(m.email)}">📧 ${esc(m.email)}</a></p>` : ""}
        ${m.phone ? `<p><a href="https://wa.me/${esc(String(m.phone).replace(/[^0-9]/g, ""))}" target="_blank" rel="noopener">💬 ${esc(m.phone)}</a></p>` : ""}
        ${links.length ? `<div class="member-links">${links.map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("")}</div>` : ""}
      </div>`;
  }).join("");
}

/* ---------- ABOUT page ---------- */
async function renderAbout() {
  const [timeline, gallery, blogs] = await Promise.all([
    Store.list("timeline"), Store.list("gallery"), Store.list("blogs")
  ]);

  const tl = $("#timeline");
  if (tl) {
    tl.innerHTML = [...timeline].sort((a, b) => String(a.date).localeCompare(String(b.date))).map(t => `
      <div class="tl-item ${/⚠️|Suspension|incident/i.test(t.title + " " + t.text) ? "incident" : ""}">
        <div class="tl-date">${esc(t.date)}</div>
        <h4>${esc(t.title)}</h4>
        <p>${esc(t.text)}</p>
      </div>`).join("");
  }

  const gal = $("#gallery");
  if (gal) {
    gal.innerHTML = gallery.map(g => {
      let media = `<div class="placeholder">${g.type === "video" ? "🎬" : g.type === "audio" ? "🎧" : "🖼️"}</div>`;
      if (g.url) {
        if (g.type === "video") media = `<video src="${esc(g.url)}" controls></video>`;
        else if (g.type === "audio") media = `<audio src="${esc(g.url)}" controls></audio>`;
        else media = `<img src="${esc(g.url)}" alt="${esc(g.caption || "Mizanora media")}">`;
      }
      return `<div class="media-card">${media}<div class="cap">${esc(g.caption || "")} ${g.date ? "· " + fmtDate(g.date) : ""}</div></div>`;
    }).join("");
  }

  const related = $("#about-blogs");
  if (related) {
    const founder = blogs.filter(b => /founder|muaaz|story/i.test((b.category || "") + (b.title || "")));
    related.innerHTML = (founder.length ? founder : blogs).slice(0, 2).map(blogCardHTML).join("");
    bindBlogCards();
  }
}

/* ---------- boot ---------- */
(async function boot() {
  injectChrome();
  await Store.init();
  const modeEl = $("#store-mode");
  if (modeEl) modeEl.textContent = Store.mode;

  const page = document.body.dataset.page;
  try {
    if (page === "home") await renderHome();
    else if (page === "projects") await renderProjects();
    else if (page === "blog") await renderBlog();
    else if (page === "team") await renderTeam();
    else if (page === "about") await renderAbout();
  } catch (e) {
    console.error("[Mizanora] render error:", e);
  }
})();
