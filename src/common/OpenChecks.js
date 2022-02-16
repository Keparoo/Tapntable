import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import './OpenChecks.css';

const OpenChecks = () => {
  console.debug('CurrentChecks');

  return (
    <div className="CurrentChecks">
      <Container style={{ height: '40vh' }}>
        <Typography variant="h4" align="center">
          Open Checks
        </Typography>
      </Container>
    </div>
  );
};

export default OpenChecks;
