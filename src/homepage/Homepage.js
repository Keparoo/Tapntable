import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Homepage = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Homepage
      </Typography>

      <Typography variant="h4" align="center">
        <Link to="/servers">Server Order Page</Link>
      </Typography>
    </div>
  );
};

export default Homepage;
