import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { setCart } from "../redux/actions";
import getProduct from "../functions/getProduct";
function Product({ product_id, setCart }) {
  const [product, setProduct] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();
  useEffect(() => {
    async function fetchProduct() {
      const pr = await getProduct(product_id);
      console.log(pr);
      setProduct(pr);
    }
    fetchProduct();
  }, []);

  console.log(product);
  return (
    <div>
      <Navbar />
      <div className="px-3 md:px-6 lg:px-32 my-12"></div>
      <div className="page_body px-3 md:px-6 lg:px-32 py-12 md:py-16 w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 lg:gap-64">
        <div className="product-image w-[230px] h-[230px] md:w-[375px] md:h-[375px] bg-gray-300 col-span-1">
          {product && (
            <img
              src={product.imageUrl}
              alt={`${product?.name} Cover`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="product-meta col-span-2">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl">
              {product ? product.name : "Loading..."}
            </h2>
            <div className="px-2 py-2 bg-blue-800 text-white rounded-full">
              <p className="text-sm">
                Avialable Quantity:{" "}
                <span className="font-semibold">{product?.availableItems}</span>
              </p>
            </div>
          </div>
          <div className="mb-3 flex items-center gap-3">
            <span>Category</span>
            <span>
              <strong>{product?.category}</strong>
            </span>
          </div>
          <p className="text-black/50 md:w-[375px]">
            {product && product.description}
          </p>
          <div>
            <p className="text-red-700 text-2xl">₹ {product?.price}</p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-3">
            <TextField
              id="outlined-basic"
              label="Enter Quantity *"
              variant="outlined"
              fullWidth
              type="number"
              style={{ width: 275 }}
              value={count}
              onChange={(e) => {
                if (e.target.value <= product.availableItems) {
                  setCount(e.target.value);
                }
              }}
            />
            <Button
              variant="contained"
              color={"primary"}
              disabled={!parseInt(count) && true}
              onClick={() => {
                setCart({
                  id: product_id,
                  name: product.name,
                  image: product.imageUrl,
                  count: count,
                  category: product.category,
                  description: product.description,
                  price: product.price,
                });
                history.push("/place/order");
              }}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCart: (cart) => dispatch(setCart(cart)),
});
export default connect(null, mapDispatchToProps)(Product);
