import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import CartTable from "./CartTable";
import { UserContext } from "../context/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CartDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { userData } = React.useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <ShoppingCart color='primary' />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{"Review your order"}</DialogTitle>
        <DialogContent>
          <CartTable />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant='contained'
            disabled={userData.cart.length === 0 ? true : false}
            onClick={() => {
              handleClose();
              navigate("/checkout");
            }}>
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default CartDialog;
