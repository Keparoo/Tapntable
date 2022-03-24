import { Button, Divider, Paper, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  decrementCourse,
  decrementSeat,
  incrementCourse,
  incrementSeat
} from '../actions/currentCheck';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
          marginTop: '4vh',
          marginLeft: '0',
          padding: '6px'
        }}
      >
        {check.currentSeatNum ? (
          <Button
            onClick={() => dispatch(incrementSeat())}
            variant="contained"
            color="secondary"
          >
            Seat {check.currentSeatNum}
          </Button>
        ) : (
          <Button onClick={() => dispatch(incrementSeat())} variant="contained">
            Seat
          </Button>
        )}

        <Button variant="outlined" onClick={() => dispatch(incrementSeat())}>
          <ArrowUpwardIcon />
        </Button>
        {check.currentSeatNum > 0 ? (
          <Button variant="outlined" onClick={() => dispatch(decrementSeat())}>
            <ArrowDownwardIcon />
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            <ArrowDownwardIcon />
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(incrementCourse())}
        >
          Course {check.currentCourse}
        </Button>
        <Button variant="outlined" onClick={() => dispatch(incrementCourse())}>
          <ArrowUpwardIcon />
        </Button>
        {check.currentCourse > 1 ? (
          <Button
            variant="outlined"
            onClick={() => dispatch(decrementCourse())}
          >
            <ArrowDownwardIcon />
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            <ArrowDownwardIcon />
          </Button>
        )}

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
