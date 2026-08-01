import { buildPath } from "./utils.js";

export default class CategoryData {
  constructor() {
    this.url = buildPath("data/categories.json");
  }

  async getCategories() {
    try {
      const response = await fetch(this.url);

      if (!response.ok) {
        throw new Error("Unable to load categories.");
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
