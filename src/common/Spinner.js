import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import './Spinner.css';

/** Loading spinner used by components that fetch API data. */

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', marginTop: '30vh' }} justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
