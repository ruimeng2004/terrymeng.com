const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
  localStorage.setItem("theme", theme);
}

setTheme(storedTheme || (systemPrefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function loadVisitorGlobe() {
  const widget = document.querySelector("#visitorWidget");
  if (!widget || document.querySelector("#mmvst_globe")) return;

  widget.textContent = "";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "mmvst_globe";
  script.src = "https://mapmyvisitors.com/globe.js?d=OukS6xK1R9fKhjOz-oGH6oM6sh-_NEj8mvlJ8hKmIkA";
  script.async = true;
  widget.appendChild(script);
}

if ("requestIdleCallback" in window) {
  requestIdleCallback(loadVisitorGlobe, { timeout: 3000 });
} else {
  window.addEventListener("load", () => window.setTimeout(loadVisitorGlobe, 1500));
}
