import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./ProductEditor.css";
import { addProduct } from "../../common/api";
import { IMAGE_URL, TOASTIFY_CONFIG, CATEGORIES } from "../../common/constants";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import PropTypes from "prop-types";

const ProductEditor = ({
	productId,
	heading = "ADD PRODUCT",
	submitButton = "ADD PRODUCT",
	productInformation ={
		name: "Smart Phone",
		manufacturer: "Samsung",
		availableItems: 10,
		price: 80000,
		imageUrl: IMAGE_URL,
		category: [],
		description: "Brand New Grey Color Samsung Galaxy Note 10",
	}
}) => {
	const dispatch = useDispatch();
	//eslint-disable-next-line
  let categoriesList = useSelector((state) => state.productReducer.categories);

	categoriesList = categoriesList.length < 2 ? CATEGORIES : categoriesList;

	//eslint-disable-next-line
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
			initialValues={{...productInformation,category: categoriesList}}
			validationSchema={Yup.object({
				name: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
				manufacturer: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
				availableItems: Yup.number().required().positive().integer(),
				price: Yup.number().required().positive().integer(),
				imageUrl: Yup.string().url(),
				category: Yup.string().required().nonNullable(),
				description: Yup.string().required().max(200),
			})}
			onSubmit={(values) => {
				console.log(values);
				dispatch(addProduct(productId, values, setResponse));
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
									className="signUp"
								>
									<Typography variant="body1" className="text">
										{heading}
									</Typography>
									<TextField
										className="input"
										required
										onChange={handleChange}
										label="Name"
										name="name"
										value={values.name}
									/>
									<ErrorMessage
										name="name"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<Box className="categories">
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
                        Category
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={productInformation?.selectedCategory ? productInformation.selectedCategory : values.category}
												label="Category"
												name="category"
												onChange={handleChange}
											>
												{categoriesList.map((category) => (
													<MenuItem value={category} key={uuid()}>
														{category.toUpperCase()}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Box>
									<TextField
										className="input"
										required
										label="Manufacturer"
										name="manufacturer"
										onChange={handleChange}
										value={values.manufacturer}
									/>
									<ErrorMessage
										name="manufacturer"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Available Items"
										name="availableItems"
										onChange={handleChange}
										value={values.availableItems}
									/>
									<ErrorMessage
										name="availableItems"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Price"
										name="price"
										onChange={handleChange}
										value={values.price}
									/>
									<ErrorMessage
										name="price"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Image Url"
										name="imageUrl"
										onChange={handleChange}
										value={values.imageUrl}
									/>
									<ErrorMessage
										name="imageUrl"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Product Description"
										name="description"
										onChange={handleChange}
										value={values.description}
									/>
									<ErrorMessage
										name="description"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<Button className="button" variant="contained" type="submit">
										{submitButton}
									</Button>
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

export default ProductEditor;

ProductEditor.propTypes = {
	heading: PropTypes.string.isRequired,
	submitButton: PropTypes.string.isRequired,
	productId: PropTypes.func,
	productInformation: PropTypes.object
};
