import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

const SkeletonPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        px: 2,
      }}
    >
        <Stack direction='row' spacing={2}>
            <Skeleton variant='rectangular' width={300} height={300} />
            <Box>
                 {/* Circle Skeleton for Avatar */}
      <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />

      {/* Text Skeletons for Title and Description */}
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />

      {/* Rectangle Skeletons for Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ width: '100%', justifyContent: 'center' }}
      >
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </Stack>
            </Box>
        </Stack>
     
    </Box>
  );
};

export default SkeletonPage;