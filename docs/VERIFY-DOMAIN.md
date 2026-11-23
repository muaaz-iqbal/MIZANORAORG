# 🔍 Google Search Console — domain verification (Mizanora)

Verification token:

```
google-site-verification=jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM
```

Token (without prefix):

```
jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM
```

---

## ⚠️ Zaroori baat: `.web.app` par DNS record nahi lag sakta

`mizanoraorg.web.app` Google ki apni domain (`web.app`) ke neeche hai — uska DNS **Google** control karta hai,
aapke paas DNS panel nahi hota. Isliye Search Console ka
**"Domain" property + DNS TXT record** wala tareeqa yahan **kabhi kaam nahi karega**, chahe aap
record kahan bhi daal dein.

✅ `.web.app` (aur `*.github.io`) ke liye **"URL prefix" property** use karein — usme
**HTML tag** ya **HTML file** method chalta hai. Dono is repo me pehle se laga diye gaye hain:

| Method | Kahan hai | Value |
| --- | --- | --- |
| **HTML tag** | har page ke `<head>` me | `<meta name="google-site-verification" content="jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM">` |
| **HTML file** | repo root | `googlejSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM.html` |

Live check (deploy ke baad):

```bash
curl -s https://mizanoraorg.web.app/ | grep google-site-verification
curl -s https://mizanoraorg.web.app/googlejSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM.html
# → google-site-verification: googlejSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM.html
```

---

## ✅ Sahi tareeqa (2 minute)

### 1. Firebase Hosting property

1. Search Console → **Add property** → **URL prefix**
2. URL: `https://mizanoraorg.web.app/` *(slash ke saath)*
3. Verification method: **HTML tag** *(already installed — kuch paste karne ki zaroorat nahi)*
4. **Verify** dabaein ✅

### 2. GitHub Pages property

1. Search Console → **Add property** → **URL prefix**
2. URL: `https://muaaz-iqbal.github.io/MIZANORAORG/`
3. Wahi **HTML tag** method → **Verify** ✅

> DNS dialog (`Verify domain ownership via DNS record`) ko **back / verify later** kar dein —
> wo `.web.app` par kabhi pass nahi hoga.

### 3. Sitemap submit (verification ke foran baad)

```
https://mizanoraorg.web.app/sitemap.xml
https://muaaz-iqbal.github.io/MIZANORAORG/sitemap.xml
```

Search Console → **Sitemaps** → path paste → Submit. `sitemap.xml` khud banti hai
(`scripts/generate-seo.mjs`), is liye naye blog khud index queue me chale jate hain.

### 4. Indexing tez karne ke liye

- **URL Inspection** → home / projects / blog / about → **Request Indexing**
- `robots.txt` me dono sitemaps listed hain ✔
- `llms.txt` AI search (ChatGPT / Perplexity / Gemini) ke liye mojood hai ✔
- Har naye article ka link X / WhatsApp par share karein — backlinks indexing tez karte hain

---

## 🔮 Agar future me apni domain ho (e.g. `mizanora.com`)

Tab **Domain property** + DNS TXT record sahi option hai:

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name / Host | `@` (apex) ya jo provider kahe |
| Value | `google-site-verification=jSBcl9CFtpuhhe3M778hOM3bGz0DvpJ3K0DLpJNP2CM` |
| TTL | `3600` (ya default) |

DNS propagate hone me 5 minute se 48 ghante lag sakte hain. Uske baad Search Console → **Verify**.

Firebase Hosting par custom domain add karne ke baad (Console → Hosting → *Add custom domain*)
wahi TXT record `mizanora.com` par laga kar dono cheezein ek saath verify ho jayengi.

---

## 📌 Firestore / Firebase note

Domain verify hone ka Firebase Auth se koi taalluq nahi. Admin panel ke Google Sign-In ke liye
**Authentication → Settings → Authorized domains** me ye add hone chahiye:

- `muaaz-iqbal.github.io`
- `mizanoraorg.web.app`
- `mizanoraorg.firebaseapp.com`
- `localhost`
