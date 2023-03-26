import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import "react-toastify/dist/ReactToastify.css";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ButtonUI from "../UI/ButtonUI";
import NavBar from "../UI/NavBar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SearchAppBar from "../UI/SearchComponent";
import Step2 from "./Step2";
import Step3 from "./Step3";
let finaladdressis = {};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function PlaceOrder(props) {
  const steps = ["Items", "Select Address", "Confirm Order"];
  //const address = useSelector((state) => state.appReducer.addresses);
  const { state } = useLocation();
  const { id, role, quantity } = state;
  // const id=window.sessionStorage.getItem("id");
  // const role=window.sessionStorage.getItem("role");
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [address, setAddress] = useState([]);

  const token = window.sessionStorage.getItem("access-token");
  console.log(id);

  //debugger
  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((data) => {
        setProduct(data);

        console.log(product);
      });
  }, []);

  const getaddressHandler = async () => {
    try {
      const rawres = await fetch("http://localhost:8080/api/addresses", {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (rawres.ok) {
        console.log(rawres);
        const res = await rawres.json();
        console.log(res);
        setAddress(res);
        //console.log(address);
        //navigate("/admin");
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 1 && !finalAddressid) {
      toast.error("Please add an Address ", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    setCount(count + 1);
    if (count === 0) {
      getaddressHandler();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setCount(count - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const homeButtonHandler = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  const [finalAddressid, setFinalAddressid] = useState();
  const getAddressidHandler = async (id) => {
    setFinalAddressid(id);
  };
  const [finalAddress, setFinalAddress] = useState();

  const fetchaddressdetails = async () => {
    try {
      const rawRespose = await fetch(
        `http://localhost:8080/api/addresses/${finalAddressid}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (rawRespose.ok) {
        const res = await rawRespose.json();
        finaladdressis = { ...res };
        setFinalAddress(res);
        console.log(finalAddress);
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };
  let flag = 0;
  if (activeStep === 2 && flag === 0) {
    fetchaddressdetails();
    flag = 1;
  }

  const ordersuccessfulNavigate = () => {
    if (role === "admin") {
      navigate("../admin");
      window.sessionStorage.setItem("orderplaced", "true");

      // toast.success("order placed successfully for admin!!!")

      //
    } else {
      // toast.success("order placed successfully for user!!!")
      navigate("../user");
    }
  };
  return (
    <>
      {" "}
      <NavBar>
        <ShoppingCartIcon style={{ color: "white" }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ paddingLeft: "1%" }}
        >
          upGrad E-shop
        </Typography>
        <SearchAppBar style={{ paddingRight: "30px" }} />
        <br></br>
        <ButtonUI
          type="button"
          onClick={homeButtonHandler}
          // getaddressHandler={getaddressHandler}
        >
          Home
        </ButtonUI>

        <ButtonUI
          type="button"
          onClick={() => {
            navigate("/addproducts");
          }}
        >
          Add Products
        </ButtonUI>
        <ButtonUI
          logout="true"
          type="button"
          onClick={() => {
            navigate("/signin");
          }}
        >
          LogOut
        </ButtonUI>
      </NavBar>
      <br></br>
      <Box sx={{ width: "80%" }} style={{ paddingLeft: "15%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          ordersuccessfulNavigate()
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <div className="w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 lg:gap-64 my-16">
                <div className="product-image w-[230px] h-[230px] md:w-[375px] md:h-[375px]  col-span-1">
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="product-meta col-span-2">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl">
                      {product.name}
                    </h2>
                  </div>
                  <p className="gap-2">Quantity: {quantity}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <span>Category :</span>
                    <span>
                      <strong>{product.category}</strong>
                    </span>
                  </div>
                  <i className="text-black md:w-[375px]">
                    {product.description}
                  </i>
                  <div>
                    <p className="text-3xl font-semibold text-red-600 mb-2">
                      Total Price : ₹ {product.price}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <Step2 address={address} getaddressID={getAddressidHandler} />
            )}

            {activeStep === 2 && (
              <div className="w-full grid md:grid-cols-4 lg:grid-cols-6  bg-white my-16 shadow-2xl">
                <div className="col-span-3 px-6 py-12">
                  <h3 className="text-3xl">{product.name}</h3>
                  <p className="mt-3">Quantity : {quantity}</p>
                  <p className="mt-3">
                    Category <strong>{product.category}</strong>
                  </p>
                  <i className="mt-3">{product.description}</i>
                  <h3 className="text-3xl font-semibold text-red-600 mt-3">
                    Total Price : ₹ {product.price}
                  </h3>
                </div>
                <div className="col-span-2 px-6 py-12 border-l">
                  <h2 className="text-3xl">Address Details</h2>
                  <p className="mt-3">
                    {finaladdressis.street + "," + finaladdressis.landmark}
                  </p>
                  <p className="mt-3">
                    Contact Number :{finaladdressis.contactNumber}
                  </p>
                  <p className="mt-3">{finaladdressis.city}</p>
                  <p className="mt-3">{finaladdressis.state}</p>
                  <p className="mt-3">{finaladdressis.zipcode}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center gap-3">
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {count === 0 && (
                  <Button
                    color="inherit"
                    variant="contained"
                    // disabled={activeStep === 0}
                    onClick={() => {
                      if (role === "admin") {
                        navigate("../admin");
                      } else {
                        navigate("../user");
                      }
                    }}
                    sx={{ mr: 1 }}
                  >
                    Cancel Payment Process
                  </Button>
                )}
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  style={{ backgroundColor: "#3f51b5" }}
                >
                  {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                </Button>
              </Box>
            </div>
          </React.Fragment>
        )}
      </Box>
      <ToastContainer />
    </>
  );
}
