import React from "react";
import Modal from "@mui/material/Modal";
import ProductEditor from "../../components/ProductEditor/ProductEditor";
import "./EditProductModal.css";
import CloseIcon from "@mui/icons-material/Close";

// eslint-disable-next-line
const EditProductModal = ({productId,openEditProductModal,onCloseEditProductModal,productInformation
}) => {
	return (
		<Modal
			open={openEditProductModal}
			className="modal"
			onClose={onCloseEditProductModal}
			aria-labelledby="child-modal-title"
			aria-describedby="child-modal-description"
		>
			<>
				<CloseIcon
					variant="filled"
					className="closeModal"
					onClick={onCloseEditProductModal}
				/>
				<ProductEditor
					productId={productId}
					heading={"Modify Product"}
					submitButton={"MODIFY PRODUCT"}
					productInformation={productInformation}
				/>
			</>
		</Modal>
	);
};

export default EditProductModal;
