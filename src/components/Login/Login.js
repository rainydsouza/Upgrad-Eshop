import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { fetchSignIn } from "../../common/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TOASTIFY_CONFIG } from "../../common/constants";
import { useLocation } from "react-router-dom";
import { RESTRICTED_ROUTES, UNATHORIZED } from "../../common/constants";

// eslint-disable-next-line
const Login = ({ setIsUserLoggedIn }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const redirectedFrom = location.state?.from?.from ?? "/";

	if (RESTRICTED_ROUTES.includes(redirectedFrom)) {
		toast.dismiss();
		toast.error(UNATHORIZED, TOASTIFY_CONFIG);
	}

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	useEffect(() => {
		if (response?.error) {
			setIsUserLoggedIn(false);
			toast.dismiss();
			toast.error(response?.error, TOASTIFY_CONFIG);
		}

		if (response?.message) {
			toast.dismiss();
			setIsUserLoggedIn(true);
			navigate("/products");
		}
	}, [response]);
	return (
		<Formik
			initialValues={{
				username: "aryansharm@a.com",
				password: "password@123",
			}}
			validationSchema={Yup.object({
				username: Yup.string()
					.email("Invalid email address")
					.required("Required"),
				password: Yup.string()
					.min(5, "Password Must be 5 characters of more")
					.required("Required"),
			})}
			onSubmit={(values) => {
				dispatch(fetchSignIn(values, setResponse));
			}}
		>
			{({ values, setFieldValue }) => {
				const handleChange = (event) => {
					const { name, value } = event.target;
					setFieldValue(name, value);
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
									className="login"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign in
									</Typography>

									<TextField
										className="input"
										required
										type="email"
										label="Email Address"
										name="username"
										onChange={handleChange}
										value={values.username}
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
									<Button className="button" variant="contained" type="submit">
                    SIGN IN
									</Button>
									<Typography variant="body1" className="text">
                    Dont have an account? Signup
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

export default Login;
