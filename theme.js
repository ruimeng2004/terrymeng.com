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

function loadVisitorMap() {
  const widget = document.querySelector("#visitorWidget");
  if (!widget || document.querySelector("#mapmyvisitors")) return;

  widget.textContent = "";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "mapmyvisitors";
  script.src = "https://mapmyvisitors.com/map.js?d=gD9f9GRWeYa3bEvKVdi5JHo2NsGibYyhEa54VOa_Qj4&cl=ffffff&w=a";
  script.async = true;
  widget.appendChild(script);
}

if ("requestIdleCallback" in window) {
  requestIdleCallback(loadVisitorMap, { timeout: 3000 });
} else {
  window.addEventListener("load", () => window.setTimeout(loadVisitorMap, 1500));
}
