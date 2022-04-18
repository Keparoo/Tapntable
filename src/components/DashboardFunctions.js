import { Button, Divider, Paper, Stack } from '@mui/material';
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

const DashboardFunctions = () => {
  console.debug('DashboardFunctions');

  const dispatch = useDispatch();
  const check = useSelector((state) => state.currentCheck);
  const history = useHistory();

  const setShowNewItem = () => {
    console.debug('setShowNewItem');
  };

  return (
    <Paper elevation={3} sx={{ margin: '0px', width: '117px' }}>
      <Stack
        spacing={4}
        sx={{
          width: '115px',
          marginTop: '4vh',
          marginLeft: '0',
          padding: '6px'
        }}
      >
        <Button
          onClick={() => setShowNewItem(true)}
          variant="contained"
          color="primary"
        >
          New Item
        </Button>
        <Button variant="outlined">New Item Category</Button>

        <Divider />

        <Button variant="outlined">New Mod</Button>
        <Button variant="outlined">New Mod Category</Button>
        <Button variant="outlined">New Mod Group</Button>
      </Stack>
    </Paper>
  );
};

export default DashboardFunctions;
