(function () {
  "use strict";

  /* ── 1. Scroll reveal + stagger ───────────────────────────── */
  function initReveal() {
    document.querySelectorAll(
      "main > section, #content > section, " +
      ".row.g-4, .row.gy-4, .row.g-5"
    ).forEach(function (el) {
      if (el.id === "inicio-hero" || el.id === "subheader") return;
      // Excluir filas que contengan contadores del template
      if (el.querySelector(".de_count")) return;

      el.classList.add("itcs-reveal");

      var hasCards = el.querySelector(
        ".itcs-service-card, .itcs-partner-card, .itcs-product-card, .de-box, .card"
      );
      if (hasCards) el.classList.add("itcs-stagger");
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("itcs-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    document.querySelectorAll(".itcs-reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 2. Cursor light en cards ─────────────────────────────── */
  function initCursorLight() {
    document.querySelectorAll(
      ".itcs-service-card, .itcs-partner-card, .itcs-product-card"
    ).forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%";
        var y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
        card.style.setProperty("--mx", x);
        card.style.setProperty("--my", y);
      });
    });
  }

  /* ── 3. Ambient orb mouse parallax ───────────────────────── */
  function initAmbientParallax() {
    var hero = document.getElementById("inicio-hero");
    if (!hero) return;

    document.addEventListener("mousemove", function (e) {
      var dx = (e.clientX / window.innerWidth  - 0.5) * 18;
      var dy = (e.clientY / window.innerHeight - 0.5) * 12;
      hero.style.setProperty("--orb-x", dx.toFixed(2) + "px");
      hero.style.setProperty("--orb-y", dy.toFixed(2) + "px");
    }, { passive: true });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initCursorLight();
    initAmbientParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
