import FavoritesData from "./FavoritesData.js";

const favoritesData = new FavoritesData();
const container = document.getElementById("favoritesContainer");

/**
 * Display a friendly message when there are no favorites.
 */
function renderEmptyState() {
  container.innerHTML = `
    <div class="empty-state">
      <h2>No Favorites Yet</h2>
      <p>
        You haven't added any mental health topics to your favorites.
      </p>

      <a class="browse-btn" href="../categories/index.html">
        Browse Topics
      </a>
    </div>
  `;
}

/**
 * Create a single favorite card.
 */
function createCard(topic) {
  const card = document.createElement("article");
  card.className = "favorite-card";

  card.innerHTML = `
    <div class="favorite-header">
      <span class="favorite-icon">${topic.icon}</span>

      <div>
        <h2>${topic.title}</h2>
        <p>${topic.description}</p>
      </div>
    </div>

    <div class="favorite-actions">

      <a
        class="view-btn"
        href="../details/index.html?id=${topic.id}">
        View Details
      </a>

      <button
        class="remove-btn"
        data-id="${topic.id}">
        Remove
      </button>

    </div>
  `;

  return card;
}

/**
 * Render all favorites.
 */
async function renderFavorites() {
  const favorites = await favoritesData.getFavorites();

  container.innerHTML = "";

  if (!favorites.length) {
    renderEmptyState();
    return;
  }

  favorites.forEach((topic) => {
    container.appendChild(createCard(topic));
  });

  attachEvents();
}

/**
 * Handle remove buttons.
 */
function attachEvents() {
  const removeButtons =
    document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      favoritesData.removeFavorite(id);

      renderFavorites();
    });
  });
}

renderFavorites();
