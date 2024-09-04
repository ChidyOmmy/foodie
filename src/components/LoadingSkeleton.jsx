import React from "react";
import { Skeleton, Stack } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Stack direction='row' spacing={2} m={5}>
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

export default LoadingSkeleton;
