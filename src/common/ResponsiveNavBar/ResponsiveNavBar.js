import React, { useEffect, useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "../SearchBar/SearchBar";
import NavBarLinks from "../NavBarLinks/NavBarLinks";
import "./ResponsiveNavBar.css";
import _debounce from "lodash/debounce";

// eslint-disable-next-line
const ResponsiveNavBar = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
	// eslint-disable-next-line
  const dispatch = useDispatch();
	const [links, setLinks] = useState([
		{ name: "Login", url: "/login" },
		{ name: "Signup", url: "/signup" },
	]);

	const [queryProduct, setQueryProduct] = useState("");

	const debounceFn = useCallback(_debounce((text)=>{
		setQueryProduct(text);
		dispatch({type: "SEARCH_PRODUCTS", data: text});
	}),[]);


	const onQueryHandler = (event) => {
		const text = event.target.value;
		debounceFn(text);
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			const isAdmin = sessionStorage.getItem("isAdmin") ?? false;
			if (isAdmin) {
				setLinks([
					{ name: "Home", url: "/products" },
					{ name: "AddProduct", url: "/addproduct" },
					{ name: "Logout", url: "/" },
				]);
			} else {
				setLinks([
					{ name: "Home", url: "/products" },
					{ name: "Logout", url: "/" },
				]);
			}
		} else {
			setLinks([
				{ name: "Login", url: "/login" },
				{ name: "Signup", url: "/signup" },
			]);
		}
	}, [isUserLoggedIn]);

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" className="appBar">
			<Toolbar disableGutters className="toolBar">
				<Box className="logo">
					<ShoppingCartIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="body2"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 500,
							letterSpacing: ".1rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
            upGrad E-Shop
					</Typography>

					<ShoppingCartIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="body2"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 500,
							color: "inherit",
							textDecoration: "none",
						}}
					>
            upgrad E-Shop
					</Typography>
				</Box>

				{isUserLoggedIn && (
					<SearchBar
						queryProduct={queryProduct}
						onQueryHandler={onQueryHandler}
					/>
				)}
				<Box className="navbarWrapper">
					<NavBarLinks links={links} setIsUserLoggedIn={setIsUserLoggedIn} />
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						display: { xs: "flex", md: "none" },
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: "block", md: "none" },
						}}
					>
						{links.map((page) => (
							<MenuItem
								key={uuid()}
								onClick={() => window.open(`${page.url}`, "_self")}
							>
								<Typography textAlign="center">{page.name}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default ResponsiveNavBar;
