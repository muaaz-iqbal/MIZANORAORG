<div align="center">

<img src="assets/hero.svg" alt="Mizanora Platform — animated banner" width="100%" />

<img src="assets/roles.svg" alt="Muaaz Iqbal — rotating roles" width="100%" />

<br />

<a href="https://muaaz-iqbal.github.io/MIZANORAORG/"><img src="https://img.shields.io/badge/🌐_LIVE_SITE-Open-10b981?style=for-the-badge&labelColor=05100b" alt="Live site" /></a>
<a href="https://muaaz-iqbal.github.io/MIZANORAORG/projects.html"><img src="https://img.shields.io/badge/🚀_PROJECTS-18_builds-d4af37?style=for-the-badge&labelColor=05100b" alt="Projects" /></a>
<a href="https://muaaz-iqbal.github.io/MIZANORAORG/blog.html"><img src="https://img.shields.io/badge/✍️_BLOG-Stories_&_guides-34d399?style=for-the-badge&labelColor=05100b" alt="Blog" /></a>
<a href="https://github.com/muaaz-iqbal"><img src="https://img.shields.io/badge/GitHub-muaaz--iqbal-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=05100b" alt="GitHub" /></a>

<img src="https://img.shields.io/badge/Status-Active_✅-10b981?style=flat-square&labelColor=05100b" alt="status" />
<img src="https://img.shields.io/badge/Stack-Zero_Build_Static-d4af37?style=flat-square&labelColor=05100b" alt="stack" />
<img src="https://img.shields.io/badge/Firebase-Optional_🔥-fbbf24?style=flat-square&labelColor=05100b" alt="firebase" />
<img src="https://img.shields.io/badge/PWA-Installable-34d399?style=flat-square&labelColor=05100b" alt="pwa" />
<img src="https://img.shields.io/github/license/muaaz-iqbal/MIZANORAORG?style=flat-square&color=d4af37&labelColor=05100b" alt="license" />
<img src="https://komarev.com/ghpvc/?username=muaaz-iqbal&style=flat-square&color=10b981&label=VISITS" alt="visits" />

</div>

---

## ⚖️ Mizanora Platform kya hai?

**Mizanora** (*Mizan* = balance, *Noor* = illumination) — **Muaaz Iqbal** ka pura digital record, ek hi website par.
Yeh koi demo nahi hai: taqreeban **2–3 saal ka kaam**, **18 projects**, aur unke saath juda har waqia — kya bana,
kis date push hua, kya stack laga, aur kya hadsa pesh aaya.

> **"Unchi soch. Chhote qadam."** — Muaaz Iqbal · Kasur, Punjab, Pakistan 🇵🇰

| | |
|---|---|
| **Kya hai** | Ek self-hosted, **zero-build** static platform — status feed, projects, blogs, team, media, timeline |
| **Kisne banaya** | Muaaz Iqbal — Founder & Lead Developer, Mizanora · born 27 Nov 2009, Kasur |
| **Kaise chalta hai** | Plain HTML + CSS + ES-modules JavaScript · Firebase (optional) · GitHub Pages hosting |
| **Kyun bana** | Nov 2026 me personal GitHub account suspend hua — **90 repos 404**. Sabaq: record apni website par hona chahiye, kisi third-party account par nahi |
| **Ab kya** | Live record + recovery drive jaari · har hafte naye status updates |

---

## 🚨 Yeh platform kyun bana — November 2026 incident

<details open>
<summary><b>Poori kahani (click)</b></summary>

<br />

