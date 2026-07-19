const yearNode = document.getElementById("year");
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const storedTheme = localStorage.getItem("k2g-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

function syncTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  themeMeta?.setAttribute("content", theme === "light" ? "#f3f7fb" : "#08111f");
}

syncTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("k2g-theme", nextTheme);
  syncTheme(nextTheme);
});

yearNode.textContent = new Date().getFullYear();
