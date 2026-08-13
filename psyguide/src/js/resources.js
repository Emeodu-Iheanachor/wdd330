// =========================================================
// PsyGuide Resources
// =========================================================


// =========================================================
// Vite Base URL
// =========================================================

const baseURL = import.meta.env.BASE_URL;


// =========================================================
// DOM ELEMENTS
// =========================================================

const resourcesContainer =
    document.querySelector("#resourcesContainer");

const resourceSearch =
    document.querySelector("#resourceSearch");

const resourceCategory =
    document.querySelector("#resourceCategory");

const resourceCount =
    document.querySelector("#resourceCount");

const clearResourceSearch =
    document.querySelector("#clearResourceSearch");


// =========================================================
// RESOURCE DATA
// =========================================================

let resources = [];


// =========================================================
// NORMALIZE TEXT
// =========================================================

function normalizeText(text) {

    return String(text || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


// =========================================================
// LOAD RESOURCES
// =========================================================

async function loadResources() {

    if (!resourcesContainer) {
        return;
    }

    try {

        resourcesContainer.innerHTML = `
            <p class="resources-loading">
                Loading mental wellness resources...
            </p>
        `;


        // =====================================================
        // LOAD JSON USING VITE BASE URL
        // =====================================================

        const response =
            await fetch(
                `${baseURL}data/resources.json`
            );


        if (!response.ok) {

            throw new Error(
                `Unable to load resources: ${response.status}`
            );

        }


        resources =
            await response.json();


        // =====================================================
        // CREATE CATEGORY OPTIONS
        // =====================================================

        createCategoryOptions();


        // =====================================================
        // DISPLAY ALL RESOURCES
        // =====================================================

        displayResources(resources);


        // =====================================================
        // UPDATE CLEAR BUTTON
        // =====================================================

        updateClearButton();

    } catch (error) {

        console.error(
            "Resource loading error:",
            error
        );


        resourcesContainer.innerHTML = `
            <div class="resources-error">

                <h2>
                    Unable to Load Resources
                </h2>

                <p>
                    We could not load the PsyGuide
                    resource information at this time.
                    Please try again later.
                </p>

            </div>
        `;


        updateResourceCount(0);

    }

}


// =========================================================
// CREATE CATEGORY OPTIONS
// =========================================================

function createCategoryOptions() {

    if (!resourceCategory) {
        return;
    }


    const categories =
        [
            ...new Set(
                resources
                    .map(resource => resource.category)
                    .filter(Boolean)
            )
        ].sort();


    resourceCategory.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value = category;

        option.textContent = category;


        resourceCategory.appendChild(option);

    });

}


// =========================================================
// DISPLAY RESOURCES
// =========================================================

function displayResources(resourceList) {

    if (!resourcesContainer) {
        return;
    }


    // =====================================================
    // NO RESULTS
    // =====================================================

    if (resourceList.length === 0) {

        resourcesContainer.innerHTML = `
            <div class="resources-empty">

                <h2>
                    No Resources Found
                </h2>

                <p>
                    Try a different search term
                    or category.
                </p>

            </div>
        `;


        updateResourceCount(0);

        return;
    }


    // =====================================================
    // DISPLAY RESOURCE CARDS
    // =====================================================

    resourcesContainer.innerHTML =
        resourceList
            .map(resource =>
                createResourceCard(resource)
            )
            .join("");


    // =====================================================
    // UPDATE COUNT
    // =====================================================

    updateResourceCount(
        resourceList.length
    );

}


// =========================================================
// CREATE RESOURCE CARD
// =========================================================

function createResourceCard(resource) {

    const name =
        resource.name ||
        "Unnamed Resource";


    const category =
        resource.category ||
        "Resource";


    const description =
        resource.description ||
        "No description available.";


    const website =
        resource.website ||
        "";


    return `
        <article class="resource-card">

            <span class="resource-category">
                ${category}
            </span>


            <h2>
                ${name}
            </h2>


            <p class="resource-description">
                ${description}
            </p>


            ${
                website
                    ? `
                        <a
                            class="resource-link"
                            href="${website}"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit ${name} website">

                            Visit Website

                        </a>
                    `
                    : ""
            }

        </article>
    `;

}


// =========================================================
// UPDATE RESOURCE COUNT
// =========================================================

function updateResourceCount(count) {

    if (!resourceCount) {
        return;
    }


    resourceCount.textContent =
        `${count} resource${count === 1 ? "" : "s"} found`;

}


// =========================================================
// UPDATE CLEAR BUTTON
// =========================================================

function updateClearButton() {

    if (!clearResourceSearch) {
        return;
    }


    const hasSearch =
        resourceSearch &&
        resourceSearch.value.trim() !== "";


    const hasCategory =
        resourceCategory &&
        resourceCategory.value !== "all";


    clearResourceSearch.hidden =
        !(hasSearch || hasCategory);

}


// =========================================================
// FILTER RESOURCES
// =========================================================

function filterResources() {

    const searchTerm =
        resourceSearch
            ? normalizeText(
                resourceSearch.value
            )
            : "";


    const selectedCategory =
        resourceCategory
            ? resourceCategory.value
            : "all";


    // =====================================================
    // SEARCH MODE
    // =====================================================

    // When the user searches, search ALL resources.
    // This prevents a previously selected category from
    // blocking a valid search result.

    if (searchTerm !== "") {

        const searchResults =
            resources.filter(resource => {

                const searchableText =
                    normalizeText(
                        [
                            resource.name,
                            resource.category,
                            resource.description,
                            resource.website
                        ]
                            .filter(Boolean)
                            .join(" ")
                    );


                return searchableText.includes(
                    searchTerm
                );

            });


        displayResources(
            searchResults
        );


        updateClearButton();

        return;

    }


    // =====================================================
    // CATEGORY MODE
    // =====================================================

    const categoryResults =
        resources.filter(resource => {

            return (
                selectedCategory === "all" ||
                normalizeText(
                    resource.category
                ) ===
                normalizeText(
                    selectedCategory
                )
            );

        });


    displayResources(
        categoryResults
    );


    updateClearButton();

}


// =========================================================
// SEARCH EVENT
// =========================================================

if (resourceSearch) {

    resourceSearch.addEventListener(
        "input",
        filterResources
    );

}


// =========================================================
// CATEGORY EVENT
// =========================================================

if (resourceCategory) {

    resourceCategory.addEventListener(
        "change",
        filterResources
    );

}


// =========================================================
// CLEAR SEARCH AND FILTERS
// =========================================================

if (clearResourceSearch) {

    clearResourceSearch.addEventListener(
        "click",
        () => {

            // Clear search

            if (resourceSearch) {

                resourceSearch.value = "";

            }


            // Reset category

            if (resourceCategory) {

                resourceCategory.value = "all";

            }


            // Display all resources

            displayResources(
                resources
            );


            // Hide clear button

            updateClearButton();


            // Return focus to search

            if (resourceSearch) {

                resourceSearch.focus();

            }

        }
    );

}


// =========================================================
// INITIALIZE
// =========================================================

loadResources();
