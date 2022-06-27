import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
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
import NoUserNavbar from './routes/NoUserNavbar';

// Local storage key name for token: log in persistence
export const TOKEN_STORAGE_ID = 'tapntable-token';

const DEMO_TOKEN = process.env.REACT_APP_DEMO_TOKEN;

const App = () => {
  console.debug('App');
  console.log(restaurantConfig);

  // Retrieve token from local storage if there is one
  const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory();
  const user = useSelector((st) => st.user, shallowEqual);

  // Primary color: #546e7a, Secondary color: #fbc02d
  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: amber
    }
  });

  // Assign token from local storage to Tapntable API
  useEffect(
    () => {
      console.debug('App useEffect loadUserInfo', 'token=', token);
      console.debug('**************Token', DEMO_TOKEN);

      // Set manager token short circuiting auth for demo purposes
      setToken(DEMO_TOKEN);

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
    [ token, setToken ]
  );

  // Log out user sitewide: Clear token. Users will not be able to use POS
  const logout = () => {
    TapntableApi.token = null;
    setToken(null);
    history.push('/login');
  };

  // Sitewide login: get and store token
  // Token expires in 23 hours
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

  if (!user.pin) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <NoUserNavbar />
          <Routes login={login} logout={logout} />
        </div>
      </ThemeProvider>
    );
  }

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
