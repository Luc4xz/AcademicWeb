const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id], footer[id]");
const themeToggle = document.querySelector(".theme-toggle");
let isThemeTransitioning = false;

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

themeToggle?.addEventListener("click", (event) => {
  if (isThemeTransitioning) {
    return;
  }

  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  const applyTheme = () => {
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme();
    return;
  }

  const toggleBounds = event.currentTarget.getBoundingClientRect();
  const originX = toggleBounds.left + toggleBounds.width / 2;
  const originY = toggleBounds.top + toggleBounds.height / 2;
  const revealRadius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );

  isThemeTransitioning = true;
  document.documentElement.classList.add("theme-transition");

  const transition = document.startViewTransition(applyTheme);

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0 at ${originX}px ${originY}px)`,
            `circle(${revealRadius}px at ${originX}px ${originY}px)`
          ]
        },
        {
          duration: 800,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    })
    .catch(() => {});

  transition.finished.finally(() => {
    isThemeTransitioning = false;
    document.documentElement.classList.remove("theme-transition");
  });
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
