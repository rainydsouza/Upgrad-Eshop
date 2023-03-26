import jwt_decode from "jwt-decode";

function DecodeToken() {
  let token = localStorage.getItem("jwt_token");
  var decoded = jwt_decode(token);
  return decoded;
}

export default DecodeToken;
