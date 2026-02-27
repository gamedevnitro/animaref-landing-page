/* ============================================
   AnimaRef - Main JavaScript
   ============================================ */

(function () {
  "use strict";

  // --- Theme Toggle ---
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem("animaref-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("animaref-theme", theme);
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  applyTheme(getPreferredTheme());

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // --- Language Toggle ---
  const langBtn = document.getElementById("lang-toggle");

  function getPreferredLang() {
    var stored = localStorage.getItem("animaref-lang");
    if (stored) return stored;
    return "en";
  }

  function applyLang(lang) {
    root.setAttribute("data-active-lang", lang);
    localStorage.setItem("animaref-lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    if (langBtn) langBtn.textContent = lang === "en" ? "PT" : "EN";
  }

  applyLang(getPreferredLang());

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-active-lang");
      applyLang(current === "en" ? "pt" : "en");
    });
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length > 0 && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // --- Dynamic Year ---
  var yearEls = document.querySelectorAll(".current-year");
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });
})();
