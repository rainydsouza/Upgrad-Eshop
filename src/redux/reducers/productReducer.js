const initialState = {
	allProducts: [],
	originalAllProducts: [],
	categories: [],
	isProductUpdated: false,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
	case "GET_ALL_PRODUCTS": {
		return {
			...state,
			isProductUpdated: false,
			allProducts: [...action.data],
			originalAllProducts: [...action.data],
		};
	}

	case "SEARCH_PRODUCTS": {
		const copyAllProducts = [...state.originalAllProducts];
		return {
			...state,
			isProductUpdated: false,
			allProducts: copyAllProducts.filter((product)=>product.name.toLowerCase().includes(action.data.toLowerCase()) || product.description.toLowerCase().includes(action.data.toLowerCase()))
		};
	}

	case "PRODUCT_UPDATE": {
		return {
			...state,
			isProductUpdated: true,
		};
	}
	case "DELETE_PRODUCTS_BY_ID": {
		return {
			...state,
			isProductUpdated: false,
			allProducts: state.allProducts.filter(
				(product) => product.id !== action.data
			),
			originalAllProducts: state.allProducts.filter(
				(product) => product.id !== action.data
			),

		};
	}

	case "DELETE_ALL_PRODUCTS_AND_CATEGORIES": {
		return {
			...initialState,
		};
	}

	case "ADD_CATEGORIES": {
		return {
			...state,
			categories: action.data,
		};
	}
	default: {
		return state;
	}
	}
};

export default productReducer;
