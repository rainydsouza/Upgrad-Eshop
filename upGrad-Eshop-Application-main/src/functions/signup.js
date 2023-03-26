import axios from "axios";

async function CreateUser(data) {
  try {
    const r = await axios.post(`http://localhost:8080/api/auth/signup`, {
      email: data.email,
      role: [data.role],
      password: data.password,
      firstName: data.fname,
      lastName: data.lname,
      contactNumber: data.mobile,
    });
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  } finally {
    console.log(`Finally Signup called`);
  }
}

export default CreateUser;
