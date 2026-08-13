// =========================================================
// Categories Page
// =========================================================

import CategoryData from "./CategoryData.js";
import CategoryList from "./CategoryList.js";


// =========================================================
// Initialize Category Data
// =========================================================

const categoryData = new CategoryData();


// =========================================================
// Category Grid
// =========================================================

const grid =
    document.querySelector("#categoryGrid");


// =========================================================
// Category List
// =========================================================

const categoryList =
    new CategoryList(
        categoryData,
        grid
    );


// =========================================================
// Initialize Categories
// =========================================================

await categoryList.init();


// =========================================================
// Category Search
// =========================================================

const search =
    document.querySelector("#categorySearch");


if (search) {

    search.addEventListener(
        "input",
        (event) => {

            categoryList.filter(
                event.target.value
            );

        }
    );
}
