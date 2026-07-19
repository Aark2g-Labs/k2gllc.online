const yearNode = document.getElementById("year");
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const siteIcon = document.getElementById("site-icon");
const appleTouchIcon = document.getElementById("apple-touch-icon");
const storedTheme = localStorage.getItem("k2g-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  themeMeta?.setAttribute("content", theme === "light" ? "#f3f7fb" : "#08111f");
  siteIcon?.setAttribute("href", theme === "light" ? "./k2gllc-light.png" : "./k2gllc-dark.png");
  appleTouchIcon?.setAttribute("href", theme === "light" ? "./k2gllc-light.png" : "./k2gllc-dark.png");
}

syncTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("k2g-theme", nextTheme);
  syncTheme(nextTheme);
});

function updateParallax() {
  if (reduceMotion.matches || window.innerWidth <= 760) {
    parallaxItems.forEach((item) => item.style.setProperty("--parallax-offset", "0px"));
    return;
  }

  const viewportCenter = window.innerHeight * 0.5;

  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height * 0.5;
    const distance = itemCenter - viewportCenter;
    const speed = Number(item.dataset.parallaxSpeed || 0.1);
    const offset = distance * speed * -0.18;
    item.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
  });
}

let parallaxFrame = null;

function queueParallax() {
  if (parallaxFrame !== null) return;
  parallaxFrame = window.requestAnimationFrame(() => {
    updateParallax();
    parallaxFrame = null;
  });
}

window.addEventListener("scroll", queueParallax, { passive: true });
window.addEventListener("resize", queueParallax);
reduceMotion.addEventListener?.("change", queueParallax);
queueParallax();

yearNode.textContent = new Date().getFullYear();
