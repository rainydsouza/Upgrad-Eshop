import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = ({ openAlert, onCloseAlert }) => {
	return (
		<div>
			<Dialog
				open={openAlert}
				TransitionComponent={Transition}
				keepMounted
				onClose={onCloseAlert}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{"Confirm deletion of product!"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the product?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCloseAlert}>CANCEL</Button>
					<Button data-shalldeleteproduct={true} onClick={onCloseAlert}>
            Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AlertDialog;

AlertDialog.propTypes = {
	openAlert: PropTypes.bool,
	onOpenAlert: PropTypes.func,
	onCloseAlert: PropTypes.func,
};
