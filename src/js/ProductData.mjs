console.log(data);

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
    this.path = `/json/${this.category}.json`;
  }
  
  async getData() {
  console.log("Fetching:", this.path);

  const response = await fetch(this.path);

  console.log("Response:", response.status);

  const data = await response.json();

  console.log("Data:", data);

  return data;
}

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
  
}
