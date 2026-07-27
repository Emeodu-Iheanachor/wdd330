// Query selector helper
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Query selector all helper
export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// Get URL parameter
export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Local Storage helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Click helper
export function setClick(selector, callback) {
  const element = qs(selector);

  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  element.addEventListener("click", callback);
}

// Fetch JSON data
export async function loadData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}

// Render list with template
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(template);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Load header and footer
export async function loadHeaderFooter() {
  const header = qs("header");
  const footer = qs("footer");

  if (header) {
    const response = await fetch("/partials/header.html");
    header.innerHTML = await response.text();
  }

  if (footer) {
    const response = await fetch("/partials/footer.html");
    footer.innerHTML = await response.text();
  }
}
