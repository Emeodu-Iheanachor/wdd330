export default class SearchData {
  constructor(dataUrl = "/data/topics.json") {
    this.dataUrl = dataUrl;
  }

  /**
   * Load all topics from JSON.
   */
  async getTopics() {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error(
          `Unable to load topics (${response.status})`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("SearchData:", error);
      return [];
    }
  }

  /**
   * Search topics.
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async search(query) {
    const topics = await this.getTopics();

    const term = query.trim().toLowerCase();

    if (!term) return [];

    return topics.filter((topic) => {
      return (
        topic.title?.toLowerCase().includes(term) ||

        topic.description?.toLowerCase().includes(term) ||

        topic.definition?.toLowerCase().includes(term) ||

        topic.category?.toLowerCase().includes(term) ||

        topic.symptoms?.some((item) =>
          item.toLowerCase().includes(term)
        ) ||

        topic.causes?.some((item) =>
          item.toLowerCase().includes(term)
        ) ||

        topic.treatment?.some((item) =>
          item.toLowerCase().includes(term)
        ) ||

        topic.prevention?.some((item) =>
          item.toLowerCase().includes(term)
        ) ||

        topic.resources?.some((item) =>
          item.toLowerCase().includes(term)
        )
      );
    });
  }

  /**
   * Return a limited number of suggestions.
   * @param {string} query
   * @param {number} limit
   */
  async getSuggestions(query, limit = 5) {
    const results = await this.search(query);

    return results.slice(0, limit);
  }
}
