import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveNavBar from "./common/ResponsiveNavBar/ResponsiveNavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import AddProduct from "./components/ProductEditor/ProductEditor";
import RestrictedRoute from "./common/RestrictedRoute";

const AppRoutes = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(
		sessionStorage.getItem("token") ?? false
	);
	return (
		<>
			<Router>
				<ResponsiveNavBar
					setIsUserLoggedIn={setIsUserLoggedIn}
					isUserLoggedIn={isUserLoggedIn}
				/>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route
						exact
						path="/login"
						element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
					/>
					<Route exact path="/signup" element={<Signup />} />
					<Route
						exact
						path="/products"
						element={
							<RestrictedRoute>
								<Products />
							</RestrictedRoute>
						}
					/>
					<Route
						exact
						path="/addproduct"
						element={
							<RestrictedRoute>
								<AddProduct />
							</RestrictedRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
