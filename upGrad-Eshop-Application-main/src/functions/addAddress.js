import axios from "axios";

async function sendAddress(address) {
  try {
    const r = await axios.post(
      `http://localhost:8080/api/addresses`,
      {
        id: "898923",
        name: address.name,
        contactNumber: address.mobile,
        city: address.city,
        landmark: address.landmark,
        street: address.city,
        state: address.state,
        zipcode: address.zip,
        user: address.uid,
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
    console.log(`Finally running sendAddress`);
  }
}

export default sendAddress;
