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
import { blueGrey, yellow, amber } from '@mui/material/colors';
import { KITCHEN_HOT, MANAGER, OWNER } from './constants';
import { useSelector } from 'react-redux';

// Local storage key name for token: log in persistence
export const TOKEN_STORAGE_ID = 'tapntable-token';

const App = () => {
  console.debug('App');
  console.log(restaurantConfig);

  const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory();
  const user = useSelector((st) => st.user);

  // Primary color: #546e7a, Secondary color: #fbc02d
  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: amber
    }
  });

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
    history.push('/login');
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

  if (restaurantConfig.terminal.id === KITCHEN_HOT) {
    return (
      <ThemeProvider theme={theme}>
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

          <Routes login={login} logout={logout} />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
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
            {user.role === MANAGER || user.role === OWNER ? (
              <Link
                color="inherit"
                component={RouterLink}
                to="/closeday"
                underline="none"
              >
                Close Day
              </Link>
            ) : null}
          </Toolbar>
        </AppBar>

        <Routes login={login} logout={logout} />
      </div>
    </ThemeProvider>
  );
};

export default App;