**November 2026** me Muaaz Iqbal ka personal GitHub account **[@muaaziqbalvip](https://github.com/muaaziqbalvip)** suspend kar diya gaya.

- **90 public repositories** — ~2–3 saal ka kaam, **13.7 MB code** — ek hi jhatke me **404**
- Profile README **30 October 2026** tak normal tha (last refresh) — incident uske baad hua
- Live deployments jinka CI/CD GitHub Actions se guzarta tha: affected
- Google search results ab "ghost links" hain

**Kya bacha?** **Mizanoraorg** organization ke 4 repos —
`MIZANORA` (16 Nov 2026) · `MIZANORAAI` (13 Nov 2026) · `miznaoraiptv` (3 Nov 2026) · `Mizanora-org` (30 Oct 2026).

**Wajah kya lagti hai?** 24/7 GitHub Actions workloads (live TV playout, WhatsApp bot re-dispatch, cloud Android emulator) —
GitHub ki abuse policy *"Actions for general computing purposes"* ke khilaaf. 2026 me aise cases aam hue.

**Nateeja — teen sabaq:**
1. 🔁 Har project ka **mirror** (GitLab / Codeberg / `git bundle`)
2. 🏠 **Record apni website par** — ye platform
3. 🧾 Har project ka **date-wise history** — kya bana, kab gira, kaise utha

> Poori detail blog me: [`blog.html?slug=github-suspension-incident-2026`](https://muaaz-iqbal.github.io/MIZANORAORG/blog.html?slug=github-suspension-incident-2026)

</details>

---

## ✨ Features — andar kya kya hai

| Feature | Detail |
| --- | --- |
| 📌 **Status Feed** | "Mizanora abhi kya kar raha hai" — home page ticker + dated feed, tags: `build` · `release` · `incident` · `note` |
| 🚀 **Projects (18)** | Active / Past / Suspension-affected — har project ki **story, stack, dates, metrics aur incident detail** + filter + detail modal |
| ✍️ **Blog engine** | 4 templates — `update` · `tutorial` · `story` · `news` · markdown-lite rendering (`##`, `**bold**`, `` `code` ``, lists, tables) + `?slug=` deep links |
| 🤝 **Team / Members** | Add & manage members — naam, role, bio, links (GitHub/YouTube/X/IG), email, WhatsApp |
| 🖼️ **Media Gallery** | Images / video / audio — URL se ya Firebase Storage upload, captions ke saath |
| 👤 **About + Timeline** | Personality, 9-event timeline, gallery, quotes, numbers — SEO-ready Person JSON-LD |
| ⚙️ **Admin Panel** | Google Sign-In, **owner-only** (`muaaziqbal.vip@gmail.com`) — 8 tabs: Dashboard, Status, Blogs, Projects, Team, Media, Backup, Sitemap |
| 💾 **Backup / Restore** | Full **JSON export + import** — ek click me saara content, Google Drive par rakhne ke liye |
| 🗺️ **Auto Sitemap** | Admin se generate → `sitemap.xml` download / copy / commit |
| 🔍 **SEO pack** | JSON-LD (`Person` · `Organization` · `WebSite`), OG + Twitter cards, canonical URLs, `robots.txt`, **`llms.txt`** (AI search) |
| 📦 **PWA** | `manifest.json` — phone par install ho jati hai, offline-capable shell |
| 🎨 **Design system** | Emerald + gold aurora theme, glassmorphism cards, animated ticker, responsive (mobile-first), `prefers-reduced-motion` respected |
| 🛡️ **Graceful degradation** | Firebase na ho to bhi chalti hai — `firebase → localStorage → seed` fallback chain |

---

## 🗺️ Live pages

| Page | URL | Kya milega |
| --- | --- | --- |
| 🏠 Home | [`/`](https://muaaz-iqbal.github.io/MIZANORAORG/) | Hero, stats, status ticker, featured projects, latest blogs |
| 🚀 Projects | [`/projects.html`](https://muaaz-iqbal.github.io/MIZANORAORG/projects.html) | Saare 18 projects — filters (Active / Past / Affected) + modal detail |
| ✍️ Blog | [`/blog.html`](https://muaaz-iqbal.github.io/MIZANORAORG/blog.html) | 5 seed articles — incident, Asaan Lang, founder story, backup guide, ecosystem map |
| 🤝 Team | [`/team.html`](https://muaaz-iqbal.github.io/MIZANORAORG/team.html) | Members + contact links |
| 👤 About | [`/about.html`](https://muaaz-iqbal.github.io/MIZANORAORG/about.html) | Muaaz Iqbal — profile, timeline, gallery, numbers |
| ⚙️ Admin | [`/admin.html`](https://muaaz-iqbal.github.io/MIZANORAORG/admin.html) | Owner-only panel (Google Sign-In) · `robots.txt` me blocked |

---

## 🏗️ Architecture

Yeh **zero-build** hai — koi bundler, koi `npm install`, koi framework nahi. Sirf 4 JavaScript modules:

```text
┌──────────────────────────────────────────────────────────────┐
│  HTML pages: index · projects · blog · team · about · admin   │
└───────────────┬──────────────────────────────────────────────┘
                │  window.MZ (config + seed)
                ▼
        ┌───────────────┐        ┌──────────────────────────┐
        │   main.js     │  uses  │        store.js          │
        │  rendering    │───────▶│  data layer (3 tiers)    │
        │  + router     │        └───────┬──────────────────┘
        └───────────────┘                │
                                         ▼
              ┌──────────────┬──────────────┬──────────────┐
              │  1. FIREBASE │ 2. LOCAL     │  3. SEED     │
              │  Firestore   │ localStorage │  data.js     │
              │  (owner writes, admin only)  │  read-only   │
              └──────────────┴──────────────┴──────────────┘
                       ▲
                       │ Google Sign-In (owner email only)
                 ┌─────┴──────┐
                 │  admin.js  │  CRUD + upload + backup + sitemap
                 └────────────┘
```

**Fallback chain:** Firebase reachable → `mode = firebase` · Firebase off → `mode = local` (browser writes) · both empty → `mode = seed` (read-only, site still renders).

| Module | Lines | Zimmedari |
| --- | ---: | --- |
| `assets/js/data.js` | ~380 | `SITE_URL`, Firebase config, **seed content** (status, 18 projects, 5 blogs, team, timeline, gallery) |
| `assets/js/store.js` | ~165 | Data layer — `init · list · save · remove · signInGoogle · signOut · uploadFile · exportAll · importAll` |
| `assets/js/main.js` | ~397 | Page rendering, nav, ticker, filters, modals, markdown-lite |
| `assets/js/admin.js` | ~392 | Admin dashboard, forms, CRUD, upload, JSON backup, sitemap generator |
| `assets/css/style.css` | ~407 | Emerald + gold design system, animations, responsive layout |

> **Note:** Firebase client config public hona normal hai (web apps me design hi aisa hai) —
> asli security **`firestore.rules` + `storage.rules`** se aati hai, jahan writes sirf owner email par allowed hain.

---

## 📁 Repository structure

```text
MIZANORAORG/
├── index.html              # 🏠 Home — hero, stats, status feed, featured
├── projects.html           # 🚀 18 projects + filters + detail modal
├── blog.html               # ✍️ Blog list + ?slug= article view
├── team.html               # 🤝 Members & contacts
├── about.html              # 👤 Muaaz Iqbal — profile, timeline, gallery
├── admin.html              # ⚙️ Owner panel (noindex)
├── assets/
│   ├── css/style.css       # 🎨 Emerald + gold aurora theme
│   ├── js/
│   │   ├── data.js         # ⚙️ config + seed content
│   │   ├── store.js        # 💾 firebase → local → seed data layer
│   │   ├── main.js         # 🖼️ site rendering
│   │   └── admin.js        # 🛠️ admin CRUD, backup, sitemap
│   ├── hero.svg            # ✨ animated README banner (SMIL)
│   └── roles.svg           # ✨ animated roles card (SMIL)
├── manifest.json           # 📦 PWA manifest
├── sitemap.xml             # 🗺️ SEO sitemap
├── robots.txt              # 🤖 crawlers (AI bots welcome, admin blocked)
├── llms.txt                # 🧠 AI-search fact sheet
├── firestore.rules         # 🔐 owner-only writes
├── storage.rules           # 🔐 media upload rules
├── .nojekyll               # Pages: skip Jekyll
├── docs/
│   ├── BUILD-PROMPT.md     # 📜 master blueprint prompt (v1.0)
│   └── SITE-README.md      # 📘 original project notes (Roman-Urdu)
├── backup/
│   └── mizanora-platform-backup.zip  # 💾 source snapshot
├── LICENSE                 # MIT
└── .github/workflows/deploy-pages.yml  # 🚀 auto-deploy on push to main
```

---

## 🚀 Quick start (local)

```bash
git clone https://github.com/muaaz-iqbal/MIZANORAORG.git
cd MIZANORAORG

# koi build step nahi — bas serve karo
python3 -m http.server 8080
# ya:  npx serve .
```

Phir kholo 👉 **http://localhost:8080** — bina Firebase ke bhi poori site chalti hai (seed data mode).

---

## 🔥 Firebase setup (optional, admin ke liye)

<details>
<summary><b>5 steps — Google Sign-In + Firestore + Storage</b></summary>

<br />

Config `assets/js/data.js` me already hai (project: **`mizanoraorg`**).

1. **Firebase Console** → [console.firebase.google.com](https://console.firebase.google.com) → project `mizanoraorg`
2. **Authentication → Sign-in method → Google** → Enable
3. **Authentication → Settings → Authorized domains** me add karo:
   - `muaaz-iqbal.github.io`
   - `localhost`
4. **Firestore** → Create database (production mode) → `firestore.rules` deploy karo:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use mizanoraorg
   firebase deploy --only firestore:rules,storage
   ```
   *(ya Console ke Rules tab me file ka content paste kar do)*
5. **Storage** → Get started → `storage.rules` paste / deploy

✅ Uske baad `admin.html` par Google Sign-In karo — sirf **owner email** ko write access milega.

</details>

---

## ⚙️ Admin panel — kya kya kar sakte ho

Owner-only (`muaaziqbal.vip@gmail.com`), 8 tabs:

| Tab | Kaam |
| --- | --- |
| 📊 **Dashboard** | Counts — status, projects, blogs, team, media + mode (firebase / local / seed) |
| 📌 **Status Feed** | Nayi update add/edit/delete — tag + date |
| ✍️ **Blogs** | Article likho (markdown-lite), template chuno, cover URL, publish |
| 🚀 **Projects** | Add/edit — status (active/past/affected), stack tags, story, incident detail, links JSON |
| 🤝 **Team** | Member add — role, bio, links JSON, email, phone |
| 🖼️ **Media** | Upload to Firebase Storage **ya** direct URL paste — caption ke saath |
| 💾 **Backup** | **Export JSON** (poora content) · **Import JSON** (restore) — Drive par rakho |
| 🗺️ **Sitemap** | `sitemap.xml` regenerate → download / copy → repo me commit |

---

## 🌐 Deploy — GitHub Pages

Push to `main` → workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) khud deploy karta hai:

```text
push → assemble _site/ (rsync, .git/docs/backup excluded) → upload-pages-artifact → deploy-pages
```

**One-time setting (agar site 404 de):**
`Settings → Pages → Build and deployment → Source: **GitHub Actions** → Save`

Local test:

```bash
python3 -m http.server 8080   # same files jo Pages par jaate hain
```

---

## 🧩 Mizanora ecosystem — 18 projects

**Status legend:** 🟢 `active` · 🟡 `affected` (suspension ke baad recovery) · ⚪ `past`

| # | Project | Category | Status | Stack | Ek line me |
| --: | --- | --- | :--: | --- | --- |
| 1 | 🛍️ **Mizanora** | Commerce | 🟢 | Next.js 15 · React · Tailwind · Firebase · Groq | Halal market — 11,000+ products, flat delivery, COD, Urdu AI **Noor** |
| 2 | 🧠 **Asaan Lang** | Language | 🟢 | Python 3.8+ · TypeScript · MIT | Pakistan ki apni language — `likho`, `agar/warna`, `har`, `kaam` … web compiler bhi |
| 3 | 🌊 **BarakatWave TV** | Streaming | 🟢 | hls.js · FFmpeg · IMDb API · Vercel | 800 channels, IMDb cinema, free Xtream server (Televizo-proof) |
| 4 | 💬 **Mizanora WhatsApp AI** | AI | 🟡 | Python · Groq · Gemini · edge-tts · Actions | Multi-provider agent — memory, Urdu voice notes, web search, code exec |
| 5 | 📡 **StreamForge 24/7** | Streaming | 🟡 | FFmpeg · Actions · Node.js | Self-healing broadcast — 5-min overlap handoff, stream kabhi nahi girta |
| 6 | 📺 **MIZANORA TV LIVE** | Streaming | 🟡 | Actions · Pages · FFmpeg | 4 channels, 4 workflows, 1 control room — full serverless playout |
| 7 | 🤖 **Mizanora Android** | Android | 🟡 | Actions · ws-scrcpy · cloudflared | Cloud Android phone — 5h30m re-dispatch cycle |
| 8 | 🎬 **SIRAVEX** | Streaming | 🟡 | TS · React · PWA · hls.js · Shaka · mpegts | Premium web IPTV — failover ladder, EPG, Ads API (real features only) |
| 9 | 📈 **MI Trade Master** | Trading | 🟡 | Kotlin · Compose · Firebase · Groq | Trading **seekho** — AI chart reading + paper trading, koi real paisa nahi |
| 10 | 🤖 **MI Trade Master Bot** | Trading | 🟡 | Python · Telegram · Vision AI | Bina server 24/7 signals — SMC + RSI/EMA/MACD/BB/Stoch fused score |
| 11 | 🛰️ **Mizanora IPTV Suite** | Streaming | 🟢 | Node.js · Firebase · Xtream · MAG | Reseller economy v6.1.2 — 183+ integration tests pass |
| 12 | 🕌 **Muslim Islam Org** | Community | 🟢 | React · Firebase | Asli organisation ka portal — directory, project hub, chat relay, tools |
| 13 | 🌙 **HijriAnchor** | Islamic | 🟢 | Web · Firebase | Islamic calendar app — Quran/Hadith reader, reminders, Zakat |
| 14 | ✨ **Noor AI** | AI | 🟢 | Groq · Gemini · Next.js | Urdu-first assistant — "sasta laal joota under 2k" samajh jata hai |
| 15 | 📦 **Order Tracking** | Commerce | 🟢 | Serverless · PWA · SEO | Animated parcel journey — estimated vs real data, imaandari se label |
| 16 | 🎞️ **Minexus TV** | Streaming | ⚪ | JS · TMDB · Vercel | Streaming front end — releases, calendar, guest mode (no login) |
| 17 | 📱 **MiTV Player** | Android | ⚪ | Kotlin · Compose · Media3 | IPTV player — 4 themes, gesture controls, auto-retry |
| 18 | 🏢 **Mizanora Org** | Platform | 🟢 | GitHub org | Bachi hui repos ka ghar — `MIZANORA`, `MIZANORAAI`, `miznaoraiptv` |

> Har project ka full story + incident detail: **[projects.html](https://muaaz-iqbal.github.io/MIZANORAORG/projects.html)**
> · AI/LLM ke liye summary: **[`llms.txt`](llms.txt)**

---

## 🧰 Tech stack

<div align="center">

**Frontend**

<img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,tailwind&theme=dark" alt="frontend" />

**Mobile & AI**

<img src="https://skillicons.dev/icons?i=kotlin,java,androidstudio,py,firebase&theme=dark" alt="mobile" />

**Ops & Tools**

<img src="https://skillicons.dev/icons?i=git,github,githubactions,linux,docker,vercel,ffmpeg&theme=dark" alt="ops" />

</div>

`HTML` · `CSS` · `JavaScript (ESM)` · `TypeScript` · `React` · `Next.js 15` · `Tailwind` · `Kotlin` · `Jetpack Compose` · `Python` · `Firebase` (Auth · Firestore · Storage · RTDB) · `hls.js` · `Shaka Player` · `FFmpeg` · `Groq` · `Gemini` · `GitHub Actions` · `GitHub Pages` · `Vercel`

---

## 🔍 SEO + AI search

- **`sitemap.xml`** — saare pages, admin se auto-regenerate
- **`robots.txt`** — crawlers allow, `admin.html` disallow, AI bots (GPTBot · ClaudeBot · PerplexityBot · Google-Extended) welcome
- **`llms.txt`** — AI search (ChatGPT, Gemini, Perplexity, Claude) ke liye structured fact sheet
- **JSON-LD** — `Person` · `Organization` · `WebSite` + `BreadcrumbList`
- **OG + Twitter cards** — har page par share-ready preview
- **Canonical URLs** — duplicate content se bachne ke liye

**Google me laane ke liye:** Search Console → property `https://muaaz-iqbal.github.io/MIZANORAORG/` → Sitemaps me `sitemap.xml` submit → URL Inspection se home, projects, blog, about par **Request Indexing**.

---

## 💾 Backup & recovery (3-2-1)

1. **3 copies** — asli + 2 backups
2. **2 media** — cloud + local drive
3. **1 off-site** — dusra provider (GitLab / Codeberg)

```bash
# mirror to a second host
git clone --mirror https://github.com/muaaz-iqbal/MIZANORAORG.git
cd MIZANORAORG.git
git push --mirror https://gitlab.com/<you>/MIZANORAORG.git

# single-file full backup
git bundle create mizanora-$(date +%F).bundle --all
```

**Content backup:** Admin → **💾 Backup** → *Export JSON* → Google Drive (haftawar).
Source snapshot repo me bhi hai: [`backup/mizanora-platform-backup.zip`](backup/mizanora-platform-backup.zip).

---

## 🧭 Roadmap

- [x] Status feed · Projects · Blogs · Team · Media · Timeline
- [x] Admin panel (owner-only) + JSON backup/restore
- [x] SEO pack — JSON-LD, sitemap, `llms.txt`, OG cards
- [x] PWA + GitHub Pages auto-deploy
- [ ] Service worker (offline-first caching)
- [ ] Project-wise detail pages (`/projects/<slug>`) for stronger SEO
- [ ] Urdu (`ur`) locale toggle
- [ ] GitLab/Codeberg mirror automation
- [ ] Recovery drive: suspended repos ka public archive

---

## 🤝 Team

| Naam | Role | Kaam |
| --- | --- | --- |
| **Muaaz Iqbal** | Founder & Lead Developer | Full-stack + Android, AI orchestration, Mizanora founder |
| **Arena AI Agent** | Development Partner | Code, audits, PRs (v39–v55, v47 billing, IPTV suites) |
| **Muslim Islam Org Team** | Community | Directory, project hub, chat relay, tools |
| **Mizanora Resellers Network** | Partners | Worker/reseller programme, personal links, wallets, IPTV resellers |

---

## 📬 Contact

<div align="center">

<a href="mailto:muaaziqbal.vip@gmail.com"><img src="https://img.shields.io/badge/Gmail-muaaziqbal.vip-d14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=05100b" alt="email" /></a>
<a href="https://wa.me/923062015326"><img src="https://img.shields.io/badge/WhatsApp-%2B92_306_2015326-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=05100b" alt="whatsapp" /></a>
<a href="https://github.com/muaaz-iqbal"><img src="https://img.shields.io/badge/GitHub-muaaz--iqbal-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=05100b" alt="github" /></a>
<a href="https://youtube.com/@MuaazIqbalofficial"><img src="https://img.shields.io/badge/YouTube-@MuaazIqbalofficial-FF0000?style=for-the-badge&logo=youtube&logoColor=white&labelColor=05100b" alt="youtube" /></a>
<a href="https://x.com/MizanoraApps"><img src="https://img.shields.io/badge/X-@MizanoraApps-000000?style=for-the-badge&logo=x&logoColor=white&labelColor=05100b" alt="x" /></a>

<br /><br />

**Koi project restore karna hai, koi bug hai, ya saath mil kar kuch banana hai? Issue kholo — baat karte hain.**

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:05100b,50:0f3d2e,100:d4af37&height=120&section=footer&fontSize=0" alt="footer wave" width="100%" />

**⚖️ MIZANORA** · *Mizan = balance · Noor = illumination*

<sub>© 2026 Mizanora · Built by hand by <b>Muaaz Iqbal</b> · Kasur, Punjab, Pakistan 🇵🇰 · MIT License</sub>

<sub><i>"Unchi soch. Chhote qadam."</i></sub>

</div>
