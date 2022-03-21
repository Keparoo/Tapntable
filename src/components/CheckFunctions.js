import { Button, Container, Divider, Paper, Stack } from '@mui/material';
import React from 'react';

const CheckFunctions = () => {
  console.debug('CheckFunctions');

  return (
    <Paper elevation={3} sx={{ margin: '0px', width: '108px' }}>
      <Stack
        spacing={4}
        sx={{
          width: '106px',
          marginTop: '15vh',
          marginLeft: '0',
          padding: '6px'
        }}
      >
        <Button variant="outlined">Seat</Button>
        <Button variant="outlined">Course</Button>
        <Button variant="outlined">Fire Course 2</Button>
        <Button variant="outlined">Fire Course 3</Button>
        <Divider />
        <Button variant="outlined">Split</Button>
        <Button variant="outlined">Merge</Button>
        <Button variant="outlined">Transfer</Button>
        <Button variant="outlined">Discount</Button>
      </Stack>
    </Paper>
  );
};

export default CheckFunctions;
