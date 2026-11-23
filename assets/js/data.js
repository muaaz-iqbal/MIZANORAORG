/* ============================================================
   MIZANORA PLATFORM — config + seed data
   Owner: Muaaz Iqbal (Mizanora) · Kasur, Punjab, Pakistan
   NOTE: Firebase client config PUBLIC hota hai (design hi aisa hai).
   Security Firestore RULES se aati hai — firestore.rules deploy karein.
   ============================================================ */
window.MZ = {
  OWNER_EMAIL: "mezanora.market@gmail.com",
  OWNER_NAME: "Muaaz Iqbal",
  // ⬇️ GitHub Pages par deploy ke baad ye URL badlein (repo ka real URL)
  SITE_URL: "https://muaaz-iqbal.github.io/MIZANORAORG",
  SITE_NAME: "Mizanora Platform",
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyB81CTz3uDtKCyQJMpNr0uUHseKCkq93k4",
    authDomain: "mizanoraorg.firebaseapp.com",
    projectId: "mizanoraorg",
    storageBucket: "mizanoraorg.firebasestorage.app",
    messagingSenderId: "510506028105",
    appId: "1:510506028105:web:5355ebebeeabcf30f58398",
    measurementId: "G-DNP1S69PP0"
  },

  SEED: {
    /* ---------- STATUS FEED (Mizanora kya kar raha hai) ---------- */
    status: [
      { id: "s0", date: "2026-11-23", tag: "release", text: "Platform v2 live — official gold mark, 10 blogs with generated covers, auto-sitemap, media as links, aur dual hosting (GitHub Pages + Firebase Hosting)." },
      { id: "s1", date: "2026-11-23", tag: "incident", text: "GitHub account @muaaziqbalvip suspend — 90 repos (2–3 saal ki mehnat) 404. Recovery + backup drive jaari. Kuch kaam Mizanoraorg org me mehfooz hai." },
      { id: "s2", date: "2026-11-16", tag: "build", text: "MIZANORA main project par naya push (v59.2 restore ke baad stabilization). Mizanoraorg org me active development jaari." },
      { id: "s3", date: "2026-11-13", tag: "build", text: "MIZANORAAI update — AI features ka agla iteration." },
      { id: "s4", date: "2026-11-08", tag: "release", text: "MIZANORA v60 speed release rollback — shop wapas stable v59.2 par. Stability pehle, speed baad me." },
      { id: "s5", date: "2026-11-06", tag: "release", text: "v55: offline IMDb snapshot, universal search, singer pages, calendar, theater-grade player." },
      { id: "s6", date: "2026-11-02", tag: "release", text: "v47: billing + cron auto-suspend, blacklist/whitelist, lockout, audit log, bulk lines. IPTV reseller suite v6.1.2." },
      { id: "s7", date: "2026-10-30", tag: "note", text: "GitHub profile README last refresh — 90 public repos, 13.7 MB code, 800 live channels, 11,000+ products, 38 free tools." }
    ],

    /* ---------- PROJECTS (active + past + incident detail) ---------- */
    projects: [
      {
        slug: "mizanora-store", name: "Mizanora", icon: "🛍️", category: "Commerce", status: "active",
        tagline: "Halal online market for Pakistan — 11,000+ products, Noor AI assistant",
        stack: ["Next.js 15", "React", "Tailwind", "Firebase", "PWA", "Groq"],
        started: "2025", updated: "2026-11",
        story: "Mizanora ecosystem ka dil. Ek halal online market jisme 11,000+ products hain, flat delivery, cash on delivery, aur Urdu-speaking AI assistant **Noor** jo aisi sentence samajhta hai jaise 'sasta laal joota under 2k'. Worker/reseller programme, promo-code engine, order tracking, Quran + Hadith reader, live TV aur 38 free tools isi platform par hain.",
        how: "Next.js 15 frontend + Firebase auth/Firestore + Groq-powered Noor assistant. Bilingual Urdu + English, Material 3 design. Worker programme personal links aur wallets deta hai.",
        incident: "Vercel deployment 23 Nov 2026 ko 402 (payment required) state me mila — hosting bill/plans check karna zaroori hai. Code Mizanoraorg/MIZANORA me mehfooz.",
        links: [{ label: "Store", url: "https://mizanora.vercel.app" }, { label: "Repo (org)", url: "https://github.com/Mizanoraorg/MIZANORA" }],
        metrics: "11,000+ products · 38 free tools · Noor AI"
      },
      {
        slug: "asaan-lang", name: "Asaan Lang", icon: "🧠", category: "Language", status: "active",
        tagline: "Pakistan ki apni programming language — soch Urdu mein, code Roman-Urdu mein",
        stack: ["Python 3.8+", "TypeScript", "MIT License"],
        started: "2026", updated: "2026",
        story: "Python seekhne se pehle aksar English seekhni padti hai. Asaan Lang pehle **soch** seekhati hai — variables, loops, decisions — apni zubaan mein. Beginners `likho`, `agar/warna`, `har`, `dohrao`, `jabtak`, `kaam...wapis...bas` likhte hain. Errors bhi Roman-Urdu mein line number ke saath aate hain. Bonus: isi language se HTML website compile ho sakti hai (`asaan --web site.asaan -o site.html`).",
        how: "Python interpreter/compiler (asaan.py) + studio playground (localhost:8080). Sirf standard library — koi pip package zaroori nahi. Version 1.1.",
        incident: "Repo @muaaziqbalvip/asaan-lang account suspension ke saath 404 ho gayi (Nov 2026). Site asaan-lang.vercel.app abhi bhi live thi search index me. Recovery/rewrite planned.",
        links: [{ label: "Site", url: "https://asaan-lang.vercel.app" }],
        metrics: "v1.1 · MIT · REPL + web compiler + studio"
      },
      {
        slug: "barakatwave-tv", name: "BarakatWave TV", icon: "🌊", category: "Streaming", status: "active",
        tagline: "800 channels live TV + IMDb cinema + free Xtream server — Televizo-proof",
        stack: ["hls.js", "FFmpeg", "IMDb API", "Vercel", "Firebase RTDB"],
        started: "2025", updated: "2026-10",
        story: "Pakistan aur India ke liye live TV aur cinema platform: 800 channels, multi-server relay failover, quality/audio-track switching, PiP, IMDb-powered movies/series engine (tt… IDs se posters, cast, episodes) aur Xtream Codes output jo Televizo, TiviMate, XCIPTV aur VLC me waqai chalta hai. Playlists, favourites aur progress browser me rehte hain — privacy by default.",
        how: "Browser me hls.js + automatic multi-server relay failover. 4-video broadcast suite (welcome intro → #EXT-X-DISCONTINUITY → live handoff, standby, PRO VIP unlock, coming-soon). Dual Firebase auth + har user ko 1 permanent free Xtream server. Dynamic /sitemap.xml, /rss.xml, /llms.txt, IndexNow auto-ping, 16 SSR SEO blogs.",
        incident: "Account suspension ke baad BarakatWave-TV repo 404. Kuch backups Vercel deployment par zinda. PRO VIP support WhatsApp: 0306-2015326.",
        links: [{ label: "Live", url: "https://barakatwave.vercel.app" }],
        metrics: "800 channels · 6 themes · IMDb 2000–2026"
      },
      {
        slug: "mizanora-whatsapp-ai", name: "Mizanora WhatsApp AI", icon: "💬", category: "AI", status: "affected",
        tagline: "Multi-provider WhatsApp agent — memory, Urdu voice, search, images, code exec",
        stack: ["Python", "Groq", "Gemini", "edge-tts", "GitHub Actions"],
        started: "2026", updated: "2026",
        story: "WhatsApp Agent Platform API par bana multi-API AI agent: persistent memory, voice notes (Urdu/Hindi/English) with emotion, live web search with citations, image generation, PDF reading, aur owner-only code execution. GitHub Actions ke 6-ghante ke limit ko state encrypt karke re-dispatch se overcome kiya — 24/7 chalta hai.",
        how: "Groq, Gemini, OpenRouter, Cerebras, Mistral, DeepSeek, Together, OpenAI, Ollama — key rotation + provider failover. Memory JSON store with autosave. Voice: Groq Whisper → edge-tts (ur-PK-UzmaNeural) → native WhatsApp voice note. 32-check offline self-test suite.",
        incident: "Actions-heavy 24/7 workload — GitHub suspension ka sabse bara shikar yehi pattern tha. Session/state encryption design backup ke liye madadgar.",
        links: [],
        metrics: "Multi-API · 24/7 on Actions · Urdu voice notes"
      },
      {
        slug: "streamforge", name: "StreamForge 24/7", icon: "📡", category: "Streaming", status: "affected",
        tagline: "Self-healing broadcast system — stream kabhi nahi girta",
        stack: ["FFmpeg", "GitHub Actions", "Node.js"],
        started: "2026", updated: "2026",
        story: "Web dashboard me channel add karo aur StreamForge khud apna GitHub Actions workflow generate karta hai, FFmpeg slots 5-minute overlap ke saath chalata hai, aur runners ke beech handoff karta hai taake stream kabhi drop na ho.",
        how: "Auto-generated workflows + FFmpeg playout + overlap handoff strategy. Serverless broadcast — koi VPS nahi.",
        incident: "Repo suspension ke saath gayab — design dobara implement hoga.",
        links: [], metrics: "Zero-drop handoff · self-healing"
      },
      {
        slug: "mizanora-tv-live", name: "MIZANORA TV LIVE", icon: "📺", category: "Streaming", status: "affected",
        tagline: "24/7 live TV on GitHub Actions + Pages — 4 channels, 1 control room",
        stack: ["GitHub Actions", "GitHub Pages", "FFmpeg"],
        started: "2026", updated: "2026-11",
        story: "Serverless virtual transmission: 4 channels, 4 workflows, 1 control room, 24/7 auto playout — sab kuch GitHub Actions + Pages par. 'Shop Smart. Shop Halal.' Mizanora Broadcast Network. Troubleshooting docs Roman-Urdu me likhe gaye (runner queue, Pages build cancel, workflow permissions).",
        incident: "Free tier par 20 concurrent jobs cap + runner queue issues document kiye. Account suspension ke baad workflows band.",
        links: [], metrics: "4 channels · full serverless playout"
      },
      {
        slug: "mizanora-android", name: "Mizanora Android", icon: "🤖", category: "Android", status: "affected",
        tagline: "Always-on Android emulator on GitHub Actions — cloud phone",
        stack: ["Shell", "GitHub Actions", "ws-scrcpy", "cloudflared", "Vercel"],
        started: "2026", updated: "2026",
        story: "GitHub Actions par hamesha-chalu Android emulator: emulator + ws-scrcpy + cloudflared, har 5h30m par re-dispatch, Vercel panel aur APK se control. Matlab — free cloud Android phone.",
        incident: "Actions automation abuse-detection ka prime target. Suspension ke baad band.",
        links: [], metrics: "Cloud Android · 5h30 re-dispatch cycle"
      },
      {
        slug: "siravex", name: "SIRAVEX", icon: "🎬", category: "Streaming", status: "affected",
        tagline: "Premium web IPTV & universal media player — real features only",
        stack: ["TypeScript", "React", "PWA", "hls.js", "Shaka Player", "mpegts.js"],
        started: "2026", updated: "2026",
        story: "Live TV, movies, series, EPG guide, Xtream Codes, koi bhi stream play karo. v3.1 'Studio' me failover ladder (source 2/3 dikhata hai jab tak stream na mil jaye), pro track capture, built-in guides. v3.4 'Mizanora' me Mizanora Ads API integration (embed.js slots, pre-roll with frequency cap, 5s skip). Rule: real features only, nothing faked, user privacy never traded.",
        incident: "Repo suspension ke saath gayab. Vercel deployments backups hain.",
        links: [], metrics: "Failover ladder · Ads API client · PWA"
      },
      {
        slug: "mi-trade-master", name: "MI Trade Master", icon: "📈", category: "Trading", status: "affected",
        tagline: "Trading seekho — AI chart reading + paper trading, koi real paisa nahi",
        stack: ["Kotlin", "Jetpack Compose", "Firebase", "Groq"],
        started: "2026", updated: "2026",
        story: "Android platform jo trading sikhata hai: AI se charts padho aur paper trading par practice karo — koi real money nahi, aur koi cheez jo market ko shortcut dikhaye. Beginners ko 'guaranteed profit' course walon se bachata hai — bilingual Urdu + English, chart reader Groq-powered.",
        incident: "Personal repo suspension ke saath gayab.",
        links: [], metrics: "Paper trading · AI chart reader"
      },
      {
        slug: "mi-trade-master-bot", name: "MI Trade Master Bot", icon: "🤖", category: "Trading", status: "affected",
        tagline: "24/7 free signal bot — bina kisi server ke",
        stack: ["Python", "Telegram API", "GitHub Actions", "Vision AI"],
        started: "2026", updated: "2026",
        story: "Jo signal bot free chalta hai 24/7, bilkul bina server: Smart Money Concepts structure (BOS / HH-HL / LH-LL) ko RSI, EMA stack, MACD, Bollinger aur Stochastic se fuse karke ek confidence score banta hai. Kisi bhi platform se screenshot bhejo — wo image par analysis mark kar deta hai. Multi-key provider rotation, /logs diagnostics, per-user preferences.",
        incident: "GitHub Actions par 24/7 — suspension pattern ka hissa.",
        links: [], metrics: "SMC + 5 indicators · vision analysis"
      },
      {
        slug: "mizanora-iptv", name: "Mizanora IPTV Suite", icon: "🛰️", category: "Streaming", status: "active",
        tagline: "Reseller Suite v6.1.2 — owner control → reseller → client",
        stack: ["Node.js", "Firebase", "Vercel", "Xtream Codes", "MAG/Stalker"],
        started: "2026", updated: "2026-11",
        story: "Live TV, animated welcome intro, M3U imports, XMLTV guides, Xtream Codes, MAG/Stalker, owner admin, reseller workspace aur website integrations. v5 se v6.1.2 tak: reseller panel (registration, credits, clients, renew/suspend/delete, pricing, payment ledger, key rotation). 183+ integration tests pass.",
        how: "Owner control → reseller workspace → client service architecture. Real HTTP test suites (imports, EPG, Xtream, signed playback, MAG). Admin-only private panel: Google owner lock (mezanora.market@gmail.com), emerald+gold glass theme.",
        incident: "Mizanoraorg/miznaoraiptv repo me mehfooz (3 Nov 2026 tak push).",
        links: [{ label: "Repo (org)", url: "https://github.com/Mizanoraorg/miznaoraiptv" }],
        metrics: "v6.1.2 · 183+ tests · reseller economy"
      },
      {
        slug: "muslim-islam-org", name: "Muslim Islam Org", icon: "🕌", category: "Community", status: "active",
        tagline: "Community portal — team directory, project hub, chat relay, tools",
        stack: ["React", "Firebase"],
        started: "2025", updated: "2026",
        story: "Ek asli organisation ke liye banaya gaya community portal — demo nahi: team directory, project hub, chat relay, device aur network tools. Mizanora ka community wing.",
        incident: "—",
        links: [], metrics: "Real organisation portal"
      },
      {
        slug: "hijrianchor", name: "HijriAnchor", icon: "🌙", category: "Islamic", status: "active",
        tagline: "Islamic calendar app — Mizanora family",
        stack: ["Web", "Firebase"],
        started: "2026", updated: "2026",
        story: "Islamic calendar app — Mizanora ke Islamic tools family ka hissa (Quran + Hadith reader, Islamic reminders, Zakat calculator ke saath).",
        incident: "—",
        links: [], metrics: "Hijri calendar tools"
      },
      {
        slug: "noor-ai", name: "Noor AI", icon: "✨", category: "AI", status: "active",
        tagline: "Urdu-first AI assistant — messy sentence samajhta hai",
        stack: ["Groq", "Gemini", "Next.js"],
        started: "2025", updated: "2026",
        story: "Mizanora store ka AI assistant. Aap likho 'sasta laal joota under 2k' — Noor samajh jata hai. Urdu-first products ka core: privacy by default, honest prices, halal earning.",
        incident: "—",
        links: [], metrics: "Urdu NLU · shopping assistant"
      },
      {
        slug: "minexus-tv", name: "Minexus TV", icon: "🎞️", category: "Streaming", status: "past",
        tagline: "TMDB-powered streaming front end — guest mode, no login",
        stack: ["JavaScript", "TMDB", "Vercel"],
        started: "2026", updated: "2026",
        story: "Vercel-ready streaming front end: TMDB-powered releases, calendar, auto-built news cards, aur guest mode jisme login ki zaroorat nahi.",
        incident: "Personal repo suspension ke baad 404.",
        links: [], metrics: "TMDB · guest mode"
      },
      {
        slug: "mitv-player", name: "MiTV Player", icon: "📱", category: "Android", status: "past",
        tagline: "Android IPTV player — 4 themes, gesture controls, auto-retry",
        stack: ["Kotlin", "Jetpack Compose", "Media3/ExoPlayer"],
        started: "2026", updated: "2026",
        story: "Android IPTV player: chaar themes, gesture brightness/volume, HLS · DASH · MKV playback Media3 se, aur stream marne par auto-retry.",
        incident: "Personal repo suspension ke baad 404.",
        links: [], metrics: "Media3 · gesture UI"
      },
      {
        slug: "order-tracking", name: "Mizanora Order Tracking", icon: "📦", category: "Commerce", status: "active",
        tagline: "Animated parcel journey — honest about estimated vs real data",
        stack: ["Serverless", "PWA", "SEO"],
        started: "2026", updated: "2026",
        story: "Local aur international tracking IDs ke saath animated parcel journey, stage timeline, share sheet aur PWA install. Khaas baat: jo data estimated hai wo estimated likha hai, jo courier se aata hai wo asli — imaandari se.",
        incident: "—",
        links: [], metrics: "PWA · honest data labels"
      }
    ],

    /* ---------- BLOGS (templates: update | tutorial | story | news) ---------- */
    blogs: [
      {
        slug: "github-suspension-incident-2026", title: "Kya Hua: GitHub Account Suspension — Poori Kahani", template: "news",
        category: "Incident", date: "2026-11-23", author: "Mizanora Team",
        cover: "assets/img/blog/incident.jpg", tags: ["GitHub", "incident", "backup", "recovery"],
        excerpt: "2–3 saal ki mehnat, 90 repos — ek hi jhatke me 404. Kya hua, kyun hua, aur ab kya kar rahe hain.",
        content: `## Kya hua?
**November 2026** me Muaaz Iqbal ka personal GitHub account **@muaaziqbalvip** suspend kar diya gaya. Profile, saari public repositories (90 repos, 13.7 MB code), web pages — sab **404**. 30 October 2026 tak profile README normal tha (last refresh date), matlab incident uske baad hua.

## Kitna nuksan?
- 2–3 saal ki mehnat ke projects: Mizanora WhatsApp AI, StreamForge, BarakatWave-TV, SIRAVEX, Asaan Lang, MI Trade Master + Bot, Minexus TV, MiTV Player aur deegar
- Live deployments jinke CI/CD Actions se guzarte the — affected
- Google search results ab "ghost links" hain

## Kya bacha?
**Mizanoraorg** organization (purana naam Mizanora-org) me 4 repos mehfooz hain:
- \`MIZANORA\` (16 Nov 2026 tak push)
- \`MIZANORAAI\` (13 Nov 2026)
- \`miznaoraiptv\` (3 Nov 2026)
- \`Mizanora-org\` (30 Oct 2026)

## Wajah kya lagti hai?
24/7 GitHub Actions workloads (live TV playout, WhatsApp bot re-dispatch, cloud Android emulator) — GitHub ki abuse policy "Actions for general computing purposes" ke against hai. 2026 me aise bohot se cases document hue hain (14 saal purane accounts bhi bina warning suspend). Ek case me project video viral hone ke baad account suspend hua — 15 din baad restore bhi hua.

## Ab kya plan hai?
1. **Har project ka backup** — GitLab/Codeberg mirror + local copies
2. **Ye Mizanora Platform** — ek jagah par saara record: status, blogs, projects, team, media
3. GitHub Support ko appeal + ticket
4. Auto sitemap + SEO se Google par record dobara build karna

> *Sabaq: jo bhi platform ho, backup apni jagah — aur record apni website par hona chahiye, sirf kisi third-party account par nahi.*`
      },
      {
        slug: "asaan-lang-intro", title: "Asaan Lang: Soch Urdu Mein, Code Roman-Urdu Mein", template: "tutorial",
        category: "Language", date: "2026-10-12", author: "Muaaz Iqbal",
        cover: "assets/img/blog/asaan-lang.jpg", tags: ["Asaan Lang", "programming", "education", "Pakistan"],
        excerpt: "Pakistan ki apni programming language — 30 second me samjhein, phir khud likhein.",
        content: `## Asaan Lang kya hai?
Python seekhne se pehle aksar **English** seekhni padti hai. Asaan Lang pehle **soch** seekhati hai — variables, loops, decisions — apni zubaan mein. Jab dimagh ready ho, Python asaan lagti hai.

## 30 second ki language
| Kaam | Code |
| --- | --- |
| Print / input | \`likho "Salaam"\` · \`naam = lo "Naam? "\` |
| If | \`agar x > 5 to … aur agar … warna … bas\` |
| Loops | \`har i se 1 tak 10 to\` · \`dohrao 5 to\` · \`jabtak\` |
| Function | \`kaam jama(a, b) wapis a + b bas\` |
| Errors | \`koshish … pakro g … bas\` |

## Istemaal
\`\`\`
asaan                    # REPL
asaan meri.asaan         # file chalao
asaan -e "likho 1+2"     # ek line
asaan --web site.asaan -o site.html
asaan --studio           # playground
\`\`\`

## Citation
> Iqbal, Muaaz. (2026). *Asaan Lang: an Urdu/Roman-Urdu educational programming language*. MIT License. Kasur, Punjab, Pakistan.

*Note: original repo account suspension ke shikar hui — rewrite/restore in progress.*`
      },
      {
        slug: "founder-story-muaaz-iqbal", title: "Muaaz Iqbal: Kasur Se Mizanora Tak", template: "story",
        category: "Founder", date: "2026-10-30", author: "Mizanora Team",
        cover: "assets/img/blog/founder.jpg", tags: ["Muaaz Iqbal", "founder", "Kasur", "story"],
        excerpt: "2009 me paida hone wale ek larkay ne saste phone par duniya bhar ke platforms banaye. 'Unchi soch. Chhote qadam.'",
        content: `## Shuruaat
**Muaaz Iqbal** — Kasur, Punjab, Pakistan. Born 27 November 2009. ICS (Computer Science), Islamia Graduate College. Motto: *"Unchi soch. Chhote qadam."* — high thinking, small steps.

## Kya banaya?
Ek pura ecosystem — **Mizanora**: halal e-commerce (11,000+ products), Pakistan ki apni programming language **Asaan Lang**, 800-channel **BarakatWave TV**, **SIRAVEX** IPTV player, **MI Trade Master** trading education, **Noor AI** Urdu assistant, WhatsApp AI agent, cloud Android, community portals.

## Numbers
- 90 public repositories · 13.7 MB code
- Language mix: JS 37.7% · HTML 32.6% · Python 11.2% · Kotlin 10.2% · CSS 6.4% · TS 1.6%
- 800 live channels · 11,000+ products · 38 free tools

## Uske values
Honest prices. Halal earning. Privacy by default. *"Agar koi cheez fake hai to woh feature nahi."* Sab kuch **saste phone par test** kiya gaya — "built by hand, tested on a cheap phone."

## Aage ka rasta
GitHub suspension 2026 ek bada hadsa tha — lekin Mizanora ka record ab is platform par mehfooz hai. Har project, har date, har hadsa — sab yahan milega.`
      },
      {
        slug: "backup-guide-2026", title: "Har Project Ka Backup: Zaroori Guide", template: "tutorial",
        category: "Guide", date: "2026-11-23", author: "Mizanora Team",
        cover: "assets/img/blog/backup.jpg", tags: ["backup", "git", "guide", "safety"],
        excerpt: "Ek account suspend — saari mehnat gayab. Aisa na ho, isliye ye backup routine apnayein.",
        content: `## Rule #1: Ek jagah kabhi backup nahi
GitHub account suspend ho sakta hai (2026 me ye waqai hua — Muaaz Iqbal ke 90 repos ek jhatke me 404). Isliye:

## 3-2-1 Backup Rule
- **3** copies (asli + 2 backups)
- **2** alag media (cloud + local drive)
- **1** off-site (dusra cloud provider)

## Practical tareeqa (Git)
\`\`\`
# Har repo ka mirror, doosre platform par
git clone --mirror https://github.com/you/repo.git
cd repo.git
git push --mirror https://gitlab.com/you/repo.git
\`\`\`

## Automation
- **GitHub Actions** se weekly \`git bundle\` export (lekin Actions-heavy mat banein!)
- **GitHub Archive Program** ya git bundle files Google Drive par
- Releases ke ZIPs bhi save rakhein

## Is platform ka backup
Admin Panel → **Backup** tab → "Export JSON" — saara content (blogs, projects, team, status) ek JSON file me download. Ise Google Drive par rakhein.

> *Yaad rakhein: repo account par nahi, backup aapki apni ho.*`
      },
      {
        slug: "mizanora-ecosystem-map", title: "Mizanora Ecosystem: Her Project Ka Naqsha", template: "update",
        category: "Ecosystem", date: "2026-11-20", author: "Mizanora Team",
        cover: "assets/img/blog/ecosystem.jpg", tags: ["Mizanora", "ecosystem", "projects"],
        excerpt: "Mizanora kya hai? Store, language, TV, AI, trading, Islamic tools — poora naqsha ek jagah.",
        content: `## Ecosystem Map
**Mizanora** (Mizan = balance, Noor = illumination) — Pakistan-based digital infrastructure, halal e-commerce aur ethical AI.

### 🛍️ Commerce
- **Mizanora Store** — 11,000+ products, Noor AI, worker programme
- **Order Tracking** — animated parcel journey, honest data

### 🧠 Language & AI
- **Asaan Lang** — Roman-Urdu programming language
- **Noor AI** — Urdu-first assistant
- **Mizanora WhatsApp AI** — 24/7 agent with voice + memory

### 📺 Streaming
- **BarakatWave TV** — 800 channels + IMDb cinema
- **SIRAVEX** — web IPTV player
- **Mizanora IPTV Suite** — reseller economy
- **StreamForge / MIZANORA TV LIVE** — serverless 24/7 broadcast

### 📈 Trading
- **MI Trade Master** (Android) + **MI Trade Master Bot** (Telegram)

### 🕌 Islamic & Community
- **HijriAnchor**, Quran + Hadith, **Muslim Islam Org**

*Her project ki detail — dates, stack, incidents — Projects page par maujood hai.*`
      },
      {
        slug: "platform-v2-live", title: "Platform v2 Live: Naya Mark, 10 Blogs, Dual Hosting", template: "news",
        category: "Release", date: "2026-11-23", author: "Mizanora Team",
        cover: "assets/img/og-cover.jpg", tags: ["release", "platform", "branding", "firebase"],
        excerpt: "Mizanora Platform ka bara upgrade — official gold mark, generated covers, 5 naye blogs, auto sitemap aur Firebase Hosting + GitHub Pages dono par live.",
        content: "## Kya naya hai?\n\n**Platform v2** ek visual + technical upgrade hai — design bhi, infrastructure bhi.\n\n- **Official Mizanora mark** — gold M + sparkle, ab favicon, nav, PWA icon aur social card me\n- **10 blog articles** — incidents, tutorials, founder story, infra\n- **Generated cover art** — har article ka apna cinematic cover\n- **Auto sitemap** — har deploy par `sitemap.xml` khud ban jata hai\n- **Dual hosting** — GitHub Pages + Firebase Hosting (global CDN)\n- **Media = links only** — Firebase Storage nahi, koi bhi image/video/audio URL chalega\n\n## Kyun dual hosting?\n\n| Host | Faida |\n| --- | --- |\n| GitHub Pages | Free, git ke saath juda, kabhi bill nahi |\n| Firebase Hosting | Global edge CDN, instant cache purge, custom headers, preview channels |\n\nDono ek hi source se bante hain — `main` par push, dono jagah deploy.\n\n## Aage kya?\n\n- Urdu locale toggle\n- Project-wise detail pages (`/projects/<slug>`)\n- Recovery drive: suspended repos ka public archive\n\n> *Record apni website par. Copy apni drive par. Code apne git par.*"
      },
      {
        slug: "firebase-hosting-dual-deploy", title: "Firebase Hosting + GitHub Pages: Ek Codebase, Do Ghar", template: "tutorial",
        category: "Infra", date: "2026-11-22", author: "Muaaz Iqbal",
        cover: "assets/img/blog/hosting.jpg", tags: ["firebase", "hosting", "github-pages", "devops"],
        excerpt: "Ek hi static codebase ko GitHub Pages aur Firebase Hosting dono par deploy karna — bilkul free, bina VPS, bina bill ka darr.",
        content: "## Kyun do jagah?\n\nNovember 2026 ka sabaq: **ek platform par sab kuch nahi**. GitHub account suspend ho sakta hai, Vercel bill 402 de sakta hai. Isliye site ka source git me, aur deploy **do independent hosts** par.\n\n## Setup (3 files)\n\n| File | Kaam |\n| --- | --- |\n| `firebase.json` | `public: \".\"`, ignore list, cache + security headers |\n| `.firebaserc` | default project ka naam |\n| `.github/workflows/deploy-firebase.yml` | push par live channel deploy |\n\n## Headers jo farq daalte hain\n\n```\n\"headers\": [\n  { \"source\": \"**/*.@(css|js|jpg|png|svg)\", \"headers\": [{ \"key\": \"Cache-Control\", \"value\": \"public, max-age=604800\" }] },\n  { \"source\": \"**/*.@(html|json|xml)\", \"headers\": [{ \"key\": \"Cache-Control\", \"value\": \"public, max-age=300\" }] }\n]\n```\n\nAssets ko hafta bhar cache, HTML ko 5 minute — isi liye site **fast** bhi lagti hai aur update bhi foran dikhta hai.\n\n## CI me credentials\n\n1. Firebase Console → *Project settings → Service accounts* → **Generate new private key**\n2. GitHub repo → *Settings → Secrets* → `FIREBASE_SERVICE_ACCOUNT` = poora JSON\n3. Workflow khud `live` channel par deploy kar dega\n\n## Preview channels (bonus)\n\nHar pull request ke liye temporary URL:\n\n```\nfirebase hosting:channel:deploy pr-12 --expires 7d\n```\n\nClient ko preview dikhana ho ya design compare karna ho — production ko chhue baghair.\n\n## Manual deploy\n\n```\nnpm i -g firebase-tools\nfirebase login\nfirebase use mizanoraorg\nfirebase deploy --only hosting,firestore:rules\n```\n\n> Rule: jo bhi deploy ho, **source git me** ho. Host badal sakta hai, history nahi."
      },
      {
        slug: "noor-ai-urdu-first-assistant", title: "Noor AI: Urdu-First Assistant Kaise Sochta Hai", template: "update",
        category: "AI", date: "2026-11-21", author: "Muaaz Iqbal",
        cover: "assets/img/blog/noor-ai.jpg", tags: ["Noor AI", "Urdu", "AI", "product"],
        excerpt: "'Sasta laal joota under 2k' — aisa messy Urdu sentence samajhna, keyword search se nahi hota. Noor AI ke design ke teen asool.",
        content: "## Problem\n\nPakistan ke marketplaces me log aise likhte hain:\n\n> *\"sasta laal joota under 2k\"* · *\"bacha ke liye warm jacket 6 saal\"* · *\"khushbu jo 500 se kam ho\"*\n\nKeyword search yahan fail ho jata hai, kyunki **niyat** alfaaz me nahi, **sentence** me hoti hai.\n\n## Noor ke teen asool\n\n| # | Assool | Matlab |\n| --- | --- | --- |\n| 1 | **Niyat pehle, alfaaz baad me** | Sentence ko intent me parse karo — budget, rang, audience, category |\n| 2 | **Urdu-first, English bhi** | Roman Urdu aur English dono samjho, jawab user ki zubaan me |\n| 3 | **Imaandar jawab** | Agar exact match nahi hai to \"sasta alternative ye hai\" — jhooti listing nahi |\n\n## Example pipeline\n\n```\n\"Bhai 1500 me school bag chahiye\" \n   → intent: { category: bag, audience: school, budget: 1500 }\n   → filter: price <= 1500, stock > 0\n   → rank: rating, delivery speed, COD\n   → jawab: 3 options + ek honest note\n```\n\n## Kya nahi karte\n\n- **Fake reviews** generate nahi karte\n- **Clickbait price** nahi dikhate (jo cart me badal jaye)\n- User ka data kisi third party ko nahi bechte\n\n> *Noor ka matlab hi \"roshni\" hai — andhera nahi bechna.*"
      },
      {
        slug: "iptv-reseller-suite-v6", title: "IPTV Reseller Suite v6.1.2 — Owner Se Client Tak Ka Safar", template: "update",
        category: "Streaming", date: "2026-11-20", author: "Muaaz Iqbal",
        cover: "assets/img/blog/streaming.jpg", tags: ["IPTV", "reseller", "streaming", "architecture"],
        excerpt: "3-level economy: owner control → reseller workspace → client service. 183+ integration tests, signed playback, MAG/Stalker support.",
        content: "## Architecture\n\n```\nOWNER  ──►  RESELLER  ──►  CLIENT\nadmin panel   credits,      playlist,\npricing,      clients,      EPG, app\nkeys          renewals      access\n```\n\nHar level ka apna panel hai — aur har level par **wahi rules** lagte hain: kaun kya dekh sakta hai, kitne devices, kab tak.\n\n## v6.1.2 me kya hai\n\n- Reseller registration + credits + clients (renew / suspend / delete)\n- Pricing engine + payment ledger\n- **Key rotation** (compromised key foran band)\n- M3U import, XMLTV EPG, Xtream Codes, MAG/Stalker\n- Signed playback URLs — link copy karke bahar nahi chalti\n- **183+ integration tests** (imports, EPG, Xtream, playback, admin)\n\n## Production lessons\n\n| Sabaq | Detail |\n| --- | --- |\n| Tests pehle | 183 tests ne 3 major regressions pakre |\n| Audit log | Kaun ne kya badla — har action ka record |\n| Graceful limits | 20 concurrent jobs ka cap document kiya, crash nahi |\n| Owner lock | Admin panel sirf owner Google account se khulta hai |\n\n> **v5 → v6.1.2** ka safar: reseller economy ko \"feature\" se \"business\" banane tak."
      },
      {
        slug: "naye-developers-ke-liye-5-sabaq", title: "Naye Developers Ke Liye 5 Sabaq — Saste Phone Se Shuru", template: "tutorial",
        category: "Guide", date: "2026-11-19", author: "Muaaz Iqbal",
        cover: "assets/img/blog/founder.jpg", tags: ["beginners", "guide", "pakistan", "career"],
        excerpt: "Na laptop, na bootcamp, na English perfection — sirf ek sasta phone aur zabardast zid. Wo 5 sabaq jo 90 repos banane ke baad samajh aaye.",
        content: "## Sabaq 1 — Tool bahana nahi hota\n\nSab kuch **saste phone par** build aur test hua. Jo phone aapke paas hai, wohi aapka dev machine hai.\n\n- Editor: browser me hi (GitHub web editor, StackBlitz)\n- Deploy: free static hosts\n- Test: asli device, asli network speed\n\n## Sabaq 2 — Chhota ship karo, jaldi ship karo\n\nBara idea 3 mahine me nahi, **chhota slice 3 din me**. Feedback asli hota hai, imagination nahi.\n\n| Ghalat | Sahi |\n| --- | --- |\n| \"Poora app ready hone do\" | \"Ek page live karo, phir barhao\" |\n| \"Perfect design\" | \"Kaam karta hua design\" |\n\n## Sabaq 3 — Backup pehle din se\n\nEk account suspend = 90 repos 404. Ye guzra hua waqt hai, **aap ka future ho sakta hai**.\n\n```\ngit clone --mirror   → GitLab / Codeberg\ngit bundle create    → Google Drive\nJSON export          → weekly\n```\n\n## Sabaq 4 — English perfect nahi, logic perfect chahiye\n\nVariable ka naam `totalPrice` ho ya `total_qeemat` — chalega. Lekin **edge cases** theek hone chahiye: khali input, slow network, double tap.\n\n## Sabaq 5 — Imaandari feature hai\n\nFake data, fake reviews, fake \"guaranteed profit\" — inki umar chhoti hoti hai. Honest product slow chalta hai, lekin **rukta nahi**.\n\n> *\"Unchi soch. Chhote qadam.\"* — Kasur se, 2009 se, abhi tak."
      },
    ],

    /* ---------- TEAM / MEMBERS ---------- */
    team: [
      { id: "t1", name: "Muaaz Iqbal", role: "Founder & Lead Developer", bio: "Full-stack & Android developer, AI orchestrator, founder of Mizanora. Kasur, Punjab, Pakistan. 'Unchi soch. Chhote qadam.'", links: { github: "https://github.com/muaaziqbalvip", youtube: "https://youtube.com/@MuaazIqbalofficial", x: "https://x.com/MizanoraApps", instagram: "https://instagram.com/mizanora" }, email: "mezanora.market@gmail.com", phone: "+92 306 2015326" },
      { id: "t2", name: "Arena AI Agent", role: "Development Partner", bio: "AI development collaborator — code, audits, PRs (v39–v55, v47 billing, IPTV suites) me co-author.", links: {}, email: "", phone: "" },
      { id: "t3", name: "Muslim Islam Org Team", role: "Community", bio: "Community portal team — directory, project hub, chat relay, tools.", links: {}, email: "", phone: "" },
      { id: "t4", name: "Mizanora Resellers Network", role: "Partners", bio: "Worker/reseller programme ke members — personal links, wallets, IPTV resellers.", links: {}, email: "", phone: "" }
    ],

    /* ---------- TIMELINE (about page) ---------- */
    timeline: [
      { date: "2009-11-27", title: "Janam — Kasur, Punjab", text: "Muaaz Iqbal ka janam. Motto baad me bana: 'Unchi soch. Chhote qadam.'" },
      { date: "2023–2024", title: "Shuruaat — pehle projects", text: "2–3 saal ki mehnat ka aghaaz: web experiments, streaming pipelines, Android apps. Islamia Graduate College me ICS." },
      { date: "2025", title: "Mizanora ka qayam", text: "Mizanora store (11,000+ products), Noor AI assistant, Muslim Islam Org, BarakatWave TV ka pehla version." },
      { date: "2026", title: "Flagship year", text: "Asaan Lang v1.1, SIRAVEX, MI Trade Master + Bot, WhatsApp AI agent, StreamForge, cloud Android, IPTV Reseller Suite. 90 public repos, 13.7 MB code." },
      { date: "2026-10-30", title: "Profile README — last refresh", text: "90 repos · 800 live channels · 11,000+ products · 38 free tools. Sab kuch normal tha." },
      { date: "2026-11-02", title: "v47 + IPTV v6.1.2", text: "Billing, cron auto-suspend, audit log, reseller panel — Mizanoraorg org me active development." },
      { date: "2026-11-16", title: "Aakhri org push", text: "MIZANORA repo me aakhri push (v59.2 restore ke baad)." },
      { date: "2026-11 (mid)", title: "⚠️ GitHub Account Suspension", text: "@muaaziqbalvip 404 — 90 repos, 2–3 saal ki mehnat gayab. Mizanora-org → Mizanoraorg rename se 4 repos mehfooz." },
      { date: "2026-11-23", title: "Ye Platform", text: "Mizanora Platform launch — saara record ek jagah: status, blogs, projects, team, media. Backup + recovery drive jaari." }
    ],

    /* ---------- GALLERY (admin se media add hota hai) ---------- */
    gallery: [
      { id: "g1", type: "image", url: "assets/img/og-cover.jpg", caption: "Mizanora — official mark (brand cover)", date: "2026-11-23" },
      { id: "g2", type: "image", url: "assets/img/blog/ecosystem.jpg", caption: "Mizanora ecosystem — ek naqsha", date: "2026-11-23" },
      { id: "g3", type: "image", url: "assets/img/blog/streaming.jpg", caption: "Streaming stack — 800 channels", date: "2026-11-23" },
      { id: "g4", type: "image", url: "assets/img/blog/founder.jpg", caption: "Kasur, Punjab — jahan se shuru hua", date: "2026-11-23" },
      { id: "g5", type: "image", url: "assets/img/blog/noor-ai.jpg", caption: "Noor AI — Urdu-first assistant", date: "2026-11-23" }
    ]
  }
};
