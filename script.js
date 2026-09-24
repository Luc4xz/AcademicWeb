const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id], footer[id]");
const themeToggle = document.querySelector(".theme-toggle");

function getPreferredTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    // Theme switching still works when browser storage is unavailable.
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
let requestedTheme = document.documentElement.dataset.theme;
let isThemeTransitioning = false;

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

themeToggle?.addEventListener("click", async () => {
  requestedTheme = requestedTheme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", requestedTheme);
  } catch {
    // Saving a preference is optional; applying it is not.
  }

  // Finish the current circle before revealing the latest requested theme.
  if (isThemeTransitioning) return;
  isThemeTransitioning = true;
  const root = document.documentElement;

  try {
    while (root.dataset.theme !== requestedTheme) {
      const nextTheme = requestedTheme;
      if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTheme(nextTheme);
        continue;
      }

      const bounds = themeToggle.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const radius = Math.ceil(Math.hypot(
        Math.max(x, root.clientWidth - x),
        Math.max(y, root.clientHeight - y)
      )) + 2;
      root.style.setProperty("--theme-transition-x", `${x}px`);
      root.style.setProperty("--theme-transition-y", `${y}px`);
      root.style.setProperty("--theme-transition-radius", `${radius}px`);
      root.classList.add("theme-transition");

      let transition;
      try {
        transition = document.startViewTransition(() => setTheme(nextTheme));
        // CSS owns the entire reveal, including its first and last frames.
        await transition.ready;
        await transition.finished;
      } catch {
        transition?.skipTransition();
        setTheme(nextTheme);
      } finally {
        if (transition) await transition.finished.catch(() => {});
        root.classList.remove("theme-transition");
        root.style.removeProperty("--theme-transition-x");
        root.style.removeProperty("--theme-transition-y");
        root.style.removeProperty("--theme-transition-radius");
      }
    }
  } finally {
    isThemeTransitioning = false;
  }
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

const courseTableRows = Array.from(document.querySelectorAll(".course-table-row"));
const courseTableControls = document.querySelector(".course-table-controls");
const courseTablePages = document.querySelector("#course-table-pages");
const courseTablePrevious = document.querySelector("#course-table-prev");
const courseTableNext = document.querySelector("#course-table-next");

if (courseTableRows.length && courseTableControls && courseTablePages && courseTablePrevious && courseTableNext) {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(courseTableRows.length / rowsPerPage);
  let currentPage = 1;

  function renderCourseTable() {
    const firstVisibleRow = (currentPage - 1) * rowsPerPage;
    const lastVisibleRow = firstVisibleRow + rowsPerPage;

    courseTableRows.forEach((row, index) => {
      row.hidden = index < firstVisibleRow || index >= lastVisibleRow;
    });

    courseTablePages.replaceChildren();

    for (let page = 1; page <= totalPages; page += 1) {
      const pageButton = document.createElement("button");
      pageButton.className = page === currentPage ? "course-table-page is-active" : "course-table-page";
      pageButton.type = "button";
      pageButton.textContent = String(page);
      pageButton.setAttribute("aria-label", `Show table page ${page}`);

      if (page === currentPage) {
        pageButton.setAttribute("aria-current", "page");
      }

      pageButton.addEventListener("click", () => {
        currentPage = page;
        renderCourseTable();
      });

      courseTablePages.appendChild(pageButton);
    }

    courseTablePrevious.disabled = currentPage === 1;
    courseTableNext.disabled = currentPage === totalPages;
  }

  courseTablePrevious.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderCourseTable();
    }
  });

  courseTableNext.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderCourseTable();
    }
  });

  if (totalPages > 1) {
    courseTableControls.hidden = false;
  }

  renderCourseTable();
}
