import TopicData from "./TopicData.js";

const topicData = new TopicData();

/**
 * Read a query parameter from the URL.
 * Example:
 * details.html?id=anxiety
 */
function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Populate a list (<ul>) from an array.
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
 * Display topic information on the page.
 */
async function loadTopic() {
  const id = getParam("id");

  if (!id) {
    document.getElementById("topicTitle").textContent = "Topic Not Found";
    return;
  }

  const topic = await topicData.getTopicById(id);

  if (!topic) {
    document.getElementById("topicTitle").textContent = "Topic Not Found";
    document.getElementById("topicDescription").textContent =
      "The requested topic does not exist.";
    return;
  }

  // Header
  document.title = `PsyGuide | ${topic.title}`;
  document.getElementById("breadcrumbTitle").textContent = topic.title;
  document.getElementById("topicTitle").textContent = topic.title;
  document.getElementById("topicDescription").textContent = topic.description;
  document.getElementById("topicIcon").textContent = topic.icon || "🧠";

  // Sections
  document.getElementById("definition").textContent = topic.definition;

  populateList("symptoms", topic.symptoms);
  populateList("causes", topic.causes);
  populateList("treatment", topic.treatment);
  populateList("prevention", topic.prevention);
  populateList("resources", topic.resources);

  setupButtons(topic);
}

/**
 * Favorite, Share and Back buttons.
 */
function setupButtons(topic) {
  // Back
  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "../categories/index.html";
  });

  // Share
  document.getElementById("shareBtn").addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: topic.title,
          text: topic.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard.");
    }
  });

  // Favorites
  const favoriteBtn = document.getElementById("favoriteBtn");

  favoriteBtn.addEventListener("click", () => {
    let favorites =
      JSON.parse(localStorage.getItem("psyguideFavorites")) || [];

    if (!favorites.includes(topic.id)) {
      favorites.push(topic.id);
      localStorage.setItem(
        "psyguideFavorites",
        JSON.stringify(favorites)
      );

      favoriteBtn.textContent = "❤️ Added to Favorites";
    } else {
      alert("This topic is already in your favorites.");
    }
  });
}

loadTopic();
