(function () {
  "use strict";

  var THEME_KEY = "itcs-theme";
  var FONT_KEY = "itcs-font";

  function syncThemeButton() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var btn = document.querySelector(".btn-itcs-theme");
    if (btn) {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.textContent = dark ? "Claro" : "Oscuro";
    }
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    syncThemeButton();
  }

  function applyFont(id) {
    if (!id) return;
    document.documentElement.setAttribute("data-font", id);
    try {
      localStorage.setItem(FONT_KEY, id);
    } catch (e) {}
    var sel = document.getElementById("itcs-font-select");
    if (sel) sel.value = id;
  }

  function initFromStorage() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      if (t === "dark") applyTheme("dark");
      else if (t === "light") document.documentElement.removeAttribute("data-theme");
      var f = localStorage.getItem(FONT_KEY);
      if (f) applyFont(f);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFromStorage();
    syncThemeButton();

    var btn = document.querySelector(".btn-itcs-theme");
    if (btn) {
      btn.addEventListener("click", function () {
        var dark = document.documentElement.getAttribute("data-theme") === "dark";
        applyTheme(dark ? "light" : "dark");
      });
    }

    var sel = document.getElementById("itcs-font-select");
    if (sel) {
      sel.addEventListener("change", function () {
        applyFont(sel.value);
      });
    }
  });
})();
