import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import removeItem from "../functions/removeItem";
import AlertSnackBar from "./AlertBox";
import { connect } from "react-redux";
import { removeFromProducts } from "../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function PopUp({ open, setOpen, product_id, removeProduct }) {
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = React.useState(false);
  const handleDelete = async () => {
    const isDeleted = await removeItem(product_id);
    removeProduct(product_id);
    if (isDeleted !== 204) {
      setAlert("Error while deleting product");
    } else {
      setAlert("Product deleted successfully");
    }
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm deletion of this product!
          </Typography>
          <p id="modal-modal-description" className="mt-2 text-black/50">
            Are you sure you want to delete this product?
          </p>
          <div className="w-full flex items-center justify-end mt-3">
            <div className="flex items-center gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Ok
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <AlertSnackBar setAlert={setAlert} alert={alert} message={alert} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (id) => dispatch(removeFromProducts(id)),
});

export default connect(null, mapDispatchToProps)(PopUp);
