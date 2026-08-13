// =========================================================
// Category Data
// =========================================================

export default class CategoryData {

    constructor(
        dataUrl = `${import.meta.env.BASE_URL}data/topics.json`
    ) {

        this.dataUrl = dataUrl;
    }


    // =====================================================
    // Get Categories
    // =====================================================

    async getCategories() {

        try {

            const response =
                await fetch(this.dataUrl);


            if (!response.ok) {

                throw new Error(
                    `Failed to load categories: ${response.status}`
                );
            }


            const categories =
                await response.json();


            return Array.isArray(categories)
                ? categories
                : categories.categories || [];

        } catch (error) {

            console.error(
                "Unable to load categories:",
                error
            );


            return [];
        }
    }
}
