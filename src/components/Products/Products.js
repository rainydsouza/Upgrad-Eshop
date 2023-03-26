import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { TOASTIFY_CONFIG } from "../../common/constants";
import Grid from "@mui/material/Grid";
import Filter from "./Filters/Filters";
import Sort from "./Sort/Sort";
import ProductCard from "./ProductCard/ProductCard";
import "./Products.css";
import { deleteProduct } from "../../common/api";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../common/api";
import AlertDialog from "../../common/AlertDialog/AlertDialog";
import EditProductModal from "../../common/EditProductModal/EditProductModal";

const Products = () => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	// eslint-disable-next-line
  const updatedProductsList = useSelector(
		(state) => state.productReducer.allProducts,
		shallowEqual
	);

	const isProductUpdated = useSelector(
		(state) => state.productReducer.isProductUpdated,
		shallowEqual
	);

	const [filters, setFilters] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState("ALL");
	const [productsList, setProductsList] = useState([]);
	const [originalProdList, setOriginalProdList] = useState([]);
	const [productId, setProductId] = useState(null);
	const [openAlert, setOpenAlert] = useState(false);
	const [openEditProductModal, setOpenEditProductModal] = useState(false);
	const [productInformation, setProductInformation] = useState({});

	const onOpenEditProductModal = (event) => {
		setProductId(event.currentTarget.dataset.productid);
		const productInfo=JSON.parse(event.currentTarget.dataset.productinformation);
		setProductInformation(productInfo);
		setOpenEditProductModal(true);
	};
	const onCloseEditProductModal = () => {
		setOpenEditProductModal(false);
	};

	const onOpenAlert = (event) => {
		setProductId(event.currentTarget.dataset.productid);
		setOpenAlert(true);
	};

	const onCloseAlert = (event) => {
		const shalldeleteproduct = event.currentTarget.dataset?.shalldeleteproduct;
		if (shalldeleteproduct && productId) {
			dispatch(deleteProduct(productId, setResponse, setProductsList));
		}
		setOpenAlert(false);
	};

	const [sortByFilter, setSortByFilter] = useState("");

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

	useEffect(() => {
		setProductsList([...updatedProductsList]);
		setOriginalProdList([...updatedProductsList]);
	}, [updatedProductsList]);

	useEffect(() => {
		if (productsList.length === 0 || isProductUpdated) {
			dispatch(
				fetchProducts(
					setResponse,
					setProductsList,
					setFilters,
					setOriginalProdList
				)
			);
		}
	}, [isProductUpdated]);

	const onSortChange = (e) => {
		let sortedFilter = e.target.value;
		setSortByFilter(sortedFilter);
		let sortedList = [...productsList];
		if (sortedFilter === "Price: High to Low") {
			sortedList.sort((a, b) => b.price - a.price);
		} else if (sortedFilter === "Price: Low to High") {
			sortedList.sort((a, b) => a.price - b.price);
		} else {
			sortedList = [...originalProdList];
		}
		setProductsList([...sortedList]);
	};

	const handleChange = (event, selectedFilter) => {
		setSelectedFilter(selectedFilter);
		let filteredList = [...originalProdList];
		let updatedFilteredList = filteredList.filter(
			(product) => product.category === selectedFilter
		);
		if (updatedFilteredList.length === 0) {
			setProductsList(originalProdList);
		} else {
			setProductsList(updatedFilteredList);
		}
	};

	return (
		<Grid container className="container">
			<Filter
				filters={filters}
				handleChange={handleChange}
				selectedFilter={selectedFilter}
				productsList={productsList}
			/>
			<Sort sortByFilter={sortByFilter} onSortChange={onSortChange} />

			<Grid container className="productsContainer">
				{productsList.map((product) => {
					return (
						<ProductCard
							key={product.id}
							imageUrl={product.imageUrl}
							name={product.name}
							price={product.price}
							description={product.description}
							id={product.id}
							onDeleteProduct={onOpenAlert}
							onEditProduct={onOpenEditProductModal}
							manufacturer={product.manufacturer}
							availableItems={product.availableItems}
							selectedCategory={product.category}
						/>
					);
				})}
				<ToastContainer limit={1} />
				{openEditProductModal && (
					<EditProductModal
						openEditProductModal={openEditProductModal}
						onCloseEditProductModal={onCloseEditProductModal}
						productId={productId}
						productInformation={productInformation}
					/>
				)}
				{openAlert && (
					<AlertDialog openAlert={openAlert} onCloseAlert={onCloseAlert} />
				)}
			</Grid>
		</Grid>
	);
};

export default Products;
