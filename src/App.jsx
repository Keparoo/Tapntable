import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
import {
  Typography,
  CssBaseline,
  Container,
  AppBar,
  Grid,
  Button
} from '@mui/material';

import Routes from './routes/Routes';

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="relative">
        <Typography variant="h6" style={{ margin: '10px' }} gutterBottom>
          Tapntable
        </Typography>
      </AppBar>
      <main>
        <Container maxWidth="lg" />
      </main>
      <Routes />
    </div>
  );
};

export default App;
