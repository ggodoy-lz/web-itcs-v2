(function () {
  "use strict";
  try { localStorage.removeItem("itcs-font"); } catch (e) {}

  // Resaltar item de menu de la pagina actual
  try {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (path.indexOf("producto-") === 0) path = "productos.html";
    if (path.indexOf("soluciones-") === 0) path = "services.html";
    var map = {
      "": "index.html",
      "index.html": "index.html",
      "about.html": "about.html",
      "certificaciones.html": "about.html",
      "politicas.html": "about.html",
      "services.html": "services.html",
      "productos.html": "productos.html",
      "industrias.html": "industrias.html",
      "soporte.html": "soporte.html"
    };
    var target = map[path];
    if (target) {
      var link = document.querySelector('#mainmenu a.menu-item[href="' + target + '"]');
      if (link && link.parentElement) link.parentElement.classList.add("active");
    }
  } catch (e) {}

  // Botón "Ir arriba" circular (abajo-derecha), no se superpone al contenido
  try {
    var btt = document.createElement("a");
    btt.id = "back-to-top";
    btt.href = "#top";
    btt.setAttribute("aria-label", "Ir arriba");
    document.body.appendChild(btt);
    btt.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    var togBtt = function () { btt.classList.toggle("show", window.scrollY > 400); };
    window.addEventListener("scroll", togBtt, { passive: true });
    togBtt();
  } catch (e) {}

  // Boton "Más información": revela la seccion de informacion detallada
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".itcs-moreinfo-btn");
    if (!b) return;
    e.preventDefault();
    var sec = document.getElementById("info-completa");
    if (!sec) return;
    sec.hidden = false;
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // "Información detallada": índice lateral + scrollspy
  try {
    document.querySelectorAll(".itcs-info-full").forEach(function (full) {
      var all = Array.prototype.slice.call(full.children).filter(function (b) {
        return b.classList.contains("itcs-info-block");
      });
      var blocks = all.slice(1).filter(function (b) { return b.querySelector(".itcs-info-h"); }); // saltar intro (ya se muestra arriba)
      if (blocks.length < 2) return;
      var nav = document.createElement("nav");
      nav.className = "itcs-info-nav";
      nav.setAttribute("aria-label", "Índice");
      var inner = document.createElement("div");
      inner.className = "itcs-info-nav-inner";
      nav.appendChild(inner);
      var content = document.createElement("div");
      content.className = "itcs-info-content";
      var links = [];
      blocks.forEach(function (b, i) {
        var h = b.querySelector(".itcs-info-h");
        var id = "sec-" + i + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9áéíóúñ]+/g, "-").slice(0, 28).replace(/-+$/, "");
        b.id = id;
        content.appendChild(b);
        var a = document.createElement("a");
        a.href = "#" + id;
        a.className = "itcs-info-nav-link";
        a.textContent = h.textContent;
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          var y = b.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
        });
        inner.appendChild(a);
        links.push({ a: a, b: b });
      });
      full.innerHTML = "";
      full.appendChild(nav);
      full.appendChild(content);
      var spy = function () {
        var y = window.scrollY + 130, cur = links[0];
        links.forEach(function (l) {
          if (l.b.getBoundingClientRect().top + window.scrollY <= y) cur = l;
        });
        links.forEach(function (l) { l.a.classList.toggle("active", l === cur); });
      };
      window.addEventListener("scroll", spy, { passive: true });
      spy();
    });
  } catch (e) {}
})();
