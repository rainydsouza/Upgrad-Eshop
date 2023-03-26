export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  categories,
});

export const setProducts = (products) => ({
  type: "SET_PRODUCTS",
  products,
});
export const setFilteredProducts = (filtered_products) => ({
  type: "SET_FILTERED_PRODUCTS",
  filtered_products,
});

export const removeFromProducts = (id) => ({
  type: "REMOVE_FROM_PRODUCTS",
  id,
});

export const setFilter = (filter) => ({
  type: "SET_FILTER",
  filter,
});

export const setAddresses = (address) => ({
  type: "SET_ADDRESS",
  address,
});

export const setCart = (cart) => ({
  type: "SET_CART",
  cart,
});

export const addAddress = (address) => ({
  type: "ADD_ADDRESS",
  address,
});

export const setOrder = (order) => ({
  type: "SET_ORDER",
  order,
});

//REMOVE_FROM_PRODUCTS
