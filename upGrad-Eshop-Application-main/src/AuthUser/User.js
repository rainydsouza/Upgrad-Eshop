import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

function useAdmin() {
  const [admin, setAdmin] = useState(true);
  const user = useSelector((state) => state.appReducer.user);
  console.log("User Inside Hook", user);

  useEffect(() => {
    if (user?.roles[0].name !== "ADMIN") {
      console.log("Normal user");
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, [user]);
  return admin;
}
const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

export default useAdmin;
