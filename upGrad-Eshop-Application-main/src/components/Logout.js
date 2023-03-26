import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("jwt_token");
      window.location.href = "/auth/login";
    }, 2000);
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgress />
        <p className="sm:text-2xl">Logging out.....</p>
      </div>
    </div>
  );
}

export default Logout;
