import axios from "axios";

async function AuthenticateUser(email, password) {
  try {
    const r = await axios.post(`http://localhost:8080/api/auth/signin`, {
      username: email,
      password,
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

export default AuthenticateUser;
