import { useEffect, useState } from "react";

function useAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  return auth;
}

export default useAuth;
