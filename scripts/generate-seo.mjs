#!/usr/bin/env node
/* ============================================================
   MIZANORA PLATFORM — static SEO generator (v2)

   Mirrors the structure used by the MIZANORA (Next.js) repo:
     /sitemap-index.xml      → sitemap index (submit THIS to Google)
     /sitemap.xml            → core pages
     /sitemaps/blog.xml      → every article + <image:image> cover
     /rss.xml                → RSS 2.0 feed
     /robots.txt             → host-aware Sitemap: line
     /blog/<slug>.html       → real static article pages

   Host-aware:  node scripts/generate-seo.mjs --site=https://mizanoraorg.web.app
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "assets/js/data.js");

/* data.js is a classic script that assigns window.MZ — run it with a shim */
globalThis.window = globalThis.window || {};
const dataSrc = readFileSync(dataPath, "utf8");
new Function("window", dataSrc)(globalThis.window);
const MZ = globalThis.window.MZ;
const SEED = MZ.SEED;

/* ---------- host ---------- */
const argSite = (process.argv.find((a) => a.startsWith("--site=")) || "").split("=")[1];
const SITE = (argSite || process.env.SITE_URL || MZ.SITE_URL).replace(/\/$/, "");

const today = new Date().toISOString().slice(0, 10);
const nowUTC = new Date().toUTCString();

const esc = (s = "") => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const abs = (p) => (!p ? "" : /^https?:/i.test(p) ? p : `${SITE}/${String(p).replace(/^\//, "")}`);

