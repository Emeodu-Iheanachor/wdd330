// =========================================================
// Favorites Data
// =========================================================

export default class FavoritesData {

    constructor(
        dataUrl = `${import.meta.env.BASE_URL}data/topics.json`
    ) {

        this.dataUrl = dataUrl;

        this.storageKey = "psyguideFavorites";
    }


    // =====================================================
    // Load All Topics
    // =====================================================

    async getTopics() {

        const response =
            await fetch(this.dataUrl);


        if (!response.ok) {

            throw new Error(
                `Failed to load topics from ${this.dataUrl} (${response.status})`
            );
        }


        const topics =
            await response.json();


        if (!Array.isArray(topics)) {

            throw new Error(
                "topics.json must contain an array of topics."
            );
        }


        return topics;
    }


    // =====================================================
    // Get Favorite Topic IDs
    // =====================================================

    getFavoriteIds() {

        try {

            const storedFavorites =
                localStorage.getItem(
                    this.storageKey
                );


            if (!storedFavorites) {
                return [];
            }


            const ids =
                JSON.parse(storedFavorites);


            if (!Array.isArray(ids)) {

                console.warn(
                    "Favorite storage is not an array."
                );

                return [];
            }


            return ids.map((id) =>
                String(id)
            );

        } catch (error) {

            console.error(
                "Unable to read favorites:",
                error
            );

            return [];
        }
    }


    // =====================================================
    // Save Favorite IDs
    // =====================================================

    saveFavoriteIds(ids) {

        const normalizedIds =
            ids.map((id) =>
                String(id)
            );


        localStorage.setItem(
            this.storageKey,
            JSON.stringify(normalizedIds)
        );
    }


    // =====================================================
    // Get Favorite Topic Objects
    // =====================================================

    async getFavorites() {

        const topics =
            await this.getTopics();


        const favoriteIds =
            this.getFavoriteIds();


        return topics.filter((topic) =>
            favoriteIds.includes(
                String(topic.id)
            )
        );
    }


    // =====================================================
    // Remove Favorite
    // =====================================================

    removeFavorite(id) {

        const normalizedId =
            String(id);


        const favorites =
            this.getFavoriteIds().filter(
                (favoriteId) =>
                    favoriteId !== normalizedId
            );


        this.saveFavoriteIds(
            favorites
        );
    }


    // =====================================================
    // Check Favorite Status
    // =====================================================

    isFavorite(id) {

        return this.getFavoriteIds().includes(
            String(id)
        );
    }


    // =====================================================
    // Add Favorite
    // =====================================================

    addFavorite(id) {

        const normalizedId =
            String(id);


        const favorites =
            this.getFavoriteIds();


        if (!favorites.includes(normalizedId)) {

            favorites.push(
                normalizedId
            );


            this.saveFavoriteIds(
                favorites
            );
        }
    }


    // =====================================================
    // Toggle Favorite
    // =====================================================

    toggleFavorite(id) {

        if (this.isFavorite(id)) {

            this.removeFavorite(id);

        } else {

            this.addFavorite(id);
        }
    }
}
