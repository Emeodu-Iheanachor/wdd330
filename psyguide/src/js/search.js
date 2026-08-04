import SearchHistory from "./SearchHistory.js";
const searchHistory = new SearchHistory();

const historyContainer =
  document.getElementById("searchHistory");

const clearHistoryBtn =
  document.getElementById("clearHistoryBtn");


import SearchData from "./SearchData.js";

const searchData = new SearchData();

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const results = document.getElementById("searchResults");

/**
 * Escape HTML to prevent injection.
 */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render search suggestions.
 */
function renderSuggestions(items) {
  suggestions.innerHTML = "";

  if (!items.length) {
    suggestions.style.display = "none";
    return;
  }

  items.forEach((topic) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "suggestion-item";

    button.innerHTML = `
      <span class="suggestion-icon">${topic.icon}</span>
      <span>${escapeHTML(topic.title)}</span>
    `;

    button.addEventListener("click", () => {
      window.location.href =
        `../details/index.html?id=${topic.id}`;
    });

    suggestions.appendChild(button);
  });

  suggestions.style.display = "block";
}

/**
 * Render search results.
 */
function renderResults(items) {
  results.innerHTML = "";

  if (!items.length) {
    results.innerHTML = `
      <div class="no-results">

        <h3>No topics found</h3>

        <p>
          Try another keyword or phrase.
        </p>

      </div>
    `;

    return;
  }

  items.forEach((topic) => {
    const card = document.createElement("article");

    card.className = "search-card";

    card.innerHTML = `
      <div class="search-card-header">

        <span class="search-icon">
          ${topic.icon}
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
        href="../details/index.html?id=${topic.id}">
        Read More
      </a>
    `;

    results.appendChild(card);
  });
}


/**
 * Display recent searches.
 */
function renderHistory() {

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

  history.forEach((query) => {

    const button =
      document.createElement("button");

    button.className =
      "history-item";

    button.innerHTML = `
      🕒 ${query}
    `;

    button.addEventListener(
      "click",
      () => {

        searchInput.value = query;

        handleSearch();

      }
    );

    historyContainer.appendChild(button);

  });

}

/**
 * Handle user typing.
 */

async function handleSearch() {
  const query = searchInput.value.trim();

  if (query.length >= 2) {

  searchHistory.addSearch(query);

}

  if (!query) {
    suggestions.style.display = "none";

    results.innerHTML = `
      <p class="placeholder">
        Start typing to search...
      </p>
    `;

    return;
  }

  const searchResults =
    await searchData.search(query);

  const suggestionResults =
    await searchData.getSuggestions(query);

  renderResults(searchResults);

  renderSuggestions(suggestionResults);
  renderHistory();
}

clearHistoryBtn.addEventListener(
  "click",
  () => {

    searchHistory.clearHistory();

    renderHistory();

  }
);


/**
 * Hide suggestions when clicking outside.
 */
document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !suggestions.contains(event.target)
  ) {
    suggestions.style.display = "none";
  }
});

/**
 * Show suggestions again when the input gains focus.
 */
searchInput.addEventListener("focus", () => {
  if (suggestions.children.length) {
    suggestions.style.display = "block";
  }
});

/**
 * Live search.
 */
searchInput.addEventListener(
  "input",
  handleSearch
);

renderHistory();



/**
 * ESC closes suggestions.
 */
searchInput.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      suggestions.style.display = "none";
    }
  }
);
