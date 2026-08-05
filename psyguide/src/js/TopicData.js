export default class TopicData {
  constructor(dataUrl = "/data/topics.json") {
    this.dataUrl = dataUrl;
  }

  /**
   * Load all topics from the JSON file.
   * @returns {Promise<Array>}
   */
  async getTopics() {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error(`Unable to load topics (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error loading topics:", error);
      return [];
    }
  }

  /**
   * Find a topic by its id.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getTopicById(id) {
    const topics = await this.getTopics();

    return (
      topics.find(
        (topic) => String(topic.id).toLowerCase() === String(id).toLowerCase()
      ) || null
    );
  }

  /**
   * Get all topics in a category.
   * @param {string} category
   * @returns {Promise<Array>}
   */
  async getTopicsByCategory(category) {
    const topics = await this.getTopics();

    return topics.filter(
      (topic) =>
        topic.category &&
        topic.category.toLowerCase() === category.toLowerCase()
    );
  }
}
