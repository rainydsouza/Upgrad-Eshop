import axios from "axios";

async function getCategories() {
  try {
    const r = await axios.get("http://localhost:8080/api/products/categories");
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  } finally {
    console.log(`Finally getCategories called`);
  }
}

export default getCategories;
