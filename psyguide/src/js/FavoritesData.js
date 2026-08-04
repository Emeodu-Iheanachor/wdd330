export default class FavoritesData {
  constructor(dataUrl = "/data/topics.json") {
    this.dataUrl = dataUrl;
    this.storageKey = "psyguideFavorites";
  }

  /**
   * Load all topics.
   */
  async getTopics() {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error(`Failed to load topics (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Get favorite topic IDs.
   */
  getFavoriteIds() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  /**
   * Save favorite IDs.
   */
  saveFavoriteIds(ids) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(ids)
    );
  }

  /**
   * Get favorite topic objects.
   */
  async getFavorites() {
    const topics = await this.getTopics();
    const favoriteIds = this.getFavoriteIds();

    return topics.filter((topic) =>
      favoriteIds.includes(topic.id)
    );
  }

  /**
   * Remove a favorite.
   */
  removeFavorite(id) {
    const favorites = this.getFavoriteIds().filter(
      (favoriteId) => favoriteId !== id
    );

    this.saveFavoriteIds(favorites);
  }

  /**
   * Check if a topic is already a favorite.
   */
  isFavorite(id) {
    return this.getFavoriteIds().includes(id);
  }

  /**
   * Add a topic to favorites.
   */
  addFavorite(id) {
    const favorites = this.getFavoriteIds();

    if (!favorites.includes(id)) {
      favorites.push(id);
      this.saveFavoriteIds(favorites);
    }
  }

  /**
   * Toggle favorite status.
   */
  toggleFavorite(id) {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }
}
