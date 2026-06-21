/* ============================================================
   Father's Day 2026 — interactions
   - scroll-reveal via IntersectionObserver
   - top scroll-progress bar
   - "one more thing" hidden-message reveal + gentle hearts
   All vanilla, no dependencies. Degrades gracefully.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll-reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // show everything immediately
    revealItems.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* ---------- scroll progress bar ---------- */
  var bar = document.getElementById("progress-bar");
  if (bar) {
    var ticking = false;
    var update = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop || window.pageYOffset) / max * 100 : 0;
      bar.style.width = pct.toFixed(1) + "%";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- hidden surprise ---------- */
  var btn = document.getElementById("reveal-btn");
  var letter = document.getElementById("letter");
  var signoff = document.getElementById("signoff");

  if (btn && letter) {
    btn.addEventListener("click", function () {
      letter.hidden = false;
      if (signoff) signoff.hidden = false;
      // next frame so the [hidden] removal registers before animating
      window.requestAnimationFrame(function () {
        letter.classList.add("revealing");
        if (signoff) signoff.classList.add("revealing");
      });
      btn.classList.add("is-hidden");
      btn.setAttribute("aria-expanded", "true");

      // move focus to the message for screen readers
      letter.setAttribute("tabindex", "-1");
      letter.focus({ preventScroll: true });
      letter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });

      if (!reduceMotion) showHearts();
    });
  }

  /* gentle gold hearts drifting up — light, brief, decorative */
  function showHearts() {
    var glyphs = ["♥", "❤", "✿"]; // ♥ ❤ ✿
    var count = 16;
    for (var i = 0; i < count; i++) {
      (function (i) {
        var h = document.createElement("span");
        h.className = "heart";
        h.textContent = glyphs[i % glyphs.length];
        h.style.left = (5 + Math.floor((i / count) * 90) + (i % 3) * 3) + "%";
        h.style.fontSize = (0.8 + (i % 4) * 0.35) + "rem";
        var dur = 4500 + (i % 5) * 900;
        h.style.animationDuration = dur + "ms";
        h.style.animationDelay = (i * 110) + "ms";
        document.body.appendChild(h);
        window.setTimeout(function () { h.remove(); }, dur + i * 110 + 200);
      })(i);
    }
  }
})();
