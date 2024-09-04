import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import juice from "../images/juice.png";
const AdditionalMessage = () => {
  return (
    <Stack direction='row' alignItems='center'>
      <Box component='img' src={juice} height={100} />
      <Typography>
        All orders can be delivered to wherever you are inside Da res Salaam
        region, Click on the Cart button to checkout you order now!
      </Typography>
    </Stack>
  );
};

export default AdditionalMessage;
