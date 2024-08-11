import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import MessageSnackbar from "./MessageSnackbar";
import { useNavigate } from "react-router-dom";

export default function CircularIntegration({ order }) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700]
      }
    })
  };

  async function postOrder(order) {
    try {
      const response = await fetch("http://localhost:8000/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // If CSRF protection is enabled, include the CSRF token here:
          // 'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      if (data.message) {
        setMessage(data.message);
        setError("");
        setOpenSnackbar(true);
        navigate("/");
      } else {
        setError(data.error);
        setMessage("");
        setOpenSnackbar(true);
      }
      setSuccess(true);
      setLoading(false);
      setDisabled(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      postOrder((order = order));
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <MessageSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        error={error}
      />
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          aria-label='save'
          color='primary'
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}>
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          variant='contained'
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}>
          Completeorder{" "}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px"
            }}
          />
        )}
      </Box>
    </Box>
  );
}
