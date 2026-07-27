const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    const response = await fetch(
      `${baseURL}products/search/${this.category}`,
    );
    return convertToJson(response);
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    return convertToJson(response);
  }
}
