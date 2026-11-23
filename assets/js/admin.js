/* ============================================================
   MIZANORA PLATFORM — Admin Panel logic
   Owner-only: mezanora.market@gmail.com (Google Sign-In)
   ============================================================ */
import { Store } from "./store.js";

const MZ = window.MZ;
// utils (main.js se ya local fallback)
const U = window.MZU || {};
const $ = U.$ || ((sel, root = document) => root.querySelector(sel));
const $$ = U.$$ || ((sel, root = document) => [...root.querySelectorAll(sel)]);
const esc = U.esc || (s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
const fmtDate = U.fmtDate || (d => { try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return d; } });

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 3200);
}
function today() { return new Date().toISOString().slice(0, 10); }
function uid(prefix) { return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7); }

const MZAdmin = {
  /* ---- tab switching ---- */
  tab(name) {
    $$(".admin-panel").forEach(p => p.classList.remove("active"));
    $$("#admin-nav button").forEach(b => b.classList.remove("active"));
    const panel = $("#tab-" + name);
    if (panel) panel.classList.add("active");
    const btn = $(`#admin-nav button[data-tab="${name}"]`);
    if (btn) btn.classList.add("active");
  },

  newBlog() {
    ["bl-id", "bl-title", "bl-slug", "bl-cover", "bl-excerpt", "bl-tags", "bl-content"].forEach(id => { const el = $("#" + id); if (el) el.value = ""; });
    const d = $("#bl-date"); if (d) d.value = today();
  }
};
window.MZAdmin = MZAdmin;

/* =================== AUTH =================== */
function showAdmin(user) {
  $("#login-view").style.display = "none";
  $("#admin-view").style.display = "block";
  $("#owner-email").textContent = user.email;
  $("#store-mode").textContent = Store.mode;
  loadAll();
}
function showLogin() {
  $("#login-view").style.display = "block";
  $("#admin-view").style.display = "none";
  $("#login-mode").textContent = Store.mode;
}

$("#login-btn").addEventListener("click", async () => {
  try {
    const cred = await Store.signInGoogle();
    if (Store.isOwner(cred.user)) {
      toast("Welcome, owner! ✅");
      showAdmin(cred.user);
    } else {
      toast("⛔ Sirf owner login kar sakta hai.");
      await Store.signOut();
      showLogin();
    }
  } catch (e) {
    toast("Sign-in fail: " + (e && e.message));
    console.error(e);
  }
});

$("#logout-btn").addEventListener("click", async () => {
  await Store.signOut();
  showLogin();
});

Store.onAuth(user => {
  if (user && Store.isOwner(user)) showAdmin(user);
  else showLogin();
});

/* =================== TABS =================== */
$("#admin-nav").addEventListener("click", e => {
  const btn = e.target.closest("button[data-tab]");
  if (btn) MZAdmin.tab(btn.dataset.tab);
});

/* =================== DASHBOARD =================== */
async function loadDash() {
  const [status, blogs, projects, team, gallery] = await Promise.all([
    Store.list("status"), Store.list("blogs"), Store.list("projects"), Store.list("team"), Store.list("gallery")
  ]);
  $("#dash-stats").innerHTML = [
    [status.length, "Status posts"],
    [blogs.length, "Blogs"],
    [projects.length, "Projects"],
    [team.length + gallery.length, "Team + Media"]
  ].map(([n, l]) => `<div class="card stat-card"><div class="stat-num">${n}</div><div class="stat-label">${l}</div></div>`).join("");
}

/* =================== STATUS =================== */
async function loadStatus() {
  const items = await Store.list("status");
  $("#st-list").innerHTML = [...items].sort((a, b) => String(b.date).localeCompare(String(a.date))).map(s => `
    <div class="list-row">
      <div class="feed-date">${fmtDate(s.date)}</div>
      <div class="grow"><h4>${esc(s.text)}</h4><p>Tag: ${esc(s.tag || "update")}</p></div>
      <button class="btn btn-danger btn-sm" data-del="status:${esc(s.id)}">🗑</button>
    </div>`).join("");
}
$("#st-date").value = today();
$("#st-save").addEventListener("click", async () => {
  const text = $("#st-text").value.trim();
  if (!text) { toast("Text likhein"); return; }
  await Store.save("status", uid("s"), {
    date: $("#st-date").value || today(),
    tag: $("#st-tag").value,
    text
  });
  $("#st-text").value = "";
  toast("✅ Status save ho gaya");
  loadStatus(); loadDash();
});

