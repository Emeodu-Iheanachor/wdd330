export default class CategoryList {
  constructor(dataSource, element) {
    this.dataSource = dataSource;
    this.element = element;

    this.categories = [];
  }

  async init() {
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
  }

  cardTemplate(category) {
    return `
    <article class="category-card">

        <div class="category-icon">

            ${category.icon}

        </div>

        <h2>

            ${category.title}

        </h2>

        <p>

            ${category.description}

        </p>

        <button
            class="learn-more"
            data-id="${category.id}"
        >
            Learn More →
        </button>

    </article>
    `;
  }

  filter(searchTerm) {
    const filtered = this.categories.filter((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.render(filtered);
  }
}
