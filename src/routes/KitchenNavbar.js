import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { MANAGER, OWNER } from '../constants';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

const KitchenNavbar = () => {
  const user = useSelector((st) => st.user, shallowEqual);

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
          to="/kitchen"
          underline="none"
        >
          Kitchen Hot
        </Link>
        <Link
          color="inherit"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/kitchencold"
          underline="none"
        >
          Kitchen Cold
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

export default KitchenNavbar;
