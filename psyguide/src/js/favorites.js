// =========================================================
// PsyGuide Favorites
// =========================================================

import FavoritesData from "./FavoritesData.js";


// =========================================================
// Favorites Data
// =========================================================

const favoritesData = new FavoritesData();


// =========================================================
// Favorites Container
// =========================================================

const container =
    document.getElementById("favoritesContainer");


// Stop if the container does not exist
if (!container) {

    console.error(
        "Favorites container was not found."
    );

} else {


// =========================================================
// Empty Favorites State
// =========================================================

function renderEmptyState() {

    container.innerHTML = `

        <div class="empty-favorites">

            <h3>
                No Favorites Yet
            </h3>

            <p>
                You haven't added any mental wellness
                topics to your favorites.
            </p>

            <a
                class="browse-topics"
                href="../categories/index.html">

                Browse Topics

            </a>

        </div>

    `;
}


// =========================================================
// Create Favorite Card
// =========================================================

function createCard(topic) {

    const card =
        document.createElement("article");


    card.className =
        "favorite-card";


    card.innerHTML = `

        <div class="favorite-header">


            <div
                class="card-icon"
                aria-hidden="true">

                ${topic.icon || "🧠"}

            </div>


            <div>

                <h3>
                    ${topic.title}
                </h3>

                <p>
                    ${topic.description}
                </p>

            </div>


        </div>


        <div class="favorite-actions">


            <a
                class="favorite-view"
                href="../details/index.html?id=${topic.id}">

                View Details

            </a>


            <button
                type="button"
                class="remove-favorite"
                data-id="${topic.id}"
                aria-label="Remove ${topic.title} from favorites">

                Remove

            </button>


        </div>

    `;


    return card;
}


// =========================================================
// Render Favorites
// =========================================================

async function renderFavorites() {

    try {


        // ---------------------------------------------
        // Loading State
        // ---------------------------------------------

        container.innerHTML = `

            <p class="loading">
                Loading favorites...
            </p>

        `;


        // ---------------------------------------------
        // Get Favorites
        // ---------------------------------------------

        const favorites =
            await favoritesData.getFavorites();


        // ---------------------------------------------
        // Empty State
        // ---------------------------------------------

        if (!favorites.length) {

            renderEmptyState();

            return;
        }


        // ---------------------------------------------
        // Clear Loading Message
        // ---------------------------------------------

        container.innerHTML = "";


        // ---------------------------------------------
        // Create Favorite Cards
        // ---------------------------------------------

        favorites.forEach((topic) => {

            container.appendChild(
                createCard(topic)
            );

        });


        // ---------------------------------------------
        // Add Remove Events
        // ---------------------------------------------

        attachEvents();


    } catch (error) {

        console.error(
            "Unable to load favorites:",
            error
        );


        container.innerHTML = `

            <div class="empty-favorites">

                <h3>
                    Unable to Load Favorites
                </h3>

                <p>
                    We couldn't load your saved topics.
                    Please try again later.
                </p>

                <a
                    class="browse-topics"
                    href="../categories/index.html">

                    Browse Topics

                </a>

            </div>

        `;
    }
}


// =========================================================
// Remove Favorite Events
// =========================================================

function attachEvents() {

    const removeButtons =
        container.querySelectorAll(
            ".remove-favorite"
        );


    removeButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;


                favoritesData.removeFavorite(id);


                renderFavorites();

            }
        );

    });
}


// =========================================================
// Initialize Favorites Page
// =========================================================

renderFavorites();

}
