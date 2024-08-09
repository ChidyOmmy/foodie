import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { UserInput, SearchBox } from "../components/Search";
import LocationOn from "@mui/icons-material/LocationOn";
import delivery from "../images/delivery.png";
import CartTable from "../components/CartTable";
const CheckOutPage = () => {
  return (
    <Box mt={5} mb={5}>
      <Typography>
        Checkout your order now and get it delivered to you as fast as it can
        get
      </Typography>
      <Stack direction='row' spacing={2} mb={5}>
        <CartTable />
        <Box
          component='img'
          src={delivery}
          alt='delivery'
          sx={{ width: 340, maxWidth: "100%" }}
        />
      </Stack>
      <SearchBox>
        <UserInput placeholder='Enter your destination' />
        <LocationOn size='small' color='secondary' />
      </SearchBox>
    </Box>
  );
};

export default CheckOutPage;
