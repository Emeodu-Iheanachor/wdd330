import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <img
        class="cart-card__image"
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />

      <a href="../product_pages/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>

      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key) || [];

    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);

    this.total = amounts.reduce((sum, item) => sum + item, 0);
  }

  renderCartContents(list) {
    const htmlItems = list.map(cartItemTemplate);

    document.querySelector(this.parentSelector).innerHTML =
      htmlItems.join("");

    document.querySelector(".list-total").innerText =
      `$${this.total.toFixed(2)}`;
  }
}
