import axios from "axios";

async function modifyProduct(id, data) {
  try {
    const r = await axios.put(
      `http://localhost:8080/api/products/${id}`,
      {
        id: id,
        name: data.name,
        category: data.category,
        price: data.price,
        description: data.description,
        manufacturer: data.manufacturer,
        availableItems: data.availableItems,
        imageUrl: data.image,
      },
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
    console.log(`Finally getProducts called`);
  }
}

export default modifyProduct;
