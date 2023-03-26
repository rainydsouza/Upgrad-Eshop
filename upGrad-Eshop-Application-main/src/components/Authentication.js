import { Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import LockIcon from "@mui/icons-material/Lock";
import EmailValidator from "../functions/emailValidator";
import PhoneValidator from "../functions/phoneValidator";
import CreateUser from "../functions/signup";
import { Link, useHistory } from "react-router-dom";
import AuthenticateUser from "../functions/login";
import Cookies from "js-cookies";

function Auth({ type }) {
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [cpassword, setCpass] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  // handle login

  const handleLogin = async () => {
    if (!EmailValidator(email)) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);

    //now we are ready to go

    const auth_feedback = await AuthenticateUser(email, password);
    if (!auth_feedback) {
      setDone(true);
      setMessage("Problem while login");
      return;
    }
    localStorage.setItem("jwt_token", auth_feedback.token);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  //handle signup

  const handleSignup = async (role) => {
    if (!EmailValidator(email)) {
      setValidEmail(false);
      return;
    }
    if (!PhoneValidator(mobile)) {
      setValidPhone(false);
      return;
    }
    if (password !== cpassword) {
      setPasswordMatch(false);
    }
    setValidEmail(true);
    setValidPhone(true);
    setPasswordMatch(true);

    // now we are ready to create a user

    const create_feedback = await CreateUser({
      email: email,
      fname: fname,
      lname: lname,
      mobile: mobile,
      password: password,
      role: role,
    });

    console.log(create_feedback);
    setDone(true);
    setMessage(create_feedback?.message);

    window.location.href = "/auth/login";
  };

  const handleClose = () => {
    setDone(false);
  };
  return (
    <div className="h-screen">
      <Navbar />
      <div className="auth-body w-full h-[90%] overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-red-500 flex items-center justify-center rounded-full text-white">
              <LockIcon />
            </div>
            <h3 className="text-2xl">
              {type === "login" ? "Log In" : "Sign Up"}
            </h3>
          </div>

          {type === "login" ? (
            <form className="flex flex-col items-start gap-3 w-[375px]">
              <TextField
                id="outlined-basic"
                label="Email Address *"
                variant="outlined"
                fullWidth
                value={email}
                error={!validEmail ? true : false}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password *"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                fullWidth
              />

              <div className="w-full flex items-center flex-col">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Log In
                </Button>
                <Link className = "mt-3 text-blue-500" to="/auth/signup">Not have an account? Sign Up</Link>
              </div>
            </form>
          ) : (
            <form className="flex flex-col items-start gap-3 w-[375px]">
              <TextField
                id="outlined-basic"
                label="First Name *"
                variant="outlined"
                fullWidth
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Last Name *"
                variant="outlined"
                fullWidth
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email Address *"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password *"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password *"
                variant="outlined"
                fullWidth
                type={"password"}
                value={cpassword}
                onChange={(e) => {
                  setCpass(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Contact Number *"
                variant="outlined"
                fullWidth
                error={!validPhone ? true : false}
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
              <div className="w-full flex items-center flex-col">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleSignup("user");
                  }}
                >
                  User Sign Up
                </Button>
                <p>Or</p>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleSignup("admin");
                  }}
                >
                  Admin Sign Up
                </Button>
                <Link className = "mt-3 text-blue-500" to="/auth/login">Already have an account? Sign In</Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <Snackbar
        open={done}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={null}
      />
    </div>
  );
}

export default Auth;
