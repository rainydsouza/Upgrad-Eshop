import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { setCategories, setProducts } from "../redux/actions";
import addProduct from "../functions/addProduct";
import getCategories from "../functions/getCategories";
import getProducts from "../functions/getProducts";
import modifyProduct from "../functions/modifyProduct";

function ModifyProduct({ user, setProducts, setCategories }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(false);
  const history = useHistory();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  async function fetchProducts() {
    const productsList = await getProducts();
    console.log(productsList);
    setProducts(productsList);
  }

  async function fetchCategories() {
    const categories = await getCategories();
    console.log(categories);
    setCategories(categories);
  }

  // handleModify

  const handleAdd = async () => {
    const added = await addProduct({
      name: name,
      price: price,
      image: image,
      category: category,
      description: description,
      manufacturer: manufacture,
      availableItems: itemCount,
    });

    setChange(false);
    const NewState = {
      vertical: "top",
      horizontal: "right",
    };

    if (added === 201) {
      setState({ open: true, ...NewState });
      fetchProducts();
      fetchCategories();
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
      <Navbar user={user} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product {name} added Successfully!
        </Alert>
      </Snackbar>
      <div className="auth-body w-full h-[90%] flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-2xl">Add Product</h3>
          </div>

          <form className="flex flex-col items-start gap-3 w-[375px] lg:w-[575px]">
            <TextField
              id="outlined-basic"
              label="Name *"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => {
                setChange(true);
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Category *"
              variant="outlined"
              value={category}
              onChange={(e) => {
                setChange(true);
                setCategory(e.target.value);
              }}
              fullWidth
            />

            <TextField
              id="outlined-basic"
              label="Manufacturer *"
              variant="outlined"
              value={manufacture}
              onChange={(e) => {
                setChange(true);
                setManufacture(e.target.value);
              }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Avialable Items *"
              variant="outlined"
              value={itemCount}
              type="number"
              onChange={(e) => {
                setChange(true);
                setItemCount(e.target.value);
              }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Price *"
              variant="outlined"
              value={price}
              type="number"
              onChange={(e) => {
                setChange(true);
                setPrice(e.target.value);
              }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Image Url *"
              variant="outlined"
              value={image}
              onChange={(e) => {
                setChange(true);
                setImage(e.target.value);
              }}
              fullWidth
            />

            <TextField
              id="outlined-basic"
              label="Product Description *"
              variant="outlined"
              value={description}
              onChange={(e) => {
                setChange(true);
                setDescription(e.target.value);
              }}
              multiline
              rows={4}
              fullWidth
            />

            <div className="w-full flex items-center flex-col">
              <Button
                variant="contained"
                fullWidth
                onClick={handleAdd}
                color={
                  !name ||
                  !description ||
                  !price ||
                  !manufacture ||
                  !itemCount ||
                  !image ||
                  !category ||
                  !change
                    ? "inherit"
                    : "primary"
                }
                disabled={
                  !name ||
                  !description ||
                  !price ||
                  !manufacture ||
                  !itemCount ||
                  !image ||
                  !category ||
                  !change
                    ? true
                    : false
                }
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  products: state.appReducer.products,
  filteredProducts: state.appReducer.filteredProducts,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (products) => dispatch(setProducts(products)),
  setCategories: (categories) => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProduct);
