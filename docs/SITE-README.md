# ⚖️ Mizanora Platform

**Muaaz Iqbal (Mizanora)** ka official record platform — projects, blogs, status, team, media,
timeline, aur GitHub suspension incident ki poori detail. Firebase-powered + GitHub Pages ready.

> “Unchi soch. Chhote qadam.” — Muaaz Iqbal, Kasur, Punjab, Pakistan

---

## 🧩 Features

| Feature | Detail |
| --- | --- |
| 📌 Status Feed | Mizanora kya kar raha hai — live updates (home page ticker + feed) |
| 🚀 Projects | Active / Past / Suspension-affected — her project ki kahani, stack, dates, **incident detail** |
| ✍️ Blogs | 4 templates: **update · tutorial · story · news** — markdown-lite editor |
| 🤝 Team | Members add/manage — naam, role, bio, links, contact |
| 🖼️ Media | Images / videos / audio — Firebase Storage upload + URL |
| 👤 About Muaaz | Personality, timeline, gallery, quotes, numbers |
| ⚙️ Admin Panel | Google Sign-In (owner-only: mezanora.market@gmail.com) |
| 💾 Backup | Full JSON export/import (Google Drive par rakhein) |
| 🗺️ Auto Sitemap | Admin se generate → sitemap.xml download/copy |
| 🔍 SEO | JSON-LD (Person/Organization/WebSite), OG tags, robots.txt, **llms.txt** (AI search) |
| 📦 PWA | manifest.json — phone par install ho sakti hai |

## 🚀 Deploy — GitHub Pages + Firebase Hosting

> Repo me dono targets tayyar hain: `.github/workflows/deploy-pages.yml` aur
> `.github/workflows/deploy-firebase.yml` + `firebase.json` / `.firebaserc`.
> Site: https://muaaz-iqbal.github.io/MIZANORAORG/ · Mirror: https://mizanoraorg.web.app

### Firebase Hosting (manual)

```bash
npm i -g firebase-tools
firebase login                     # mezanora.market@gmail.com
firebase use mizanoraorg
firebase deploy --only hosting
```

Auto-deploy ke liye repo secret `FIREBASE_SERVICE_ACCOUNT` (service account JSON) add karein.

### GitHub Pages (purana tareeqa)

1. Is folder ko repo me push karein:
   ```bash
   cd mizanora-platform
   git init && git add . && git commit -m "Mizanora Platform"
   git remote add origin https://github.com/Mizanoraorg/mizanora-platform.git
   git push -u origin main
   ```
2. GitHub repo → **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save
3. Site live: `https://muaaz-iqbal.github.io/MIZANORAORG/`
4. **IMPORTANT:** `assets/js/data.js` me `SITE_URL` ko apne asli Pages URL se badlein.

## 🔥 Firebase Setup (auth + firestore)  · storage NOT used

Config `assets/js/data.js` me already mojood hai (project: **mizanoraorg**). Baqi steps:

1. **Firebase Console** → https://console.firebase.google.com → project `mizanoraorg`
2. **Authentication → Sign-in method → Google** → Enable
3. **Authentication → Settings → Authorized domains** me add karein:
   - `muaaz-iqbal.github.io`
   - `localhost` (testing)
4. **Firestore Database** → Create (production mode) → phir `firestore.rules` deploy karein:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use mizanoraorg
   firebase deploy --only firestore:rules
   ```
   *(ya Rules tab me firestore.rules ka content paste kar dein)*
5. **Storage** — use nahi hoti. Media sirf links se (admin → Media URL).

> Bina Firebase ke bhi site chalti hai (seed data + localStorage mode) — lekin admin writes
> aur media upload ke liye Firebase zaroori hai.

## 🔍 Google Search me laane ke liye (Fast Indexing)

1. **Google Search Console** → https://search.google.com/search-console
   → Property add karein: `https://muaaz-iqbal.github.io/MIZANORAORG/`
2. **Sitemaps** → `sitemap.xml` submit
3. **URL Inspection** → home, projects, blog, about par **Request Indexing**
4. Naye blog har baar: Admin → Sitemap → Generate → Download → repo me commit → Search Console request
5. Social sharing (X, Facebook, WhatsApp groups) — backlinks se indexing fast hoti hai
6. AI search (ChatGPT, Perplexity, Gemini) ke liye `llms.txt` already included hai

## 💾 Backup Routine (bohot zaroori!)

November 2026 ka sabaq: **90 repos ek jhatke me 404**. Isliye:

- **Admin → Backup → Export JSON** → Google Drive (haftawar)
- Har Git repo ka mirror: `git clone --mirror` + `git push --mirror` → GitLab/Codeberg
- `git bundle create backup.bundle --all` → Drive/Dropbox

## 📁 Structure

```
mizanora-platform/
├── index.html          # Home — hero, stats, status, projects, blogs
├── projects.html       # All projects (filters + detail modal)
├── blog.html           # Blog list + ?slug= article view
├── team.html           # Team & members
├── about.html          # Muaaz Iqbal — profile, timeline, gallery
├── admin.html          # Admin panel (owner-only)
├── assets/
│   ├── css/style.css   # Emerald+gold aurora theme
│   └── js/
│       ├── data.js     # ⚙️ SITE_URL + Firebase config + seed content
│       ├── store.js    # Data layer: firebase → local → seed
│       ├── main.js     # Site rendering
│       └── admin.js    # Admin logic
├── sitemap.xml         # Auto-generated (admin se refresh)
├── robots.txt          # AI bots welcome, admin blocked
├── llms.txt            # AI-search record
├── manifest.json       # PWA
├── firestore.rules     # Owner-only writes
└── PROMPT.md           # 📜 Master mega-prompt (blueprint)
```

---
Built for **Muaaz Iqbal · Mizanora** · Kasur, Punjab, Pakistan 🇵🇰
