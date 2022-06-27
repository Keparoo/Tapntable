import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { MANAGER, OWNER } from '../constants';
import { AppBar, Link, Toolbar, Tooltip, Typography } from '@mui/material';

const Navbar = () => {
  const user = useSelector((st) => st.user, shallowEqual);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ margin: '10px' }}
          sx={{ flexGrow: 1 }}
          gutterBottom
        >
          Tapntable
        </Typography>

        {user.role === MANAGER || user.role === OWNER ? (
          <React.Fragment>
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
              to="/logout"
              underline="none"
            >
              Logout
            </Link>
          </React.Fragment>
        ) : null}
        <Tooltip title="Return to open checks page">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
            underline="none"
          >
            Home
          </Link>
        </Tooltip>

        <Tooltip title="View credit card payments that have not been settled with tip and closed">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/payments"
            underline="none"
          >
            Payments
          </Link>
        </Tooltip>

        <Tooltip title="If all payments are closed, display summary of server's payments, cash owed/due and allow server to declare cash tips and clock out">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/cashout"
            underline="none"
          >
            Cash Out
          </Link>
        </Tooltip>

        <Tooltip title="Display an alphbetical listing and description of all items">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/items"
            underline="none"
          >
            Items
          </Link>
        </Tooltip>

        <Tooltip title="Enter a count for limited or currently unavailable items">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/itemcount"
            underline="none"
          >
            Item Count
          </Link>
        </Tooltip>

        <Tooltip title="Go to welcome page view with to see any daily messages and current availability of items">
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/welcome"
            underline="none"
          >
            Welcome
          </Link>
        </Tooltip>

        {user.role === MANAGER || user.role === OWNER ? (
          <React.Fragment>
            <Link
              color="inherit"
              sx={{ mr: 2 }}
              component={RouterLink}
              to="/servers"
              underline="none"
            >
              Servers
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
              to="/servicebar"
              underline="none"
            >
              Service Bar
            </Link>

            <Link
              color="inherit"
              sx={{ mr: 2 }}
              component={RouterLink}
              to="/newitem"
              underline="none"
            >
              New Item
            </Link>

            <Link
              color="inherit"
              sx={{ mr: 2 }}
              component={RouterLink}
              to="/itemdashboard"
              underline="none"
            >
              Item Dashboard
            </Link>

            <Link
              color="inherit"
              component={RouterLink}
              to="/closeday"
              underline="none"
            >
              Close Day
            </Link>
          </React.Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
