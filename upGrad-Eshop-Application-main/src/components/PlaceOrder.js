import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import Select from "react-select";
import Navbar from "./Navbar";
import HorizontalStepper from "./Step";
import { addAddress, setOrder } from "../redux/actions";
import sendAddress from "../functions/addAddress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendOrder from "../functions/addOrder";
import { useHistory } from "react-router-dom";

function PlaceOrder({ addAddress, setOrder }) {
  const steps = ["Items", "Select Address", "Confirm Order"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [add, setAdd] = useState(false);
  const order = useSelector((state) => state.appReducer.order);
  const address = useSelector((state) => state.appReducer.addresses);
  const cart = useSelector((state) => state.appReducer.cart);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zip, setZip] = useState("");
  const [change, setChange] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  const history = useHistory();
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // handle place order

  const handlePlaceOrder = async () => {
    const orderPlaced = await sendOrder({
      id: "1",
      quantity: parseInt(order.quantity),
      user: order?.user,
      product: order?.product?.id,
      address: order?.address?.id,
    });
    let added = false;

    console.log("ORDER PLACED", orderPlaced);

    if (orderPlaced === 500 || orderPlaced === 401) {
      toast.error("error in placing order");

      return;
    } else {
      toast.success("Order Placed Successfully", {
        style: {
          backgroundColor: "green",
        },
        bodyStyle: {
          backgroundColor: "green",
          color: "white",
        },
      });
      added = true;
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    }
    return added;
  };

  const handleNext = async () => {
    if (activeStep === 1 && !add) {
      toast.error("Please choose address", {
        style: {
          backgroundColor: "red",
        },
        bodyStyle: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    } else if (activeStep === 1 && add) {
      setOrder({
        id: Math.random().toString(36),
        quantity: cart?.count,
        user: user ? user.id : "1234",
        product: cart,
        address: add,
      });
    }

    if (activeStep === 2) {
      const added = await handlePlaceOrder();
      if (!added) {
        return;
      }
    }

    // place the order

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddrssError = () => {
    toast.error(
      user ? "Error in saving address" : "Only admin can add address"
    );
  };

  const handleAddressSuccess = () => {
    toast.success("Successfully added address");
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setCity("");
    setLandmark("");
    setZip("");
    setMobile("");
    setStreet("");
    setState("");
    setChange(false);
  };

  const handleAddAddress = async () => {
    const sented = await sendAddress({
      city,
      mobile,
      landmark,
      state,
      name,
      zip,
      uid: user ? user?.id : "1234",
    });

    console.log("SENTED", sented);
    if (sented === 400 || sented === 500 || sented === 401) {
      handleAddrssError();
      clearForm();
      return;
    } else {
      handleAddressSuccess();
      addAddress({
        label: `${name}->${city},${zip}`,
        value: {
          id: sented,
          city,
          contactNumber: mobile,
          landmark,
          name,
          state,
          street,
          zipcode: zip,
        },
      });
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="page_body px-2 sm:px-6 md:px-16 lg:px-32 py-12 overflow-y-scroll">
        <HorizontalStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isStepSkipped={isStepSkipped}
          handleBack={handleBack}
          handleNext={handleNext}
        />

        {activeStep === 0 && (
          <div className="w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 lg:gap-64 my-16">
            <div className="product-image w-[230px] h-[230px] md:w-[375px] md:h-[375px] bg-gray-300 col-span-1">
              {cart && (
                <img src={cart.image} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="product-meta col-span-2">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl">
                  {cart?.name}
                </h2>
              </div>
              <p>Quantity:{cart?.count}</p>
              <div className="mb-3 flex items-center gap-3">
                <span>Category</span>
                <span>
                  <strong>{cart?.category}</strong>
                </span>
              </div>
              <p className="text-black/50 md:w-[375px]">{cart?.description}</p>
              <div>
                <p className="text-red-700 text-2xl">₹ {cart?.price}</p>
              </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="mx-auto w-[65%] flex flex-col items-center gap-12 my-16">
            <div className="w-full">
              <label>Select Address</label>
              <Select
                options={address}
                className="w-full"
                onChange={(e) => {
                  setAdd(e.value);
                }}
              />
            </div>
            <p>Or</p>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-2xl">Add Address</h3>
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
                label="Contact Number *"
                variant="outlined"
                value={mobile}
                onChange={(e) => {
                  setChange(true);
                  setMobile(e.target.value);
                }}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Street *"
                variant="outlined"
                value={street}
                onChange={(e) => {
                  setChange(true);
                  setStreet(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="City *"
                variant="outlined"
                value={city}
                onChange={(e) => {
                  setChange(true);
                  setCity(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="State *"
                variant="outlined"
                value={state}
                onChange={(e) => {
                  setChange(true);
                  setState(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                value={landmark}
                onChange={(e) => {
                  setChange(true);
                  setLandmark(e.target.value);
                }}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Zip Code *"
                variant="outlined"
                value={zip}
                onChange={(e) => {
                  setChange(true);
                  setZip(e.target.value);
                }}
                rows={4}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddAddress}
                disabled={(!name || !change || !city || !state || !zip) && true}
              >
                Save Address
              </Button>
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div className="w-full grid md:grid-cols-4 lg:grid-cols-6  bg-white my-16 shadow-2xl">
            <div className="col-span-3 px-6 py-12">
              <h3 className="text-3xl">{order?.product.name}</h3>
              <p className="mt-3">Quantity:{order?.quantity}</p>
              <p className="mt-3">
                Category <strong>{order?.product.category}</strong>
              </p>
              <p className="mt-3">{order?.product.description}</p>
              <h3 className="text-2xl text-red-700 mt-3">
                Total Price {order?.product.price}
              </h3>
            </div>
            <div className="col-span-2 px-6 py-12 border-l">
              <h2 className="text-3xl">Address Details</h2>
              <p className="mt-3">
                {`${order?.address.name}  ${order?.address.contactNumber} ${order?.address.city} ${order?.address.state} ${order?.address.zipcode}`}
              </p>
            </div>
          </div>
        )}
        {activeStep <= steps?.length - 1 && (
          <div className="fixed right-10 bottom-10">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Button onClick={handleNext} variant="contained" color="primary">
              {activeStep === steps?.length - 1 ? "Place Order" : "Next"}
            </Button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addAddress: (address) => dispatch(addAddress(address)),
  setOrder: (order) => dispatch(setOrder(order)),
});

export default connect(null, mapDispatchToProps)(PlaceOrder);
