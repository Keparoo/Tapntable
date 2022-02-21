import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { clearUserPin, fetchUserFromAPI } from '../actions/user';
import TapntableApi from '../api/api';
import { Typography, Link, Button } from '@mui/material';
import UserPinForm from '../auth/UserPinForm';
import {
  TRAINEE,
  EMPLOYEE,
  COOK,
  HOST,
  CHEF,
  SERVER,
  BARTENDER,
  HEAD_SERVER,
  BAR_MANAGER,
  MANAGER,
  OWNER,
  CLOCK_IN,
  CLOCK_OUT
} from '../constants';

const Homepage = () => {
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();

  // const [ showUserPinForm, setShowUserPinForm ] = useState(true);

  const login = async ({ pin }) => {
    console.log('login', pin);

    dispatch(fetchUserFromAPI(pin));
    await TapntableApi.logEvent(user.id, CLOCK_IN);
  };

  if ((TRAINEE, EMPLOYEE, COOK, HOST, CHEF).includes(user.role)) {
    console.log('Punch in only');
    dispatch(clearUserPin());
  }

  if (
    (SERVER, BARTENDER, HEAD_SERVER, BAR_MANAGER, MANAGER, OWNER).includes(
      user.role
    )
  ) {
    console.log('Punch in and go to orders');
    // open to orders
  }

  if (!user.id) {
    return (
      <div>
        <Typography variant="h3" align="center">
          Tapntable
        </Typography>
        <Typography variant="h3" align="center">
          Please Log in
        </Typography>
        <UserPinForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3" align="center">
        Tapntable
      </Typography>

      <Typography variant="h4" align="center">
        <Button variant="contained" component={RouterLink} to="/server">
          Server Page
        </Button>
      </Typography>
    </div>
  );
};

export default Homepage;
