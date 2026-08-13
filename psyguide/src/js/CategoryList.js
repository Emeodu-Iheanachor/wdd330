// =========================================================
// Category List
// =========================================================

export default class CategoryList {

    constructor(dataSource, element) {

        this.dataSource = dataSource;
        this.element = element;
        this.categories = [];
    }


    // =====================================================
    // Initialize
    // =====================================================

    async init() {

        if (!this.element) {
            console.error(
                "Category grid element was not found."
            );

            return;
        }


        this.element.innerHTML = `
            <p class="empty">
                Loading categories...
            </p>
        `;


        try {

            this.categories =
                await this.dataSource.getCategories();


            this.render(this.categories);

        } catch (error) {

            console.error(
                "Unable to load categories:",
                error
            );


            this.element.innerHTML = `
                <p class="empty">
                    Unable to load categories.
                </p>
            `;
        }
    }


    // =====================================================
    // Render Categories
    // =====================================================

    render(categories) {

        this.element.innerHTML = "";


        if (!Array.isArray(categories) || categories.length === 0) {

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


        this.attachEvents();
    }


    // =====================================================
    // Category Card Template
    // =====================================================

    cardTemplate(category) {

        return `
            <article
                class="card category-card"
                data-id="${category.id}"
                tabindex="0"
            >

                <div
                    class="card-icon category-icon"
                    aria-hidden="true">

                    ${category.icon || "🧠"}

                </div>


                <h2 class="category-title">
                    ${category.title}
                </h2>


                <p class="category-description">
                    ${category.description}
                </p>


                <button
                    type="button"
                    class="learn-more"
                    data-id="${category.id}"
                    aria-label="Learn more about ${category.title}"
                >
                    Learn More →
                </button>

            </article>
        `;
    }


    // =====================================================
    // Filter Categories
    // =====================================================

    filter(searchTerm) {

        const term =
            searchTerm.trim().toLowerCase();


        const filtered =
            this.categories.filter((category) => {

                const title =
                    String(category.title || "")
                        .toLowerCase();


                const description =
                    String(category.description || "")
                        .toLowerCase();


                return (
                    title.includes(term) ||
                    description.includes(term)
                );
            });


        this.render(filtered);
    }


    // =====================================================
    // Attach Events
    // =====================================================

    attachEvents() {

        const buttons =
            this.element.querySelectorAll(
                ".learn-more"
            );


        buttons.forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;


                    window.location.href =
                        `../details/index.html?id=${id}`;
                }
            );

        });


        // Keyboard accessibility

        const cards =
            this.element.querySelectorAll(
                ".category-card"
            );


        cards.forEach((card) => {

            card.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();


                        const id =
                            card.dataset.id;


                        window.location.href =
                            `../details/index.html?id=${id}`;
                    }
                }
            );

        });
    }
}
