import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//eslint-disable-next-line
const RestrictedRoute = ({ children }) => {
	//eslint-disable-next-line
  const ComponentName = children?.type?.name ?? '';
	const isUserLoggedIn = sessionStorage.getItem("token");

	const isAdmin = sessionStorage.getItem("isAdmin");

	const RedirectToLogin = (from) => {
		const navigate = useNavigate();
		useEffect(() => {
			navigate("/login", { state: { from } });
		}, []);
		return null;
	};

	if (ComponentName === "AddProduct" && !isAdmin) {
		return <RedirectToLogin from={window.location.pathname} />;
	}

	if (!isUserLoggedIn) {
		return <RedirectToLogin from={window.location.pathname} />;
	}

	return children;
};

export default RestrictedRoute;
