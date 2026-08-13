export default class ResourcesAPI {
  constructor(dataUrl = "/data/resources.json") {
    this.dataUrl = dataUrl;
  }

  async getResources() {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error(
          `Unable to load resources (${response.status})`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("ResourcesAPI:", error);
      return [];
    }
  }
}
