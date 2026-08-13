// =========================================================
// PsyGuide Search
// =========================================================

import SearchHistory from "./SearchHistory.js";
import SearchData from "./SearchData.js";


// =========================================================
// INITIALIZE
// =========================================================

const searchHistory = new SearchHistory();
const searchData = new SearchData();


// =========================================================
// DOM ELEMENTS
// =========================================================

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const suggestions =
    document.getElementById("searchSuggestions");

const results =
    document.getElementById("searchResults");

const historyContainer =
    document.getElementById("searchHistory");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// =========================================================
// RENDER SUGGESTIONS
// =========================================================

function renderSuggestions(items) {

    if (!suggestions) {
        return;
    }


    suggestions.innerHTML = "";


    if (!items.length) {

        suggestions.style.display = "none";

        return;

    }


    items.forEach(topic => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "suggestion-item";


        button.innerHTML = `

            <span
                class="suggestion-icon"
                aria-hidden="true">

                ${topic.icon || "🧠"}

            </span>

            <span>
                ${escapeHTML(topic.title)}
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                window.location.href =
                    `../details/index.html?id=${encodeURIComponent(topic.id)}`;

            }
        );


        suggestions.appendChild(button);

    });


    suggestions.style.display = "block";

}


// =========================================================
// RENDER RESULTS
// =========================================================

function renderResults(items) {

    if (!results) {
        return;
    }


    results.innerHTML = "";


    if (!items.length) {

        results.innerHTML = `

            <div class="no-results">

                <h3>
                    No topics found
                </h3>

                <p>
                    Try another keyword such as
                    Stress, Anxiety, Sleep, or Depression.
                </p>

            </div>

        `;

        return;

    }


    items.forEach(topic => {

        const card =
            document.createElement("article");


        card.className =
            "search-card";


        card.innerHTML = `

            <div class="search-card-header">

                <span
                    class="search-icon"
                    aria-hidden="true">

                    ${topic.icon || "🧠"}

                </span>

                <h3>
                    ${escapeHTML(topic.title)}
                </h3>

            </div>


            <p>
                ${escapeHTML(topic.description)}
            </p>


            <a
                class="read-more-btn"
                href="../details/index.html?id=${encodeURIComponent(topic.id)}">

                Read More

            </a>

        `;


        results.appendChild(card);

    });

}


// =========================================================
// RENDER SEARCH HISTORY
// =========================================================

function renderHistory() {

    if (!historyContainer) {
        return;
    }


    const history =
        searchHistory.getHistory();


    historyContainer.innerHTML = "";


    if (!history.length) {

        historyContainer.innerHTML = `

            <p class="placeholder">
                No recent searches.
            </p>

        `;

        return;

    }


    history.forEach(query => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "history-item";


        button.textContent =
            `🕒 ${query}`;


        button.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        query;

                    handleSearch();

                }

            }
        );


        historyContainer.appendChild(button);

    });

}


// =========================================================
// HANDLE SEARCH
// =========================================================

async function handleSearch() {

    if (!searchInput) {
        return;
    }


    const query =
        searchInput.value.trim();


    // Empty search

    if (!query) {

        if (suggestions) {
            suggestions.style.display =
                "none";
        }


        if (results) {

            results.innerHTML = `

                <p class="placeholder">
                    Start typing to search for a topic.
                </p>

            `;

        }

        return;

    }


    // Save search history

    if (query.length >= 2) {

        searchHistory.addSearch(query);

    }


    try {

        // Search topics

        const searchResults =
            await searchData.search(query);


        // Suggestions

        const suggestionResults =
            await searchData.getSuggestions(query);


        // Display

        renderResults(searchResults);

        renderSuggestions(
            suggestionResults
        );

        renderHistory();


    } catch (error) {

        console.error(
            "PsyGuide search error:",
            error
        );


        if (results) {

            results.innerHTML = `

                <div class="no-results">

                    <h3>
                        Search unavailable
                    </h3>

                    <p>
                        We could not load the search data.
                        Please try again.
                    </p>

                </div>

            `;

        }

    }

}


// =========================================================
// FORM SUBMIT
// =========================================================

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            handleSearch();

        }
    );

}


// =========================================================
// LIVE SEARCH
// =========================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        handleSearch
    );

}


// =========================================================
// CLEAR HISTORY
// =========================================================

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener(
        "click",
        () => {

            searchHistory.clearHistory();

            renderHistory();

        }
    );

}


// =========================================================
// HIDE SUGGESTIONS WHEN CLICKING OUTSIDE
// =========================================================

document.addEventListener(
    "click",
    event => {

        if (
            searchInput &&
            suggestions &&
            !searchInput.contains(event.target) &&
            !suggestions.contains(event.target)
        ) {

            suggestions.style.display =
                "none";

        }

    }
);


// =========================================================
// SHOW SUGGESTIONS ON FOCUS
// =========================================================

if (searchInput) {

    searchInput.addEventListener(
        "focus",
        () => {

            if (
                suggestions &&
                suggestions.children.length
            ) {

                suggestions.style.display =
                    "block";

            }

        }
    );

}


// =========================================================
// ESCAPE KEY
// =========================================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (suggestions) {

                    suggestions.style.display =
                        "none";

                }

            }

        }
    );

}


// =========================================================
// INITIALIZE FROM URL
// =========================================================

function initializeFromURL() {

    if (!searchInput) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const query =
        params.get("search");


    if (query) {

        searchInput.value =
            query;


        handleSearch();

    }

}


// =========================================================
// INITIALIZE
// =========================================================

renderHistory();

initializeFromURL();