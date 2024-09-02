import React from "react";
import { Toolbar, Stack, Typography } from "@mui/material";

import NavbarLinks from "./NavbarLinks";
import DarkModeButton from "./DarkModeButton";

const BaseNavbar = () => {
  return (
    <Toolbar
      disableGutters
      sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography variant='h6' color='primary'>
          LOGO
        </Typography>
        <DarkModeButton />
      </Stack>
      <NavbarLinks />
    </Toolbar>
  );
};

export default BaseNavbar;
