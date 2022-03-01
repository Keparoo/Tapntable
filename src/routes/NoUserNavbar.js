import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

const NoUserNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ margin: '10px' }}
          sx={{ flexGrow: 1 }}
          gutterBottom
        >
          Tapntable
        </Typography>
        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/login"
          underline="none"
        >
          Login
        </Link>
        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
          underline="none"
        >
          Home
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NoUserNavbar;
