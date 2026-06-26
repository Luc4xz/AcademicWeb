const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id], footer[id]");
const themeToggle = document.querySelector(".theme-toggle");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

setTheme(getPreferredTheme());

function closeNavigation() {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
});

navItems.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));
