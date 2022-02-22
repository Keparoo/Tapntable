import { Typography, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearUserPin } from '../actions/user';

const Welcome = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (user.roleId === 2) {
      console.log('Welcome - Log in only');
      dispatch(clearUserPin());
      history.push('/');
    } else {
      history.push('/servers');
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Welcome {user.displayName}{' '}
      </Typography>
      <Typography variant="h6" align="center">
        Successful Clock In
      </Typography>

      <Typography variant="p" align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Ok
      </Button>
    </div>
  );
};

export default Welcome;
