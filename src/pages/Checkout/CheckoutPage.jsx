import React, { useContext } from "react";
import { Box, Stack, useTheme, Typography, useMediaQuery } from "@mui/material";
import CartTable from "../../components/CartTable";
import { UserContext } from "../../context/UserContext";
import delivery from "../../images/delivery.png";

const CheckoutPage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };
  const { userData } = useContext(UserContext);
  return (
    <Box mt={5} mb={5} sx={{ maxWidth: "100%" }}>
      {userData.cart.length > 1 && (
        <Typography>
          Checkout your order now and get it delivered to you as fast as it can
          get
        </Typography>
      )}

      <Stack direction={direction()} spacing={2} mb={5}>
        <CartTable />
        <Box
          component='img'
          src={delivery}
          alt='delivery'
          sx={{
            width: 340,
            maxWidth: "100%",
            [theme.breakpoints.up("sm")]: { width: "30%" }
          }}
        />
      </Stack>
    </Box>
  );
};

export default CheckoutPage;
