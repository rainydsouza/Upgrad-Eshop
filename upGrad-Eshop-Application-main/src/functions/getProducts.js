import axios from "axios";

async function getProducts() {
  try {
    const r = await axios.get("http://localhost:8080/api/products");
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  } finally {
    console.log(`Finally getProducts called`);
  }
}

export default getProducts;
