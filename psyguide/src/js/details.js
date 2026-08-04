import TopicData from "./TopicData.js";

const topicData = new TopicData();

/**
 * Read a query parameter from the URL.
 *
 * Example:
 * details/index.html?id=anxiety
 */
function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Populate a list from an array.
 */
function populateList(elementId, items = []) {
  const element = document.getElementById(elementId);

  if (!element) return;

  element.innerHTML = "";

  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = "No information available.";
    element.appendChild(li);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

/**
 * Show loading screen.
 */
function showLoader() {
  document
    .getElementById("loadingScreen")
    ?.classList.remove("hidden");
}

/**
 * Hide loading screen.
 */
function hideLoader() {
  document
    .getElementById("loadingScreen")
    ?.classList.add("hidden");
}

/**
 * Display an error message.
 */
function showError() {
  const main = document.querySelector("main");

  if (!main) return;

  main.innerHTML = `
    <section class="error-message">
      <h2>Topic Not Found</h2>

      <p>
        Sorry, the topic you're looking for doesn't exist.
      </p>

      <a href="../categories/index.html">
        Back to Categories
      </a>
    </section>
  `;
}

/**
 * Favorite, Share, and Back buttons.
 */
function setupButtons(topic) {
  // Back button
  const backBtn = document.getElementById("backBtn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../categories/index.html";
    });
  }

  // Share button
  const shareBtn = document.getElementById("shareBtn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: topic.title,
            text: topic.description,
            url: window.location.href,
          });
        } catch (error) {
          console.log("Share cancelled:", error);
        }
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(
            window.location.href
          );

          alert("Link copied to clipboard.");
        } catch (error) {
          console.error(
            "Could not copy link:",
            error
          );
        }
      } else {
        alert("Sharing is not supported on this browser.");
      }
    });
  }

  // Favorite button
  const favoriteBtn =
    document.getElementById("favoriteBtn");

  if (favoriteBtn) {
    let favorites =
      JSON.parse(
        localStorage.getItem("psyguideFavorites")
      ) || [];

    // Show current favorite status
    if (favorites.includes(topic.id)) {
      favoriteBtn.textContent =
        "❤️ Remove from Favorites";
    } else {
      favoriteBtn.textContent =
        "♡ Add to Favorites";
    }

    favoriteBtn.addEventListener("click", () => {
      favorites =
        JSON.parse(
          localStorage.getItem("psyguideFavorites")
        ) || [];

      if (favorites.includes(topic.id)) {
        // Remove favorite
        favorites = favorites.filter(
          (favoriteId) => favoriteId !== topic.id
        );

        localStorage.setItem(
          "psyguideFavorites",
          JSON.stringify(favorites)
        );

        favoriteBtn.textContent =
          "♡ Add to Favorites";
      } else {
        // Add favorite
        favorites.push(topic.id);

        localStorage.setItem(
          "psyguideFavorites",
          JSON.stringify(favorites)
        );

        favoriteBtn.textContent =
          "❤️ Remove from Favorites";
      }
    });
  }
}

/**
 * Display related topics from the same category.
 */
async function loadRelatedTopics(currentTopic) {
  const container =
    document.getElementById("relatedTopics");

  if (!container) return;

  try {
    const topics =
      await topicData.getTopicsByCategory(
        currentTopic.category
      );

    const related = topics.filter(
      (topic) => topic.id !== currentTopic.id
    );

    container.innerHTML = "";

    if (!related.length) {
      container.innerHTML =
        "<p>No related topics available.</p>";

      return;
    }

    related.forEach((topic) => {
      const card =
        document.createElement("div");

      card.className = "related-card";

      card.innerHTML = `
        <h3>
          ${topic.icon || "🧠"}
          ${topic.title}
        </h3>

        <p>
          ${topic.description}
        </p>

        <a
          href="../details/index.html?id=${topic.id}"
        >
          Read More
        </a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error(
      "Unable to load related topics:",
      error
    );

    container.innerHTML =
      "<p>Unable to load related topics.</p>";
  }
}

/**
 * Display topic information on the page.
 */
async function loadTopic() {
  showLoader();

  try {
    const id = getParam("id");

    if (!id) {
      showError();
      return;
    }

    const topic =
      await topicData.getTopicById(id);

    if (!topic) {
      showError();
      return;
    }

    // Page title
    document.title =
      `PsyGuide | ${topic.title}`;

    // Breadcrumb
    const breadcrumbTitle =
      document.getElementById(
        "breadcrumbTitle"
      );

    if (breadcrumbTitle) {
      breadcrumbTitle.textContent =
        topic.title;
    }

    // Topic title
    const topicTitle =
      document.getElementById("topicTitle");

    if (topicTitle) {
      topicTitle.textContent =
        topic.title;
    }

    // Topic description
    const topicDescription =
      document.getElementById(
        "topicDescription"
      );

    if (topicDescription) {
      topicDescription.textContent =
        topic.description;
    }

    // Topic icon
    const topicIcon =
      document.getElementById("topicIcon");

    if (topicIcon) {
      topicIcon.textContent =
        topic.icon || "🧠";
    }

    // Definition
    const definition =
      document.getElementById("definition");

    if (definition) {
      definition.textContent =
        topic.definition ||
        "No definition available.";
    }

    // Symptoms
    populateList(
      "symptoms",
      topic.symptoms
    );

    // Causes
    populateList(
      "causes",
      topic.causes
    );

    // Treatment
    populateList(
      "treatment",
      topic.treatment
    );

    // Prevention
    populateList(
      "prevention",
      topic.prevention
    );

    // Resources
    populateList(
      "resources",
      topic.resources
    );

    // Buttons
    setupButtons(topic);

    // Related topics
    await loadRelatedTopics(topic);
  } catch (error) {
    console.error(
      "Error loading topic:",
      error
    );

    showError();
  } finally {
    hideLoader();
  }
}

/**
 * Start the Details page.
 */
loadTopic();
