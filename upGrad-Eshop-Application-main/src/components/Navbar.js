import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart } from "@material-ui/icons";
import useAdmin from "../AuthUser/User";
import useAuth from "../AuthUser/Auth";
import { connect, useSelector } from "react-redux";
import { setFilteredProducts } from "../redux/actions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar({ user, setFilteredProducts }) {
  const admin = useAdmin();
  const auth = useAuth();
  const products = useSelector((state) => state.appReducer.products);
  console.log("Admin Status", admin);

  const handleSearch = (e) => {
    const tempProduct = [...products];

    const filteredProducts = tempProduct.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    console.log("Filtered Products", filteredProducts);
    setFilteredProducts(filteredProducts);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{ top: 0, position: "sticky", backgroundColor: "#3f51b5" }}
      >
        <Toolbar>
          <div className="flex flex-w items-center justify-between  w-full">
            <div className="flex items-center gap-2">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <ShoppingCart />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                upGrad E-Shop
              </Typography>
            </div>

            {auth&&<Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </Search>
            }
            {!auth && (
              <div className="flex items-center gap-3">
                <a href="/auth/login">Login</a>
                <a href="/auth/signup">Sign Up</a>
              </div>
            )}

            {admin && (
              <div className="flex items-center gap-3">
                <a href="/product/new" className="hidden md:block">
                  Add Product
                </a>
                <a href="/logout" className="px-3 py-1 bg-red-500 rounded-md">
                  Logout
                </a>
              </div>
            )}

            {!admin && auth && (
              <div className="flex items-center gap-3">
                <a href="/logout" className="px-3 py-1 bg-red-500 rounded-md">
                  Logout
                </a>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFilteredProducts: (filtered_products) =>
    dispatch(setFilteredProducts(filtered_products)),
});

export default connect(null, mapDispatchToProps)(Navbar);
