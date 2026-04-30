(function () {
  "use strict";

  /* ── 1. Scroll reveal + stagger ───────────────────────────── */
  function initReveal() {
    // Auto-tag sections y filas de cards
    document.querySelectorAll(
      "main > section, #content > section, " +
      ".row.g-4, .row.gy-4, .row.g-5"
    ).forEach(function (el) {
      // Excluir hero y subheader
      if (el.id === "inicio-hero" || el.id === "subheader") return;
      el.classList.add("itcs-reveal");

      // Si la fila contiene cards, aplicar stagger
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

  /* ── 3. Counter animation ─────────────────────────────────── */
  function animateCounter(el, target, suffix) {
    var start    = 0;
    var duration = 1400;
    var step     = target / (duration / 16);

    function tick() {
      start += step;
      if (start < target) {
        el.textContent = Math.floor(start) + suffix;
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }
    tick();
  }

  function initCounters() {
    // Busca elementos con data-target (counter manual) o .de_count h3 (template)
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = "true";

        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || "+";
        if (!isNaN(target)) animateCounter(el, target, suffix);

        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll("[data-target]").forEach(function (el) {
      counterObserver.observe(el);
    });

    // Template nativo: .de_count h3 — extraer número y re-animar
    document.querySelectorAll(".de_count h3").forEach(function (el) {
      var raw    = el.textContent.trim();
      var match  = raw.match(/(\d+)/);
      if (!match) return;
      var target = parseInt(match[1], 10);
      var suffix = raw.replace(match[1], "");

      counterObserver.observe(el);
      el.dataset.target = target;
      el.dataset.suffix = suffix;
      el.dataset.raw    = raw;
    });
  }

  /* ── 4. Ambient orb mouse parallax (muy sutil) ────────────── */
  function initAmbientParallax() {
    var orbs = document.querySelectorAll("#inicio-hero");
    if (!orbs.length) return;
    var hero = orbs[0];

    document.addEventListener("mousemove", function (e) {
      var dx = (e.clientX / window.innerWidth  - 0.5) * 18;
      var dy = (e.clientY / window.innerHeight - 0.5) * 12;
      hero.style.setProperty("--orb-x", dx.toFixed(2) + "px");
      hero.style.setProperty("--orb-y", dy.toFixed(2) + "px");
    }, { passive: true });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initReveal();
      initCursorLight();
      initCounters();
      initAmbientParallax();
    });
  } else {
    initReveal();
    initCursorLight();
    initCounters();
    initAmbientParallax();
  }
})();
