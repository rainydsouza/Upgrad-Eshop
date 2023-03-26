import {
	BASE_URL,
	API_HEADERS,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_ERROR,
	ADD_CATEGORIES_ERROR,
	FETCH_ALL_PRODUCT_ERROR,
	DELETE_PRODUCT_ERROR,
	DELETE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_ERROR,
} from "../common/constants";

export const postSignup = (userCredentials, setResponse) => {
	return async (dispatch) => {
		const { firstName, lastName, email, password, contactNumber, isAdmin } =
      userCredentials;

		let body = { firstName, lastName, email, password, contactNumber };
		body = isAdmin ? { ...body, role: ["admin"] } : { ...body, role: ["user"] };
		try {
			let response = await fetch(`${BASE_URL}/auth/signup`, {
				...API_HEADERS,
				body: JSON.stringify(body),
			});
			setResponse({
				loading: true,
				error: null,
				message: null,
			});
			response = await response.json();
			if (response?.message.includes("Error")) {
				setResponse({
					loading: false,
					error: response.message,
					message: null,
				});
			} else {
				setResponse({
					loading: false,
					message: response.message,
					error: null,
				});
				dispatch({ type: "SIGNUP", data: { email, role: ["admin", "user"] } });
			}
		} catch (err) {
			console.log(`err ${err}`);
			setResponse({
				loading: false,
				error: err.message,
				message: null,
			});
		}
	};
};

export const fetchSignIn = (userCredentials, setResponse) => {
	return async (dispatch) => {
		const { username: email } = userCredentials;
		let token;
		try {
			let response = await fetch(`${BASE_URL}/auth/signin`, {
				...API_HEADERS,
				body: JSON.stringify(userCredentials),
			});
			setResponse({
				loading: true,
				error: null,
				message: null,
			});
			response = await response.json();
			token = response?.token;
			if (token) {
				sessionStorage.setItem("token", token);
				sessionStorage.setItem("email", email);
				response = await fetch(`${BASE_URL}/users`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				response = await response.json();
				if (response && response.length > 0) {
					let isAdmin = response.some(
						(user) =>
							user.email.trim() === email.trim() &&
              user.roles[0].name.trim() === "ADMIN"
					);
					sessionStorage.setItem("isAdmin", isAdmin);
					dispatch({ type: "USERS", data: response });
				}
			}
		} catch (err) {
			console.error();
			`err ${err}`;
		} finally {
			if (token) {
				setResponse({
					loading: false,
					error: null,
					message: LOGIN_SUCCESS,
				});
				dispatch({ type: "SIGNIN", data: { email, token: token } });
			} else {
				setResponse({
					loading: false,
					message: null,
					error: LOGIN_ERROR,
				});
			}
		}
	};
};

export const addProduct = (productId, product, setResponse) => {
	const url = productId
		? `${BASE_URL}/products/${productId}`
		: `${BASE_URL}/products`;
	return async (dispatch) => {
		let response;
		try {
			let token = sessionStorage.getItem("token");
			response = await fetch(url, {
				...API_HEADERS,
				method: productId ? "PUT" : "POST",
				headers: {
					...API_HEADERS.headers,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(product),
			});
			response = await response;

			if (String(response?.status).match(/^2\d{2}$/g)) {
				productId && dispatch({ type: "PRODUCT_UPDATE" });
			} else {
				response = null;
			}
		} catch (err) {
			console.log(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				setResponse({
					loading: false,
					error: null,
					message: productId ? UPDATE_PRODUCT_SUCCESS : ADD_PRODUCT_SUCCESS,
				});
			} else {
				setResponse({
					loading: false,
					error: productId ? UPDATE_PRODUCT_ERROR : ADD_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};

export const fetchCategories = (setResponse, setFilters) => {
	return async (dispatch) => {
		let response;
		try {
			response = await fetch(`${BASE_URL}/products/categories`, {
				...API_HEADERS,
				method: "GET",
			});
			response = await response.json();
		} catch (err) {
			console.log(`err ${err}`);
			response = null;
		} finally {
			if (!response?.error) {
				const filters = [...response, "ALL"];
				setFilters(filters);
				dispatch({ type: "ADD_CATEGORIES", data: filters });
			} else {
				setResponse({
					loading: false,
					error: ADD_CATEGORIES_ERROR,
					message: null,
				});
			}
		}
	};
};

export const fetchProducts = (
	setResponse,
	setProductsList,
	setFilters,
	setOriginalProdList
) => {
	return async (dispatch) => {
		let response;
		try {
			response = await fetch(`${BASE_URL}/products/categories`, {
				...API_HEADERS,
				method: "GET",
			});
			response = await response.json();
			if (!response?.error) {
				const filters = ["ALL", ...response];
				setFilters(filters);
				dispatch({ type: "ADD_CATEGORIES", data: filters });
			}
			response = await fetch(`${BASE_URL}/products`, {
				...API_HEADERS,
				method: "GET",
			});
			response = await response.json();
		} catch (err) {
			console.log(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				dispatch({ type: "GET_ALL_PRODUCTS", data: response });
				setProductsList([...response]);
				setOriginalProdList([...response]);
			} else {
				setResponse({
					loading: false,
					error: FETCH_ALL_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};

export const deleteProduct = (productId, setResponse) => {
	return async (dispatch) => {
		let response;
		let token = sessionStorage.getItem("token");
		try {
			response = await fetch(`${BASE_URL}/products/${productId}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			response = await response;
		} catch (err) {
			console.log(`err ${err}`);
			response = null;
		} finally {
			if (String(response?.status).match(/^2\d{2}$/g)) {
				dispatch({ type: "DELETE_PRODUCTS_BY_ID", data: productId });
				setResponse({
					loading: false,
					message: DELETE_PRODUCT_SUCCESS,
					error: null,
				});
			} else {
				setResponse({
					loading: false,
					error: DELETE_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};
