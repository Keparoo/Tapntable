import React from 'react';
import { Typography, Container } from '@mui/material';

const CurrentCheck = () => {
  return (
    <Container>
      <div style={{ background: 'lightgray', height: '80vh' }}>
        <Typography variant="h5" align="center">
          Current Check
        </Typography>
      </div>
    </Container>
  );
};

export default CurrentCheck;
