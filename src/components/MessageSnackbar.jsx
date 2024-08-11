import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MessageSnackbar(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar
        open={props.openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          autoHideDuration={5000}
          severity={props.message ? "success" : "error"}
          variant='filled'
          sx={{ width: "100%" }}>
          {props.message ? props.message : props.error}
        </Alert>
      </Snackbar>
    </div>
  );
}
