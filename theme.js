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

const visitorLoadButton = document.querySelector(".visitor-load");

if (visitorLoadButton) {
  visitorLoadButton.addEventListener("click", () => {
    const widget = visitorLoadButton.closest(".visitor-map").querySelector(".visitor-widget");
    const frame = document.createElement("iframe");
    frame.className = "visitor-frame";
    frame.title = "MapMyVisitors visitor map";
    frame.src = visitorLoadButton.dataset.visitorSrc;
    widget.replaceChildren(frame);
    visitorLoadButton.remove();
  });
}
