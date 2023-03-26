import axios from "axios";

async function removeItem(product_id) {
  try {
    const r = await axios.delete(
      `http://localhost:8080/api/products/${product_id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      }
    );
    return r.status;
  } catch (e) {
    if (e.response && e.response.status) {
      return e.response.status;
    }
  } finally {
    console.log(`Finally running remove Item`);
  }
}

export default removeItem;
