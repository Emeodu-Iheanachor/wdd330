export default class SearchHistory {
  constructor(storageKey = "psyguideSearchHistory") {
    this.storageKey = storageKey;
    this.maxItems = 10;
  }

  /**
   * Get all saved searches.
   * @returns {Array}
   */
  getHistory() {
    return JSON.parse(
      localStorage.getItem(this.storageKey)
    ) || [];
  }

  /**
   * Save history back to Local Storage.
   * @param {Array} history
   */
  saveHistory(history) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(history)
    );
  }

  /**
   * Save a new search.
   * - Removes duplicates.
   * - Places newest search first.
   * - Limits history to maxItems.
   * @param {string} query
   */
  addSearch(query) {
    const term = query.trim();

    if (!term) return;

    let history = this.getHistory();

    // Remove duplicate (case-insensitive)
    history = history.filter(
      (item) =>
        item.toLowerCase() !== term.toLowerCase()
    );

    // Add newest to the beginning
    history.unshift(term);

    // Keep only the latest entries
    history = history.slice(0, this.maxItems);

    this.saveHistory(history);
  }

  /**
   * Remove a single search item.
   * @param {string} query
   */
  removeSearch(query) {
    const history = this.getHistory().filter(
      (item) =>
        item.toLowerCase() !== query.toLowerCase()
    );

    this.saveHistory(history);
  }

  /**
   * Remove all search history.
   */
  clearHistory() {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Check if there is any saved history.
   * @returns {boolean}
   */
  hasHistory() {
    return this.getHistory().length > 0;
  }
}
