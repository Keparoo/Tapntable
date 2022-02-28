import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLocalStorage from './hooks/useLocalStorage';

import jwt_decode from 'jwt-decode';

import restaurantConfig from './restaurantConfig.json';
import { BAR, KITCHEN_COLD, KITCHEN_HOT } from './constants';
import TapntableApi from './api/api';

import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey, amber } from '@mui/material/colors';

import Routes from './routes/Routes';
import Navbar from './routes/Navbar';
import KitchenNavbar from './routes/KitchenNavbar';
import ServiceBarNavbar from './routes/ServiceBarNavbar';

// Local storage key name for token: log in persistence
export const TOKEN_STORAGE_ID = 'tapntable-token';

const App = () => {
  console.debug('App');
  console.log(restaurantConfig);

  const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory();
  // const user = useSelector((st) => st.user);

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

  // Show navbar with Kitchen only elements
  if (
    restaurantConfig.terminal.id === KITCHEN_HOT ||
    restaurantConfig.terminal.id === KITCHEN_COLD
  ) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <KitchenNavbar />
          <Routes login={login} logout={logout} />
        </div>
      </ThemeProvider>
    );
  }

  // Show navbar with Service Bar only elements
  if (restaurantConfig.terminal.id === BAR) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <ServiceBarNavbar />
          <Routes login={login} logout={logout} />
        </div>
      </ThemeProvider>
    );
  }

  // Show main Navbar (Servers)
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Navbar />
        <Routes login={login} logout={logout} />
      </div>
    </ThemeProvider>
  );
};

export default App;
