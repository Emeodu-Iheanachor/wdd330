import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

const title = document.querySelector(".title");

if (title && category) {
  title.textContent = `Top Products: ${category
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())}`;
}
