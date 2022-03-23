import { Button, Divider, Paper, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { incrementCourse, incrementSeat } from '../actions/currentCheck';

const CheckFunctions = () => {
  console.debug('CheckFunctions');

  const dispatch = useDispatch();
  const check = useSelector((state) => state.currentCheck);

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
        <Button onClick={() => dispatch(incrementSeat())} variant="outlined">
          Seat {check.currentSeatNum && check.currentSeatNum}
        </Button>
        <Button onClick={() => dispatch(incrementCourse())} variant="outlined">
          Course {check.currentCourse}
        </Button>
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
