import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import restaurantConfig from './restaurantConfig.json';
import jwt_decode from 'jwt-decode';
import TapntableApi from './api/api';

import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
import { Typography, CssBaseline, AppBar, Toolbar, Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Routes from './routes/Routes';
import useLocalStorage from './hooks/useLocalStorage';

// Local storage key name for token: log in persistence
export const TOKEN_STORAGE_ID = 'tapntable-token';

const App = () => {
  console.debug('App');
  console.log(restaurantConfig);

  const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory();
  const theme = createTheme({});

  useEffect(
    () => {
      console.debug('App useEffect loadUserInfo', 'token=', token);

      const getCurrentUser = async () => {
        if (token) {
          try {
            let { username } = jwt_decode(token);
            console.debug('Current user: ', username);
            TapntableApi.token = token; // Save token to API class for use in API calls
          } catch (err) {
            console.error(
              'App useEffect getCurrentUser: Error loading user data',
              err
            );
          }
        }
      };
      getCurrentUser();
    },
    [ token ]
  );

  // Log out user sitewide
  const logout = () => {
    TapntableApi.token = null;
    setToken(null);
    history.push('/');
  };

  // Sitewide login: check success===true &  await this function
  const login = async (loginData) => {
    try {
      let token = await TapntableApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Login error', errors);
      return { success: false, errors };
    }
  };

  return (
    <div className="App">
      <CssBaseline />
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
            to="/logout"
            underline="none"
          >
            Logout
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
            to="/payments"
            underline="none"
          >
            Payments
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/cashout"
            underline="none"
          >
            Cash Out
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
            to="/items"
            underline="none"
          >
            Items
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to="/closeday"
            underline="none"
          >
            Close Day
          </Link>
        </Toolbar>
      </AppBar>

      <Routes login={login} logout={logout} />
    </div>
  );
};

export default App;