/* ---------- markdown-lite (same rules as assets/js/main.js) ---------- */
function md(src) {
  if (!src) return "";
  let t = esc(src);
  t = t.replace(/```([\s\S]*?)```/g, (_, c) => `<pre><code>${c.trim()}</code></pre>`);
  t = t.replace(/^((?:\|.+\|\n?)+)/gm, (block) => {
    const rows = block.trim().split("\n").filter((r) => !/^\|[\s\-:|]+\|$/.test(r));
    if (!rows.length) return block;
    const head = rows[0].split("|").slice(1, -1).map((c) => `<th>${c.trim()}</th>`).join("");
    const body = rows.slice(1).map((r) => "<tr>" + r.split("|").slice(1, -1).map((c) => `<td>${c.trim()}</td>`).join("") + "</tr>").join("");
    return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  });
  t = t.replace(/^### (.+)$/gm, "<h3>$1</h3>")
       .replace(/^## (.+)$/gm, "<h2>$1</h2>")
       .replace(/^# (.+)$/gm, "<h1>$1</h1>");
  t = t.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
       .replace(/\*([^*]+)\*/g, "<em>$1</em>")
       .replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
       .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  t = t.replace(/^(?:- (.+)\n?)+/gm, (b) => "<ul>" + b.trim().split("\n").map((l) => `<li>${l.replace(/^- /, "")}</li>`).join("") + "</ul>");
  return t.split(/\n{2,}/).map((p) => {
    const s = p.trim();
    if (!s) return "";
    if (/^<(h\d|ul|ol|pre|table|blockquote)/.test(s)) return s;
    return `<p>${s.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
}

const fmtDate = (d) => {
  try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); }
  catch { return d; }
};

/* ---------- data ---------- */
const blogs = [...(SEED.blogs || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));

const pages = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/projects.html", priority: "0.9", changefreq: "weekly" },
  { loc: "/blog.html", priority: "0.9", changefreq: "daily" },
  { loc: "/about.html", priority: "0.8", changefreq: "monthly" },
  { loc: "/team.html", priority: "0.6", changefreq: "monthly" },
];

/* ============================================================
   1. /sitemap.xml  — core pages
   ============================================================ */
const coreSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

/* ============================================================
   2. /sitemaps/blog.xml — articles + image sitemap
   ============================================================ */
const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/blog.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${blogs.map((b) => `  <url>
    <loc>${SITE}/blog/${b.slug}.html</loc>
    <lastmod>${b.date || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${b.cover ? `
    <image:image>
      <image:loc>${abs(b.cover)}</image:loc>
      <image:title>${esc(b.title)}</image:title>
      <image:caption>${esc(b.excerpt || b.title)}</image:caption>
    </image:image>` : ""}
  </url>`).join("\n")}
</urlset>
`;

/* ============================================================
   3. /sitemap-index.xml — what you submit to Search Console
   ============================================================ */
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemaps/blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

/* ============================================================
   4. /rss.xml
   ============================================================ */
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(MZ.SITE_NAME)} — Blog</title>
    <link>${SITE}/blog.html</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Mizanora Platform — ${esc(MZ.OWNER_NAME)} ke projects, blogs aur updates.</description>
    <language>en-pk</language>
    <lastBuildDate>${nowUTC}</lastBuildDate>
${blogs.slice(0, 20).map((b) => `    <item>
      <title>${esc(b.title)}</title>
      <link>${SITE}/blog/${b.slug}.html</link>
      <guid isPermaLink="true">${SITE}/blog/${b.slug}.html</guid>
      <pubDate>${new Date(b.date || today).toUTCString()}</pubDate>
      <category>${esc(b.category || "Blog")}</category>
      <description>${esc(b.excerpt)}</description>${b.cover ? `
      <media:content url="${abs(b.cover)}" medium="image"/>` : ""}
    </item>`).join("\n")}
  </channel>
</rss>
`;

/* ============================================================
   5. /robots.txt  — host aware
   ============================================================ */
const robots = `# Mizanora Platform — robots.txt
# ${SITE}/

User-agent: *
Allow: /
Disallow: /admin.html

# AI / LLM crawlers welcome (llms.txt dekhein)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

# Submit the index — it lists /sitemap.xml and /sitemaps/blog.xml
Sitemap: ${SITE}/sitemap-index.xml
Sitemap: ${SITE}/sitemap.xml
`;

/* ============================================================
   6. /blog/<slug>.html — real static article pages
   ============================================================ */
const VERIFY = [
  "PiedLWGigl4PJjb1sUkoYc7PjDy9AjBX02JwfnO1gZg",
  "jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM",
];

function articlePage(b) {
  const url = `${SITE}/blog/${b.slug}.html`;
  const cover = abs(b.cover);
  const others = blogs.filter((x) => x.slug !== b.slug).slice(0, 3);

  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: b.title,
        description: b.excerpt || b.title,
        datePublished: b.date,
        dateModified: b.date,
        author: { "@type": "Person", name: b.author || MZ.OWNER_NAME, url: `${SITE}/about.html` },
        publisher: { "@type": "Organization", name: "Mizanora", url: `${SITE}/` , logo: { "@type": "ImageObject", url: `${SITE}/assets/img/logo-512.png` } },
        mainEntityOfPage: url,
        ...(cover ? { image: [cover] } : {}),
        articleSection: b.category || "Blog",
        ...(b.tags && b.tags.length ? { keywords: b.tags.join(", ") } : {}),
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog.html` },
          { "@type": "ListItem", position: 3, name: b.title, item: url },
        ],
      },
    ],
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(b.title)} — Mizanora Blog | ${esc(MZ.OWNER_NAME)}</title>
  <meta name="description" content="${esc(b.excerpt || b.title)}">
  <meta name="keywords" content="${esc((b.tags || []).join(", "))}">
  <meta name="author" content="${esc(b.author || MZ.OWNER_NAME)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
${VERIFY.map((t) => `  <meta name="google-site-verification" content="${t}">`).join("\n")}
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Mizanora Platform">
  <meta property="og:title" content="${esc(b.title)}">
  <meta property="og:description" content="${esc(b.excerpt || b.title)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="en_PK">
  <meta property="og:image" content="${cover || `${SITE}/assets/img/og-cover.jpg`}">
  <meta property="og:image:alt" content="${esc(b.title)}">
  <meta property="article:published_time" content="${b.date}">
  <meta property="article:section" content="${esc(b.category || "Blog")}">
${(b.tags || []).map((t) => `  <meta property="article:tag" content="${esc(t)}">`).join("\n")}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(b.title)}">
  <meta name="twitter:description" content="${esc(b.excerpt || b.title)}">
  <meta name="twitter:image" content="${cover || `${SITE}/assets/img/og-cover.jpg`}">
  <script type="application/ld+json">${jsonld}</script>
  <!-- Branding / icons -->
  <link rel="icon" href="../favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/favicon-32.png">
  <link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
  <meta name="theme-color" content="#060d0a">
  <link rel="alternate" type="application/rss+xml" title="Mizanora Blog RSS" href="../rss.xml">
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/enhance.css">
</head>
<body data-page="article">
  <div class="aurora"></div>
  <div class="grid-overlay"></div>

  <header class="site-header" id="site-header"></header>

  <main class="section">
    <div class="container" style="max-width:920px">
      <nav aria-label="Breadcrumb" style="font-size:.8rem;color:var(--muted);margin-bottom:18px">
        <a href="../index.html">Home</a> ›
        <a href="../blog.html">Blog</a> ›
        <span>${esc(b.category || "Article")}</span>
      </nav>

      <article id="blog-article">
        ${b.cover ? `<figure class="article-cover"><img src="../${esc(b.cover)}" alt="${esc(b.title)}" fetchpriority="high" decoding="async"></figure>` : ""}
        <div class="blog-meta" style="justify-content:center">
          <span class="badge badge-gold">${esc(b.template || "blog")}</span>
          <span>${fmtDate(b.date)}</span><span>· ${esc(b.author || "Mizanora Team")}</span>
          <span>· ${esc(b.category || "")}</span>
        </div>
        <h1 style="text-align:center;font-size:clamp(1.8rem,4vw,2.7rem);margin:14px 0 30px">${esc(b.title)}</h1>
        <div class="article-body">${md(b.content)}</div>
        <div class="chips" style="justify-content:center;margin:30px 0">${(b.tags || []).map((t) => `<span class="chip">#${esc(t)}</span>`).join("")}</div>
        <div style="text-align:center"><a class="btn btn-ghost" href="../blog.html">← Sab blogs</a></div>
      </article>

      <section style="margin-top:50px">
        <div class="section-head"><div><div class="kicker">Parhein bhi</div><h2 style="font-size:1.4rem">Mazeed articles</h2></div></div>
        <div class="grid">
