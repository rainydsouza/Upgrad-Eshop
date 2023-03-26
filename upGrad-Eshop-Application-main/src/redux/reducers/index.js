const intialState = {
  user: null,
  categories: [],
  products: [],
  filteredProducts: [],
  addresses: [],
  filter: false,
  cart: null,
  order: null,
};

export default function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_ORDER": {
      return {
        ...state,
        order: action.order,
      };
    }
    case "SET_CART": {
      return {
        ...state,
        cart: action.cart,
      };
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.products,
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.filter,
      };
    }
    case "SET_ADDRESS": {
      return {
        ...state,
        addresses: action.address,
      };
    }
    case "ADD_ADDRESS": {
      return {
        ...state,
        addresses: [...state.addresses, action.address],
      };
    }
    case "REMOVE_FROM_PRODUCTS":
      const index = state.products.findIndex(
        (product) => product.id === action.id
      );
      let newProducts = [...state.products];

      if (index >= 0) {
        newProducts.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        products: newProducts,
      };
    case "SET_FILTERED_PRODUCTS": {
      return {
        ...state,
        filteredProducts: action.filtered_products,
      };
    }
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: action.categories,
      };
    }

    default:
      return state;
  }
}
