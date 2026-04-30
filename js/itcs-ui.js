(function () {
  "use strict";

  var FONT_KEY = "itcs-font";

  function applyFont(id) {
    if (!id) return;
    document.documentElement.setAttribute("data-font", id);
    try { localStorage.setItem(FONT_KEY, id); } catch (e) {}
    var sel = document.getElementById("itcs-font-select");
    if (sel) sel.value = id;
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      var f = localStorage.getItem(FONT_KEY);
      if (f) applyFont(f);
    } catch (e) {}

    var btn = document.querySelector(".btn-itcs-theme");
    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);

    var sel = document.getElementById("itcs-font-select");
    if (sel) {
      sel.addEventListener("change", function () { applyFont(sel.value); });
    }
  });
})();
