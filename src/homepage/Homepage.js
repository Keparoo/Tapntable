import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { clearUserPin, fetchUserFromAPI, clockInUser } from '../actions/user';
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

  const getUser = ({ pin }) => {
    console.log('login', pin);

    dispatch(fetchUserFromAPI(pin));
    console.log('User Id: ', user);
  };

  const clockIn = async (userId) => {
    console.debug('clockIn', userId);

    dispatch(clockInUser(user.pin));
  };

  const cancelLogin = () => {
    console.debug('cancel login');
    dispatch(clearUserPin());
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
        <UserPinForm login={getUser} />
      </div>
    );
  }

  if (user.id && !user.isClockedIn) {
    return (
      <div>
        <Typography variant="h3" align="center">
          Tapntable
        </Typography>
        <Button
          onClick={() => clockIn(user.id)}
          variant="contained"
          align="center"
        >
          Clock In
        </Button>
        <Button onClick={cancelLogin} variant="contained" align="center">
          Cancel
        </Button>
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
