import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Splash() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 6, paddingBottom: 10 }}>
      <CircularProgress />
    </Box>
  );
}
