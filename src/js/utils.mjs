export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Set paths after the header has been inserted into the page.
  const base = import.meta.env.BASE_URL;

  const homeLink = document.getElementById("site-home");
  const cartLink = document.getElementById("cart-link");
  const logo = document.getElementById("site-logo");

  if (homeLink) {
    homeLink.href = `${base}index.html`;
  }

  if (cartLink) {
    cartLink.href = `${base}cart/index.html`;
  }

  if (logo) {
    logo.src = `${base}images/noun_Tent_2517.svg`;
  }
}
