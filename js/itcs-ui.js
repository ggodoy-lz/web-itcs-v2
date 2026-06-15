(function () {
  "use strict";
  try { localStorage.removeItem("itcs-font"); } catch (e) {}

  // Resaltar item de menu de la pagina actual
  try {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (path.indexOf("producto-") === 0) path = "productos.html";
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
})();
