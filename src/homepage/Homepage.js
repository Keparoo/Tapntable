import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Button } from '@mui/material';

const Homepage = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Homepage
      </Typography>

      <Typography variant="h4" align="center">
        <Button variant="contained" component={RouterLink} to="/server">
          Server Page
        </Button>
      </Typography>
    </div>
  );
};

export default Homepage;
