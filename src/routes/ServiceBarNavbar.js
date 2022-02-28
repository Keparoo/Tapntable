import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MANAGER, OWNER } from '../constants';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

const ServiceBarNavbar = () => {
  const user = useSelector((st) => st.user);

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
        {user.role === MANAGER || user.role === OWNER ? (
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/logout"
            underline="none"
          >
            Logout
          </Link>
        ) : null}
        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
          underline="none"
        >
          Home
        </Link>

        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/servicebar"
          underline="none"
        >
          Service Bar
        </Link>

        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/items"
          underline="none"
        >
          Items
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default ServiceBarNavbar;
