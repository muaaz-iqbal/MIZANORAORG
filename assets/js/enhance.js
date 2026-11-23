/* ============================================================
   MIZANORA PLATFORM — enhancement layer (v2)
   Progressive: works with zero JS too. Adds reveal motion,
   image resilience, share actions, back-to-top, subtle parallax.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("mz-ready");

  /* ---------- reveal on scroll ---------- */
  var io = null;
  if ("IntersectionObserver" in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("mz-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  }

  function tag(selector, limit) {
    var nodes = document.querySelectorAll(selector + ":not([data-reveal])");
    for (var i = 0; i < nodes.length; i++) {
      if (limit && i >= limit) break;
      var el = nodes[i];
      el.setAttribute("data-reveal", "");
      if (io) {
        el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
        io.observe(el);
      }
    }
  }

  function enhance() {
    tag(".card", 0);
    tag(".tl-item", 0);
    tag(".media-card", 0);
    tag(".section-head", 0);
    tag(".admin-panel", 0);
    guardImages();
  }

  /* ---------- graceful images ---------- */
  function guardImages() {
    var imgs = document.querySelectorAll("img:not([data-guarded])");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      img.setAttribute("data-guarded", "");
      img.setAttribute("loading", img.getAttribute("loading") || "lazy");
      img.setAttribute("decoding", img.getAttribute("decoding") || "async");
      img.addEventListener("error", function () {
        this.classList.add("mz-broken");
        if (!this.alt) this.alt = "Mizanora media";
      });
    }
  }

  /* ---------- card spotlight follows pointer ---------- */
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---------- header depth on scroll + back to top ---------- */
  var top = document.createElement("button");
  top.className = "mz-top";
  top.type = "button";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML = "↑";
  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  document.body.appendChild(top);

  var header = document.getElementById("site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    top.classList.toggle("show", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- subtle hero parallax ---------- */
  var mark = document.querySelector(".hero-mark");
  if (mark && !reduce && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 8;
      mark.style.setProperty("--px", x + "px");
      mark.style.transform = "translate(" + x + "px," + y + "px)";
    }, { passive: true });
  }

  /* ---------- share bar on blog articles ---------- */
  function addShareBar() {
    var article = document.getElementById("blog-article");
    if (!article || article.querySelector(".share-bar") || !article.querySelector(".article-body")) return;
    var url = location.href.split("?")[0] + location.search;
    var title = (document.querySelector("#blog-article h1") || {}).textContent || document.title;

    var bar = document.createElement("div");
    bar.className = "share-bar";

    var copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "🔗 Link copy";
    copy.addEventListener("click", function () {
      var done = function () { copy.textContent = "✅ Copied!"; setTimeout(function () { copy.textContent = "🔗 Link copy"; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(done);
      else done();
    });

    var wa = document.createElement("a");
    wa.href = "https://wa.me/?text=" + encodeURIComponent(title + " — " + url);
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.textContent = "💬 WhatsApp";

    var x = document.createElement("a");
    x.href = "https://x.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
    x.target = "_blank";
    x.rel = "noopener";
    x.textContent = "𝕏 Share";

    bar.appendChild(copy);
    bar.appendChild(wa);
    bar.appendChild(x);
    article.appendChild(bar);
  }

  /* ---------- keep working with async-rendered content ---------- */
  var pending = null;
  var mo = new MutationObserver(function () {
    clearTimeout(pending);
    pending = setTimeout(function () { enhance(); addShareBar(); }, 120);
  });
  mo.observe(document.body, { childList: true, subtree: true });

  enhance();
  addShareBar();
})();
