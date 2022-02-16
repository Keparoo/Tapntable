import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
import {
  Typography,
  CssBaseline,
  Container,
  AppBar,
  Grid,
  Button,
  Toolbar,
  Link
} from '@mui/material';

import Routes from './routes/Routes';

const App = () => {
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
            component={RouterLink}
            to="/items"
            underline="none"
          >
            Items
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="lg" />
      </main>
      <Routes />
    </div>
  );
};

export default App;
