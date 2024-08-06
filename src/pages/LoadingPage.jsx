import React from "react";
import { Skeleton, Stack } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack direction='row' spacing={2}>
      <Skeleton
        sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
        animation='wave'
        variant='rectangular'
        height={410}
      />
      <Skeleton
        sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
        animation='wave'
        variant='rectangular'
        height={410}
      />
      <Skeleton
        sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
        animation='wave'
        variant='rectangular'
        height={410}
      />
    </Stack>
  );
};

export default LoadingPage;
