// Query selector helper
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get all matching elements
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

  return await response.json();
}

// Render a list using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  data,
  callback
) {
  const html = data.map(templateFn).join("");
  parentElement.innerHTML = html;

  if (callback) {
    callback(parentElement);
  }
}

// Load header and footer partials
export async function loadHeaderFooter() {
  const header = qs("header");
  const footer = qs("footer");

  if (header) {
    const headerResponse = await fetch("/partials/header.html");
    header.innerHTML = await headerResponse.text();
  }

  if (footer) {
    const footerResponse = await fetch("/partials/footer.html");
    footer.innerHTML = await footerResponse.text();
  }
}
