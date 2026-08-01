async function loadComponent(selector, path) {
  const response = await fetch(path);
  const html = await response.text();
  document.querySelector(selector).innerHTML = html;
}

await loadComponent("header", "/components/header.html");
await loadComponent("footer", "/components/footer.html");
