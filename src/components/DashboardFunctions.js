import { Button, Divider, Paper, Stack } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import React from 'react';

/**
 * 
 * Component with buttons to control view of Item Dashboard Components
 * New Item
 * New Item Category
 * Edit Item Category
 * New Mod
 * Edit Mod
 * New Mod Category
 * Edit Mod Category
 * New Mod Group
 * Edit Mod Group
 * 
 */

const DashboardFunctions = ({ toggleNewItem, showSearch }) => {
  console.debug('DashboardFunctions');

  // const dispatch = useDispatch();
  // const history = useHistory();

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
          onClick={() => toggleNewItem()}
          variant="contained"
          color="primary"
        >
          {showSearch ? <span>New Item</span> : <span>Edit Item</span>}
        </Button>
        <Button variant="outlined">New Item Category</Button>
        <Button variant="outlined">Edit Item Category</Button>

        <Divider />

        <Button variant="outlined">New Mod</Button>
        <Button variant="outlined">New Mod Category</Button>
        <Button variant="outlined">Edit Mod Category</Button>

        <Divider />

        <Button variant="outlined">New Mod Group</Button>
        <Button variant="outlined">Edit Mod Group</Button>
      </Stack>
    </Paper>
  );
};

export default DashboardFunctions;