/* =================== BLOGS =================== */
async function loadBlogs() {
  const items = await Store.list("blogs");
  $("#bl-list").innerHTML = [...items].sort((a, b) => String(b.date).localeCompare(String(a.date))).map(b => `
    <div class="list-row">
      <div class="grow">
        <h4>${esc(b.title)}</h4>
        <p>${esc(b.template)} · ${esc(b.category)} · ${fmtDate(b.date)} · /${esc(b.slug)}</p>
      </div>
      <a class="btn btn-ghost btn-sm" href="blog.html?slug=${esc(b.slug)}" target="_blank">👁</a>
      <button class="btn btn-ghost btn-sm" data-edit="blog:${esc(b.id)}">✏️</button>
      <button class="btn btn-danger btn-sm" data-del="blogs:${esc(b.id)}">🗑</button>
    </div>`).join("");
}
$("#bl-save").addEventListener("click", async () => {
  const title = $("#bl-title").value.trim();
  const slug = ($("#bl-slug").value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || uid("blog");
  if (!title) { toast("Title zaroori hai"); return; }
  const id = $("#bl-id").value || slug;
  await Store.save("blogs", id, {
    slug, title,
    template: $("#bl-template").value,
    category: $("#bl-category").value.trim() || "Blog",
    date: $("#bl-date").value || today(),
    author: $("#bl-author").value.trim() || "Mizanora Team",
    cover: $("#bl-cover").value.trim(),
    excerpt: $("#bl-excerpt").value.trim(),
    tags: $("#bl-tags").value.split(",").map(t => t.trim()).filter(Boolean),
    content: $("#bl-content").value
  });
  toast("✅ Blog save ho gaya");
  MZAdmin.newBlog();
  loadBlogs(); loadDash();
});

/* =================== PROJECTS =================== */
async function loadProjects() {
  const items = await Store.list("projects");
  $("#pj-list").innerHTML = items.map(p => `
    <div class="list-row">
      <div class="grow">
        <h4>${p.icon || "🚀"} ${esc(p.name)}</h4>
        <p>${esc(p.category)} · ${esc(p.status)} · ${esc(p.started)} → ${esc(p.updated)}</p>
      </div>
      <button class="btn btn-ghost btn-sm" data-edit="project:${esc(p.id)}">✏️</button>
      <button class="btn btn-danger btn-sm" data-del="projects:${esc(p.id)}">🗑</button>
    </div>`).join("");
}
$("#pj-save").addEventListener("click", async () => {
  const name = $("#pj-name").value.trim();
  if (!name) { toast("Project name zaroori hai"); return; }
  const slug = $("#pj-slug").value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let links = [];
  try { links = JSON.parse($("#pj-links").value || "[]"); } catch (e) { toast("Links JSON sahi nahi"); return; }
  const id = $("#pj-id").value || slug;
  await Store.save("projects", id, {
    slug, name,
    icon: $("#pj-icon").value.trim() || "🚀",
    category: $("#pj-category").value.trim() || "Project",
    status: $("#pj-status").value,
    tagline: $("#pj-tagline").value.trim(),
    stack: $("#pj-stack").value.split(",").map(s => s.trim()).filter(Boolean),
    started: $("#pj-started").value.trim(),
    updated: $("#pj-updated").value.trim(),
    story: $("#pj-story").value,
    how: $("#pj-how").value,
    incident: $("#pj-incident").value.trim() || "—",
    links,
    metrics: $("#pj-metrics").value.trim()
  });
  toast("✅ Project save ho gaya");
  ["pj-id", "pj-name", "pj-slug", "pj-tagline", "pj-story", "pj-how", "pj-incident", "pj-metrics"].forEach(x => { const el = $("#" + x); if (el) el.value = ""; });
  loadProjects(); loadDash();
});

/* =================== TEAM =================== */
async function loadTeam() {
  const items = await Store.list("team");
  $("#tm-list").innerHTML = items.map(m => `
    <div class="list-row">
      <div class="grow"><h4>${esc(m.name)}</h4><p>${esc(m.role)}</p></div>
      <button class="btn btn-ghost btn-sm" data-edit="team:${esc(m.id)}">✏️</button>
      <button class="btn btn-danger btn-sm" data-del="team:${esc(m.id)}">🗑</button>
    </div>`).join("");
}
$("#tm-save").addEventListener("click", async () => {
  const name = $("#tm-name").value.trim();
  if (!name) { toast("Name zaroori hai"); return; }
  let links = {};
  try { links = JSON.parse($("#tm-links").value || "{}"); } catch (e) { toast("Links JSON sahi nahi"); return; }
  const id = $("#tm-id").value || uid("t");
  await Store.save("team", id, {
    name,
    role: $("#tm-role").value.trim() || "Member",
    bio: $("#tm-bio").value.trim(),
    email: $("#tm-email").value.trim(),
    phone: $("#tm-phone").value.trim(),
    links
  });
  toast("✅ Member save ho gaya");
  ["tm-id", "tm-name", "tm-role", "tm-bio", "tm-email", "tm-phone", "tm-links"].forEach(x => { const el = $("#" + x); if (el) el.value = ""; });
  loadTeam(); loadDash();
});

/* =================== MEDIA =================== */
async function loadMedia() {
  const items = await Store.list("gallery");
  $("#md-list").innerHTML = items.map(g => {
    let media = `<div class="placeholder">${g.type === "video" ? "🎬" : g.type === "audio" ? "🎧" : "🖼️"}</div>`;
    if (g.url) {
      if (g.type === "video") media = `<video src="${esc(g.url)}" controls></video>`;
      else if (g.type === "audio") media = `<audio src="${esc(g.url)}" controls></audio>`;
      else media = `<img src="${esc(g.url)}" alt="${esc(g.caption || "")}">`;
    }
    return `<div class="media-card">
      ${media}
      <div class="cap">
        ${esc(g.caption || "")} ${g.url ? `<br><a href="${esc(g.url)}" target="_blank" style="font-size:0.75rem">🔗 ${esc(g.url).slice(0, 40)}…</a>` : ""}
        <br><button class="btn btn-danger btn-sm" style="margin-top:8px" data-del="gallery:${esc(g.id)}">🗑 Delete</button>
      </div>
    </div>`;
  }).join("");
}
$("#md-save").addEventListener("click", async () => {
  const type = $("#md-type").value;
  const caption = $("#md-caption").value.trim();
  const file = $("#md-file").files[0];
  let url = $("#md-url").value.trim();
  try {
    if (file) {
      toast("Uploading… (internet zaroori hai)");
      url = await Store.uploadFile(file, `gallery/${Date.now()}_${file.name}`);
    }
    if (!url) { toast("File ya URL dono me se ek zaroori hai"); return; }
    await Store.save("gallery", uid("g"), { type, url, caption, date: today() });
    toast("✅ Media save ho gaya");
    $("#md-file").value = ""; $("#md-url").value = ""; $("#md-caption").value = "";
    loadMedia(); loadDash();
  } catch (e) {
    toast("Upload fail: " + (e && e.message));
  }
});

/* =================== DELETE / EDIT delegation =================== */
document.addEventListener("click", async e => {
  const del = e.target.closest("[data-del]");
  if (del) {
    const [col, id] = del.dataset.del.split(":");
    if (!confirm("Delete karna confirm?")) return;
    await Store.remove(col, id);
    toast("🗑 Deleted");
    loadAll();
    return;
  }
  const edit = e.target.closest("[data-edit]");
  if (edit) {
    const [kind, id] = edit.dataset.edit.split(":");
    const col = kind === "blog" ? "blogs" : kind === "project" ? "projects" : "team";
    const items = await Store.list(col);
    const item = items.find(x => x.id === id);
    if (!item) return;
    if (kind === "blog") {
      MZAdmin.tab("blogs");
      $("#bl-id").value = item.id; $("#bl-title").value = item.title || "";
      $("#bl-slug").value = item.slug || ""; $("#bl-template").value = item.template || "update";
      $("#bl-category").value = item.category || ""; $("#bl-date").value = item.date || today();
      $("#bl-author").value = item.author || ""; $("#bl-cover").value = item.cover || "";
      $("#bl-excerpt").value = item.excerpt || ""; $("#bl-tags").value = (item.tags || []).join(", ");
      $("#bl-content").value = item.content || "";
    } else if (kind === "project") {
      MZAdmin.tab("projects");
      $("#pj-id").value = item.id; $("#pj-name").value = item.name || "";
      $("#pj-slug").value = item.slug || ""; $("#pj-icon").value = item.icon || "🚀";
      $("#pj-category").value = item.category || ""; $("#pj-status").value = item.status || "active";
      $("#pj-stack").value = (item.stack || []).join(", "); $("#pj-started").value = item.started || "";
      $("#pj-updated").value = item.updated || ""; $("#pj-tagline").value = item.tagline || "";
      $("#pj-story").value = item.story || ""; $("#pj-how").value = item.how || "";
      $("#pj-incident").value = item.incident || ""; $("#pj-links").value = JSON.stringify(item.links || []);
      $("#pj-metrics").value = item.metrics || "";
    } else {
      MZAdmin.tab("team");
      $("#tm-id").value = item.id; $("#tm-name").value = item.name || "";
      $("#tm-role").value = item.role || ""; $("#tm-bio").value = item.bio || "";
      $("#tm-email").value = item.email || ""; $("#tm-phone").value = item.phone || "";
      $("#tm-links").value = JSON.stringify(item.links || {});
    }
    window.scrollTo({ top: 200, behavior: "smooth" });
    toast("✏️ Edit mode — save par update ho jayega");
  }
});

/* =================== BACKUP =================== */
$("#bk-export").addEventListener("click", async () => {
  const data = await Store.exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `mizanora-backup-${today()}.json`;
  a.click();
  toast("⬇️ Backup download ho gaya — Google Drive par rakhein!");
});
$("#bk-import").addEventListener("click", async () => {
  const file = $("#bk-file").files[0];
  if (!file) { toast("JSON file select karein"); return; }
  try {
    const json = JSON.parse(await file.text());
    await Store.importAll(json);
    toast("✅ Import complete");
    loadAll();
  } catch (e) {
    toast("Import fail: " + (e && e.message));
  }
});

/* =================== SITEMAP =================== */
async function generateSitemap() {
  const base = MZ.SITE_URL.replace(/\/$/, "");
  const [blogs, projects] = await Promise.all([Store.list("blogs"), Store.list("projects")]);
  const todayStr = today();
  const urls = [
    { loc: base + "/", priority: "1.0", changefreq: "daily" },
    { loc: base + "/projects.html", priority: "0.9", changefreq: "weekly" },
    { loc: base + "/blog.html", priority: "0.9", changefreq: "daily" },
    { loc: base + "/team.html", priority: "0.7", changefreq: "monthly" },
    { loc: base + "/about.html", priority: "0.9", changefreq: "weekly" }
  ];
  blogs.forEach(b => urls.push({
    loc: `${base}/blog.html?slug=${encodeURIComponent(b.slug)}`,
    lastmod: b.date || todayStr, priority: "0.8", changefreq: "monthly"
  }));
  projects.forEach(p => urls.push({
    loc: `${base}/projects.html#${encodeURIComponent(p.slug)}`,
    lastmod: (p.updated || todayStr).length === 7 ? (p.updated || todayStr) + "-01" : (p.updated || todayStr),
    priority: "0.7", changefreq: "monthly"
  }));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod || todayStr}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n") +
    `\n</urlset>`;
  $("#sm-out").value = xml;
  toast(`⚡ Sitemap ready — ${urls.length} URLs`);
}
$("#sm-generate").addEventListener("click", generateSitemap);
$("#sm-download").addEventListener("click", () => {
  const xml = $("#sm-out").value;
  if (!xml) { toast("Pehle generate karein"); return; }
  const blob = new Blob([xml], { type: "application/xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sitemap.xml";
  a.click();
  toast("⬇️ sitemap.xml — repo root me replace karke commit karein");
});
$("#sm-copy").addEventListener("click", () => {
  const xml = $("#sm-out").value;
  if (!xml) { toast("Pehle generate karein"); return; }
  navigator.clipboard.writeText(xml).then(() => toast("📋 Copied!"));
});

/* =================== boot =================== */
async function loadAll() {
  await loadDash();
  await Promise.all([loadStatus(), loadBlogs(), loadProjects(), loadTeam(), loadMedia()]);
}
Store.init().then(() => {
  const m = $("#login-mode"); if (m) m.textContent = Store.mode;
});
