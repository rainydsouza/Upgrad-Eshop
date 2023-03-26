import axios from "axios";

async function sendOrder(order) {
  try {
    const r = await axios.post(
      `http://localhost:8080/api/orders`,
      {
        id: Math.random().toString(36),
        quantity: order.quantity,
        user: order.user,
        product: order.product,
        address: order.address,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response.status) {
      console.log(e);
      return e.response.status;
    }
  } finally {
    console.log(`Finally running sendOrder`);
  }
}

export default sendOrder;
