import { Button, Divider, Paper, Stack, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

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
          <Tooltip title="Display and increment seat number">
            <Button
              onClick={() => dispatch(incrementSeat())}
              variant="contained"
              color="secondary"
            >
              Seat {check.currentSeatNum}
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Display and increment seat number">
            <Button
              onClick={() => dispatch(incrementSeat())}
              variant="contained"
            >
              Seat
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Increment customer seat number">
          <Button variant="outlined" onClick={() => dispatch(incrementSeat())}>
            <ArrowUpwardIcon />
          </Button>
        </Tooltip>
        {check.currentSeatNum > 0 ? (
          <Tooltip title="Decrement customer seat number">
            <Button
              variant="outlined"
              onClick={() => dispatch(decrementSeat())}
            >
              <ArrowDownwardIcon />
            </Button>
          </Tooltip>
        ) : (
          <Button variant="outlined" disabled>
            <ArrowDownwardIcon />
          </Button>
        )}
        <Tooltip title="Display and increment course number">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(incrementCourse())}
          >
            Course {check.currentCourse}
          </Button>
        </Tooltip>
        <Tooltip title="Increment course number">
          <Button
            variant="outlined"
            onClick={() => dispatch(incrementCourse())}
          >
            <ArrowUpwardIcon />
          </Button>
        </Tooltip>
        {check.currentCourse > 1 ? (
          <Tooltip title="Decrement course number">
            <Button
              variant="outlined"
              onClick={() => dispatch(decrementCourse())}
            >
              <ArrowDownwardIcon />
            </Button>
          </Tooltip>
        ) : (
          <Button variant="outlined" disabled>
            <ArrowDownwardIcon />
          </Button>
        )}

        <Divider />
        <Tooltip title="Split check">
          <Button
            onClick={() => history.push('/splitcheck')}
            variant="outlined"
          >
            Split
          </Button>
        </Tooltip>
        <Button variant="outlined" disabled>
          Merge
        </Button>
        <Button variant="outlined" disabled>
          Transfer
        </Button>
        <Button variant="outlined" disabled>
          Discount
        </Button>
      </Stack>
    </Paper>
  );
};

export default CheckFunctions;
