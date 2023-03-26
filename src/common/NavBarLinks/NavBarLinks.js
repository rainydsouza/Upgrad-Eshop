import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import "./NavBarLinks.css";

// eslint-disable-next-line
const NavBarLinks = ({ setIsUserLoggedIn, links }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// eslint-disable-next-line
  const updatedLinks = links.map((link) => {
		if (link.name === "Logout") {
			return (
				<Button
					key={uuid()}
					className="logout"
					onClick={() => {
						sessionStorage.clear();
						setIsUserLoggedIn(false);
						dispatch({ type: "LOGOUT" });
						dispatch({ type: "DELETE_ALL_PRODUCTS_AND_CATEGORIES" });
						navigate("/");
					}}
				>
					{link.name}
				</Button>
			);
		} else {
			return (
				<Button
					key={uuid()}
					className="navbarLinks"
					onClick={() => navigate(link.url)}
				>
					{link.name}
				</Button>
			);
		}
	});

	return <>{updatedLinks.map((link) => link)}</>;
};

export default NavBarLinks;
