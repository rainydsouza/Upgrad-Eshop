import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { postSignup } from "../../common/api";
import { useDispatch } from "react-redux";
import { TOASTIFY_CONFIG } from "../../common/constants";
import { Formik, Form, ErrorMessage } from "formik";

const Signup = () => {
	//eslint-disable-next-line
  const dispatch = useDispatch();

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		if (response?.error) {
			toast.dismiss();
			toast.error(response?.error, TOASTIFY_CONFIG);
		}

		if (response?.message) {
			toast.dismiss();
			toast.success(response?.message, TOASTIFY_CONFIG);
		}
	}, [response]);

	return (
		<Formik
			initialValues={{
				firstName: "aryan",
				lastName: "sharma",
				email: "a@a.com",
				password: "password123",
				confirmPassword: "password123",
				contactNumber: "9999999999",
				isAdmin: false,
			}}
			validationSchema={Yup.object({
				firstName: Yup.string()
					.max(15, "Must be 15 characters or less")
					.required("Required"),
				lastName: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
				email: Yup.string().email("Invalid email address").required("Required"),
				password: Yup.string()
					.min(5, "Password Must be 5 characters of more")
					.required("Required"),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Confirm Password is required"),
				contactNumber: Yup.number().required().min(1000000000).max(9999999999),
			})}
			onSubmit={(values) => {
				dispatch(postSignup(values, setResponse));
			}}
		>
			{({ values, setFieldValue }) => {
				console.log(values);
				const handleChange = (event) => {
					const { name, value } = event.target;
					if (name === "isAdmin") {
						setFieldValue(name, !values.isAdmin);
					} else {
						setFieldValue(name, value);
					}
				};

				return (
					<>
						<Form>
							<Container maxWidth="sm" className="centered-box">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="signUp"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign up
									</Typography>
									<TextField
										className="input"
										required
										label="First Name"
										onChange={handleChange}
										name="firstName"
										value={values.firstName}
									/>
									<ErrorMessage
										name="firstName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										label="Last Name"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
									/>
									<ErrorMessage
										name="lastName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="email"
										label="Email Address"
										name="email"
										onChange={handleChange}
										value={values.email}
									/>
									<ErrorMessage
										name="email"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="password"
										label="Password"
										name="password"
										onChange={handleChange}
										value={values.password}
									/>
									<ErrorMessage
										name="password"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="password"
										label="Confirm Password"
										name="confirmPassword"
										onChange={handleChange}
										value={values.confirmPassword}
									/>
									<ErrorMessage
										name="confirmPassword"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="number"
										label="Contact Number"
										name="contactNumber"
										onChange={handleChange}
										value={values.contactNumber}
									/>
									<ErrorMessage
										name="contactNumber"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<FormControlLabel
										name="isAdmin"
										onChange={handleChange}
										control={<Checkbox checked={values.isAdmin} />}
										label="Admin"
									/>
									<Button className="button" variant="contained" type="submit">
                    SIGN UP
									</Button>
									<Typography variant="body1" className="text">
                    Already have an account? Signin
									</Typography>
									<Typography variant="body1" className="loginFooter">
                    Copyright @UpGrad 2021
									</Typography>
								</Box>
							</Container>
						</Form>
						<ToastContainer limit={1} />
					</>
				);
			}}
		</Formik>
	);
};

export default Signup;
