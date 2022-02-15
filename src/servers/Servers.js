import React, { useState, useEffect } from 'react';
import TapntableApi from '../api/api';
import OpenChecks from '../common/OpenChecks';
import CurrentCheck from '../common/CurrentCheck';
import { Button, Stack, Container, Typography, Grid } from '@mui/material';
import './Servers.css';

const Servers = () => {
  console.debug('Servers');

  return (
    <div className="Servers">
      <Typography variant="h4" align="center">
        Servers
      </Typography>
      <Grid container>
        <Grid item xs={10}>
          <OpenChecks />
        </Grid>
        <Grid item xs={2}>
          <CurrentCheck />
        </Grid>
      </Grid>
      <div className="Servers-ActionArea">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">New Check</Button>
          <Button variant="contained">Cash Out</Button>
          <Button variant="contained">New Check</Button>
        </Stack>
      </div>
    </div>
  );
};

// <Stack direction="row" spacing={2} sx={{ mx: 'auto', width: 600 }}></Stack>

export default Servers;
