import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="${import.meta.env.BASE_URL}product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Store the values passed into the class
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Get the products for the selected category
    const list = await this.dataSource.getData(this.category);

    // Render the products
    this.renderList(list);

    // Set the page title
    const title = document.querySelector(".title");
    if (title) {
      title.textContent = this.category;
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
