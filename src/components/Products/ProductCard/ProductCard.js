import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import uuid from "react-uuid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { INR } from "../../../common/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ProductCard.css";

const ProductCard = (props) => {
	

	const productInformation = {...props};
	const {
		imageUrl,
		name,
		price,
		description,
		onDeleteProduct,
		id,
		onEditProduct,
	} = productInformation;
	return (
		<Card key={uuid()} xs={12} sm={6} md={4} className="productWrapper">
			<CardMedia
				className="productImage"
				// eslint-disable-next-line no-undef
				image={imageUrl}
				title={name}
			/>
			<CardContent className="cardContent">
				<Container className="nameAndPrice">
					<Typography gutterBottom variant="h5" component="span">
						{name}
					</Typography>
					<Typography className="productPrice" variant="body1" component="span">
						{`${INR} ${price}`}
					</Typography>
				</Container>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions className="cardActions">
				<Button size="small" variant="contained">
          BUY
				</Button>
				<Box className="editAndDelete">
					<EditIcon
						variant="filled"
						data-productid={id}
						data-productinformation={JSON.stringify(productInformation)}
						onClick={onEditProduct}
					/>
					<DeleteIcon
						variant="filled"
						data-productid={id}
						onClick={onDeleteProduct}
					/>
				</Box>
			</CardActions>
		</Card>
	);
};

ProductCard.propTypes = {
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	onDeleteProduct: PropTypes.func,
	onEditProduct: PropTypes.func,
	id: PropTypes.func.isRequired,
	productInformation: PropTypes.object
};

export default ProductCard;
