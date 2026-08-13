// =========================================================
// PsyGuide Homepage Search
// =========================================================

const homeSearchForm =
    document.querySelector("#homeSearchForm");

const homeSearch =
    document.querySelector("#homeSearch");


// =========================================================
// HOME SEARCH
// =========================================================

if (homeSearchForm && homeSearch) {

    homeSearchForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const query =
                homeSearch.value.trim();

            if (!query) {

                homeSearch.focus();

                return;
            }


            // Send the search term to the Search page

            window.location.href =
                `./search/?search=${encodeURIComponent(query)}`;

        }
    );

}