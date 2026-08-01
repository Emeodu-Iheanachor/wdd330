/**
 * Shared utility functions for PsyGuide
 */

const BASE = import.meta.env.BASE_URL;

/**
 * Builds a path that works in development,
 * GitHub Pages, and Render.
 */
export function buildPath(path) {
  return `${BASE}${path}`;
}

/**
 * Loads a reusable HTML component.
 */
export async function loadComponent(selector, file) {
  try {
    const response = await fetch(buildPath(file));

    if (!response.ok) {
      throw new Error(`Unable to load ${file}`);
    }

    const html = await response.text();

    document.querySelector(selector).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Loads the shared header and footer.
 */
export async function loadHeaderFooter() {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");
}
