export default class CategoryList {
  constructor(dataSource, element) {
    this.dataSource = dataSource;
    this.element = element;
    this.categories = [];
  }

  async init() {
    // Loading message
    this.element.innerHTML = `
      <p class="empty">
        Loading categories...
      </p>
    `;

    this.categories = await this.dataSource.getCategories();
    this.render(this.categories);
  }

  render(categories) {
    this.element.innerHTML = "";

    if (categories.length === 0) {
      this.element.innerHTML = `
        <p class="empty">
          No categories found.
        </p>
      `;
      return;
    }

    categories.forEach((category) => {
      this.element.insertAdjacentHTML(
        "beforeend",
        this.cardTemplate(category)
      );
    });

    // Attach click and keyboard events
    this.attachEvents();
  }

  cardTemplate(category) {
    return `
      <article
        class="category-card"
        data-id="${category.id}"
        tabindex="0"
      >
        <div class="category-icon">
          ${category.icon}
        </div>

        <h2 class="category-title">
          ${category.title}
        </h2>

        <p class="category-description">
          ${category.description}
        </p>

        <button
          class="learn-more"
          data-id="${category.id}"
          aria-label="Learn more about ${category.title}"
        >
          Learn More →
        </button>
      </article>
    `;
  }

  filter(searchTerm) {
    const filtered = this.categories.filter((category) =>
      category.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    this.render(filtered);
  }

  attachEvents() {
    // Button click support
    const buttons = this.element.querySelectorAll(".learn-more");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;

        window.location.href = `../details/index.html?id=${id}`;
      });
    });

    // Keyboard accessibility
    const cards = this.element.querySelectorAll(".category-card");

    cards.forEach((card) => {
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const id = card.dataset.id;

          window.location.href = `../details/index.html?id=${id}`;
        }
      });
    });
  }
}
