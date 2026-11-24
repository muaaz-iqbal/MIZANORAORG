# 🔍 Google Search Console — verification + sitemap (Mizanora)

**Canonical host:** `https://mizanoraorg.web.app`
**Mirror:** `https://muaaz-iqbal.github.io/MIZANORAORG`

### Verification tokens installed

| Token | Meta tag | HTML file |
| --- | --- | --- |
| `PiedLWGigl4PJjb1sUkoYc7PjDy9AjBX02JwfnO1gZg` *(latest)* | ✅ all 6 pages | `googlePiedLWGigl4PJjb1sUkoYc7PjDy9AjBX02JwfnO1gZg.html` |
| `jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM` *(earlier)* | ✅ all 6 pages | `googlejSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM.html` |

⚠️ **`.web.app` par DNS TXT method kabhi kaam nahi karega** — `web.app` Google ki domain hai,
aapke paas uska DNS zone nahi. Search Console me **URL prefix** property + **HTML tag** use karein.

---

## 🐞 "Couldn't fetch" — asli wajah (aur fix)

Search Console jab sitemap submit karte hain, to **us property ke prefix se bahar ke URLs ko
invalid maanta hai**. Humari pehli sitemap aisi thi:

```xml
<!-- ❌ GALAT: property https://mizanoraorg.web.app/ hai, magar URLs dusre host ke -->
<loc>https://muaaz-iqbal.github.io/MIZANORAORG/</loc>
<loc>https://muaaz-iqbal.github.io/MIZANORAORG/projects.html</loc>
```

Google isay fetch karke reject kar deta hai → status **"Couldn't fetch"**, *discovered pages = 0*.
`rss.xml` ka bhi wahi haal tha (uske `<link>` bhi github.io ke the).

**Fix (ab repo me hai):** generator **host-aware** ho gaya —

```bash
# canonical host (default — data.js SITE_URL se)
node scripts/generate-seo.mjs

# kisi bhi host ke liye
node scripts/generate-seo.mjs --site=https://mizanoraorg.web.app
node scripts/generate-seo.mjs --site=https://muaaz-iqbal.github.io/MIZANORAORG
```

Ab `sitemap.xml`, `rss.xml` **aur** `robots.txt` — teeno usi host ke URLs se bante hain:

```xml
<!-- ✅ SAHI -->
<loc>https://mizanoraorg.web.app/</loc>
<loc>https://mizanoraorg.web.app/projects.html</loc>
<loc>https://mizanoraorg.web.app/blog.html?slug=platform-v2-live</loc>
```

---

## ✅ Ab kya karein (2 minute)

1. Search Console → property `https://mizanoraorg.web.app/`
2. **Sitemaps** → **`sitemap-index.xml`** submit karein *(index khud /sitemap.xml aur /sitemaps/blog.xml Google ko de deta hai)*
   *(pehle wali row delete karna zaroori nahi — Google khud re-fetch karega, par fresh submit foran queue karta hai)*
3. **URL Inspection** → `https://mizanoraorg.web.app/` → **Request Indexing**
4. 24–48 ghante me status **Success** + *discovered pages 20* dikhna chahiye
   (5 core pages + blog list + 14 static articles)

> `rss.xml` sitemap ki tarah submit karein to bhi chalega (Google RSS 2.0 feeds accept karta hai).

### IndexNow (Bing / Yandex — instant indexing)

Two Google-only tak na rukein: har Firebase deploy ke baad
`scripts/ping-indexnow.mjs` saare URLs `api.indexnow.org` par bhejta hai
(key file: `8f3c1d7a94b25e6fa07c4d19b6e2a7f5.txt`).

Bing Webmaster Tools me site add karein → **URL Submission → API** me IndexNow enable karein,
aur Yandex Webmaster me bhi wahi key file verify ho jayegi.

### Live sanity check

```bash
curl -s https://mizanoraorg.web.app/sitemap-index.xml
# → <loc>https://mizanoraorg.web.app/sitemap.xml</loc>
# → <loc>https://mizanoraorg.web.app/sitemaps/blog.xml</loc>

curl -s https://mizanoraorg.web.app/sitemaps/blog.xml | head -8
# → <loc>https://mizanoraorg.web.app/blog/<slug>.html</loc>

curl -s https://mizanoraorg.web.app/robots.txt | grep Sitemap
# → Sitemap: https://mizanoraorg.web.app/sitemap.xml

curl -s https://mizanoraorg.web.app/ | grep google-site-verification
```

---

## 🧠 Canonical host kyun badla

Pehle saare `canonical` tags github.io par ja rahe the, jab ke Search Console property web.app thi.
Iska matlab: Google web.app pages ko "alternate / duplicate" samajh kar index nahi karta.

Ab **web.app canonical** hai (branded domain + Firebase global CDN), aur github.io ka kaam **mirror**:

| Role | Host | Kya karta hai |
| --- | --- | --- |
| **Canonical** | `mizanoraorg.web.app` | `canonical`, `og:url`, JSON-LD, sitemap — sab yahan |
| **Mirror** | `muaaz-iqbal.github.io/MIZANORAORG` | same files, backup + git history |

Agar kabhi Firebase deploy ruk jaye, to `assets/js/data.js` me `SITE_URL` wapas github.io kar dein —
canonical foran switch ho jayega.

---

## 🔮 Future custom domain (e.g. `mizanora.com`)

Tab **Domain property + DNS TXT** sahi hai:

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name/Host | `@` |
| Value | `google-site-verification=PiedLWGigl4PJjb1sUkoYc7PjDy9AjBX02JwfnO1gZg` |
| TTL | `3600` |

---

## 📌 Firebase Auth (alag cheez hai)

Search Console verification se admin login ka koi taalluq nahi. Admin panel ke Google Sign-In ke liye
**Authentication → Settings → Authorized domains** me ye hone chahiye:

- `mizanoraorg.web.app`
- `mizanoraorg.firebaseapp.com`
- `muaaz-iqbal.github.io`
- `localhost`
