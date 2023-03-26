import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8080/api";

export const API_HEADERS = {
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, *cors, same-origin
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, *same-origin, omit
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "*",
	},
	redirect: "follow", // manual, *follow, error
	referrerPolicy: "no-referrer",
};

export const RESTRICTED_ROUTES = ["/products", "/addproduct"];

export const LOGIN_SUCCESS = "User Signed In Successfully";
export const LOGIN_ERROR = "Sign In Failed";
export const UNATHORIZED = "Restricted Page. Please Sign In.";
export const ADD_PRODUCT_SUCCESS = "Product has been added Successfully";
export const UPDATE_PRODUCT_SUCCESS = "Product has been modified Successfully";
export const DELETE_PRODUCT_SUCCESS = "Product deleted Successfully";
export const ADD_PRODUCT_ERROR = "Failed to add Product.";
export const UPDATE_PRODUCT_ERROR = "Failed to update Product.";
export const DELETE_PRODUCT_ERROR = "Failed to delete Product.";
export const FETCH_ALL_PRODUCT_ERROR = "Failed to fetch Products.";
export const ADD_CATEGORIES_ERROR = "Failed to fetch Categories.";

export const IMAGE_URL =
  "https://ik.imagekit.io/klxglq9fv/shoe.jpeg?updatedAt=1679069521974";

export const INR = "\u20B9";

export const TOASTIFY_CONFIG = {
	position: toast.POSITION.TOP_RIGHT,
	theme: "dark",
	autoClose: 2000,
};

export const CATEGORIES = [
	"Furniture",
	"Electronics",
	"Personal Care",
	"Apparel",
];

export const FILTERS = [
	"ALL",
	"Furniture",
	"Electronics",
	"Personal Care",
	"Apparel",
];

export const SORTING_FILTERS = [
	"Default",
	"Price: High to Low",
	"Price: Low to High",
	"Newest",
];

export const PRODUCTLIST = [
	{
		name: "Samsung Note 10+",
		manufacturer: "Samsung",
		availableItems: 10,
		price: "70000",
		imageUrl:
      "https://ik.imagekit.io/klxglq9fv/Samsung.png?updatedAt=1679072383744",
		category: "Electronics",
		description: "Brand New Grey Color Samsung Galaxy Note 10+",
	},
	{
		name: "Shampoo",
		manufacturer: "ShinyHair",
		availableItems: 10,
		price: "800",
		imageUrl:
      "https://ik.imagekit.io/klxglq9fv/Shampoo.png?updatedAt=1679072383552",
		category: "Personal Care",
		description: "ShinyHair Dandruff free Shampoo 200ml",
	},
	{
		name: "Samsung Flip Phone",
		manufacturer: "Samsung",
		availableItems: 10,
		price: "120000",
		imageUrl:
      "https://ik.imagekit.io/klxglq9fv/flipPhone.png?updatedAt=1679252885239",
		category: "Electronics",
		description:
      "Brand New Purple Color Samsung Foldable Flip Phone. Storage :- 128Gb. Dual Sim, 50Mega Pixel Camera.",
	},
	{
		name: "Neon Nike Sports Shoe",
		manufacturer: "Nike",
		availableItems: 10,
		price: "8000",
		imageUrl:
      "https://ik.imagekit.io/klxglq9fv/shoe.jpeg?updatedAt=1679069521974",
		category: "Apparel",
		description: "Neon Color Nike Sports Shoe.",
	},
];
