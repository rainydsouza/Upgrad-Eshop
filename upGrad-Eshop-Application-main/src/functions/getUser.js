import axios from "axios";

async function GetUsers() {
  try {
    const r = await axios.get(`http://localhost:8080/api/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    });
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  } finally {
    console.log(`Finally Login called`);
  }
}

export default GetUsers;
