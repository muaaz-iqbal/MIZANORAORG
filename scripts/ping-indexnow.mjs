#!/usr/bin/env node
/* ============================================================
   IndexNow ping — instant indexing for Bing / Yandex / Seznam
   (Google uses the sitemap index; IndexNow covers the rest.)

   Usage: node scripts/ping-indexnow.mjs [--site=https://mizanoraorg.web.app]
   ============================================================ */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEY = "8f3c1d7a94b25e6fa07c4d19b6e2a7f5";
const SITE = ((process.argv.find((a) => a.startsWith("--site=")) || "").split("=")[1] ||
  "https://mizanoraorg.web.app").replace(/\/$/, "");
const HOST = new URL(SITE).host;

const read = (f) => {
  try { return readFileSync(join(root, f), "utf8"); } catch { return ""; }
};

const files = ["sitemap.xml", "sitemaps/blog.xml"];
const urls = [];
for (const f of files) {
  const xml = read(f);
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = m[1].trim();
    if (u.startsWith(SITE)) urls.push(u);
  }
}
const unique = [...new Set(urls)].slice(0, 10000);
if (!unique.length) {
  console.log("IndexNow: koi URL nahi mila — skip.");
  process.exit(0);
}

const body = { host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: unique };

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow: ${unique.length} URLs → HTTP ${res.status}`);
  if (!res.ok) console.log(await res.text().catch(() => ""));
} catch (e) {
  console.log("IndexNow ping fail (non-fatal):", e.message);
}
