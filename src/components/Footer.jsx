import { Typography, Stack, Divider, Box, useTheme } from "@mui/material";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component='footer'
      sx={{ position: "relative", bottom: 0, width: "100%" }}>
      <Divider />
      <Stack
        direction='row'
        alignItems='flex-end'
        pt={30}
        sx={{
          paddingTop: 20,
          justifyContent: "space-around",
          [theme.breakpoints.down("sm")]: {
            paddingTop: 10,
            justifyContent: "center"
          }
        }}>
        <Typography sx={{ cursor: "pointer" }}>Privacy Policy</Typography>
        <Typography sx={{ cursor: "pointer" }}>Terms and Conditions</Typography>
        <Typography sx={{ cursor: "pointer" }}>
          email: email@email.com
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