${others.map((o) => `          <a class="card blog-card" href="./${o.slug}.html">
            <div class="blog-cover"><img src="../${esc(o.cover)}" alt="${esc(o.title)}" loading="lazy" decoding="async"></div>
            <div class="blog-meta"><span class="badge badge-gold">${esc(o.template)}</span><span>${fmtDate(o.date)}</span></div>
            <div class="blog-title-link">${esc(o.title)}</div>
          </a>`).join("\n")}
        </div>
      </section>
    </div>
  </main>

  <footer id="site-footer"></footer>

  <script type="module" src="../assets/js/main.js"></script>
  <script src="../assets/js/enhance.js" defer></script>
</body>
</html>
`;
}

/* ---------- write everything ---------- */
writeFileSync(join(root, "sitemap.xml"), coreSitemap);
writeFileSync(join(root, "sitemap-index.xml"), sitemapIndex);

const smDir = join(root, "sitemaps");
mkdirSync(smDir, { recursive: true });
writeFileSync(join(smDir, "blog.xml"), blogSitemap);

writeFileSync(join(root, "rss.xml"), rss);
writeFileSync(join(root, "robots.txt"), robots);

const blogDir = join(root, "blog");
mkdirSync(blogDir, { recursive: true });
// clean stale article files
if (existsSync(blogDir)) {
  for (const f of readdirSync(blogDir)) {
    if (f.endsWith(".html")) rmSync(join(blogDir, f));
  }
}
for (const b of blogs) writeFileSync(join(blogDir, `${b.slug}.html`), articlePage(b));

console.log(`✅ ${SITE}`);
console.log(`   sitemap-index.xml  → 2 child sitemaps`);
console.log(`   sitemap.xml        → ${pages.length} core pages`);
console.log(`   sitemaps/blog.xml  → ${blogs.length + 1} URLs (+ image:image covers)`);
console.log(`   rss.xml            → ${Math.min(blogs.length, 20)} items`);
console.log(`   robots.txt         → Sitemap: ${SITE}/sitemap-index.xml`);
console.log(`   blog/*.html        → ${blogs.length} static article pages`);
