/* ============================================================
   MIZANORA PLATFORM — Store (data layer)
   Modes: firebase (online) → local (localStorage) → seed (read-only)
   ============================================================ */
const MZ = window.MZ;
const LS_KEY = "mizanora_platform_data_v1";

let fb = null; // firebase services (agar load ho jayein)
let mode = "seed";

function loadLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function saveLocal(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) { /* quota */ }
}

/* ---- Firebase lazy init (network fail → graceful fallback) ---- */
async function initFirebase() {
  if (fb) return fb;
  try {
    const [appM, fsM, authM, stM] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js"),
      import("https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/13.4.0/firebase-storage.js")
    ]);
    const app = appM.initializeApp(MZ.FIREBASE_CONFIG);
    fb = {
      app,
      db: fsM.getFirestore(app),
      auth: authM.getAuth(app),
      storage: stM.getStorage(app),
      fs: fsM,
      authM,
      stM
    };
    mode = "firebase";
    return fb;
  } catch (e) {
    console.warn("[Mizanora] Firebase load fail — local/seed mode:", e && e.message);
    mode = loadLocal() ? "local" : "seed";
    return null;
  }
}

export const Store = {
  get mode() { return mode; },

  async init() {
    const f = await initFirebase();
    if (!f && loadLocal()) mode = "local";
    return mode;
  },

  /* ---- READ: collection list (firebase → local → seed) ---- */
  async list(name) {
    const f = await initFirebase();
    if (f) {
      try {
        const snap = await f.fs.getDocs(f.fs.collection(f.db, name));
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn("[Mizanora] Firestore read fail:", e && e.message);
      }
    }
    const local = loadLocal();
    if (local && local[name] && local[name].length) return local[name];
    return (MZ.SEED[name] || []).map(x => ({ ...x }));
  },

  /* ---- WRITE: id ho to update, nahi to create ---- */
  async save(name, id, data) {
    // local cache hamesha update (fast + offline)
    const local = loadLocal() || JSON.parse(JSON.stringify(MZ.SEED));
    local[name] = local[name] || [];
    const idx = local[name].findIndex(x => x.id === id);
    const record = { ...data, id };
    if (idx >= 0) local[name][idx] = record; else local[name].push(record);
    saveLocal(local);

    const f = await initFirebase();
    if (f) {
      try {
        await f.fs.setDoc(f.fs.doc(f.db, name, id), data, { merge: true });
        mode = "firebase";
      } catch (e) {
        console.warn("[Mizanora] Firestore write fail (local saved):", e && e.message);
        mode = "local";
      }
    }
    return record;
  },

  async remove(name, id) {
    const local = loadLocal();
    if (local && local[name]) {
      local[name] = local[name].filter(x => x.id !== id);
      saveLocal(local);
    }
    const f = await initFirebase();
    if (f) {
      try { await f.fs.deleteDoc(f.fs.doc(f.db, name, id)); } catch (e) { console.warn(e); }
    }
  },

  /* ---- AUTH (Google sign-in, owner-only) ---- */
  async signInGoogle() {
    const f = await initFirebase();
    if (!f) throw new Error("Firebase offline — sign-in ke liye internet zaroori hai.");
    const provider = new f.authM.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return f.authM.signInWithPopup(f.auth, provider);
  },

  async signOut() {
    const f = await initFirebase();
    if (f) await f.authM.signOut(f.auth);
  },

  onAuth(cb) {
    initFirebase().then(f => {
      if (!f) { cb(null); return; }
      f.authM.onAuthStateChanged(f.auth, user => cb(user));
    });
  },

  isOwner(user) {
    return !!(user && user.email && user.email.toLowerCase() === MZ.OWNER_EMAIL.toLowerCase());
  },

  /* ---- STORAGE upload (media) ---- */
  async uploadFile(file, path) {
    const f = await initFirebase();
    if (!f) throw new Error("Firebase Storage offline — file upload ke liye internet zaroori hai.");
    const ref = f.stM.ref(f.storage, path);
    const snap = await f.stM.uploadBytes(ref, file);
    return await f.stM.getDownloadURL(snap.ref);
  },

  /* ---- Backup: full JSON export ---- */
  async exportAll() {
    const out = { exportedAt: new Date().toISOString(), site: MZ.SITE_URL };
    for (const name of ["status", "blogs", "projects", "team", "timeline", "gallery"]) {
      out[name] = await this.list(name);
    }
    return out;
  },

  async importAll(json) {
    for (const name of ["status", "blogs", "projects", "team", "timeline", "gallery"]) {
      if (Array.isArray(json[name])) {
        for (const item of json[name]) {
          const { id, ...data } = item;
          await this.save(name, id || (name + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7)), data);
        }
      }
    }
  }
};
