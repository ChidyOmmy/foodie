import { useContext } from "react";
import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";

import delivery from "../images/delivery.png";
import CartTable from "../components/CartTable";
import CheckoutForm from "../components/CheckoutForm";
import { useStore } from "../store/productsStore";

const CheckOutPage = () => {
  const cart = useStore((state) => state.cart);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };

  return (
    <Box mt={5} mb={5} sx={{ maxWidth: "100%" }}>
      {cart.length > 1 && (
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

      {cart.length > 0 && (
        <>
          {" "}
          <Typography>
            sign in to checkout or fill form below to checkout with your
            information
          </Typography>
          <CheckoutForm />
        </>
      )}
    </Box>
  );
};

export default CheckOutPage;
