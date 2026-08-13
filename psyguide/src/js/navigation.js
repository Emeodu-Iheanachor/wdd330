const header = document.querySelector("header");

const baseURL = import.meta.env.BASE_URL;

if (header) {
  header.innerHTML = `
    <!-- Logo -->
    <a
      href="${baseURL}"
      class="logo"
      aria-label="PsyGuide Home"
    >
      <img
        src="${baseURL}images/logo.jpg"
        alt=""
        class="logo-image"
      >

      <span class="logo-text">
        PsyGuide
      </span>
    </a>

    <!-- Mobile Menu Button -->
    <button
      class="menu-toggle"
      type="button"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="main-navigation"
    >
      ☰
    </button>

    <!-- Main Navigation -->
    <nav
      id="main-navigation"
      class="main-nav"
      aria-label="Main navigation"
    >
      <a href="${baseURL}">
        Home
      </a>

      <a href="${baseURL}categories/">
        Categories
      </a>

      <a href="${baseURL}search/">
        Search
      </a>

      <a href="${baseURL}favorites/">
        Favorites
      </a>

      <a href="${baseURL}resources/">
        Resources
      </a>

      <a href="${baseURL}about/">
        About
      </a>

      <a href="${baseURL}profile/">
        Profile
      </a>
    </nav>
  `;

  // =========================================
  // Mobile Navigation
  // =========================================

  const menuToggle = header.querySelector(".menu-toggle");
  const navigation = header.querySelector(".main-nav");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });
  }

  // =========================================
  // Highlight Current Page
  // =========================================

  if (navigation) {
    const currentPath = window.location.pathname;

    const navigationLinks =
      navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
      const linkURL = new URL(link.href);

      let linkPath = linkURL.pathname;
      let normalizedCurrentPath = currentPath;

      // Normalize current page path
      if (
        normalizedCurrentPath !== "/" &&
        !normalizedCurrentPath.endsWith("/")
      ) {
        normalizedCurrentPath += "/";
      }

      // Normalize navigation link path
      if (
        linkPath !== "/" &&
        !linkPath.endsWith("/")
      ) {
        linkPath += "/";
      }

      // Highlight current page
      if (linkPath === normalizedCurrentPath) {
        link.classList.add("active");

        link.setAttribute(
          "aria-current",
          "page"
        );
      }
    });
  }
}

