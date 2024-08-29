import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const PurchasedBox = ({ purchased }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "30px",
        height: "30px",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        borderRadius: "25px",
        backgroundColor: theme.palette.primary.main
      }}>
      <Typography
        sx={{
          color: "#fff",
          margin: 0,
          padding: 0
        }}
        variant='h6'>
        {purchased}
      </Typography>
    </Box>
  );
};

export default PurchasedBox;
