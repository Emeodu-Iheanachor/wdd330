import { loadHeaderFooter } from "./utils.js";
import CategoryData from "./CategoryData.js";
import CategoryList from "./CategoryList.js";

await loadHeaderFooter();

const categoryData = new CategoryData();

const grid = document.querySelector("#categoryGrid");

const categoryList = new CategoryList(
  categoryData,
  grid
);

await categoryList.init();

const search = document.querySelector("#categorySearch");

search.addEventListener("input", (event) => {

  categoryList.filter(event.target.value);

});
