import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom';
import { clearUserPin, fetchUserFromAPI, clockInUser } from '../actions/user';
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
  OWNER
} from '../constants';
import ClockOut from '../common/ClockOut';

const Homepage = () => {
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // Query API to identify PIN entered
  const getUser = ({ pin }) => {
    console.log('login', pin);

    dispatch(fetchUserFromAPI(pin));
    console.log('User Id: ', user);
  };

  const clockIn = async (userId) => {
    console.debug('clockIn', userId);
    dispatch(clockInUser(user.pin));
    history.push('/welcome');
  };

  const cancelClockIn = () => {
    console.debug('cancel login');
    dispatch(clearUserPin());
  };

  // Enter pin to identify person
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

  // If a log-in-only role
  if (user.id && user.roleId === 2) {
    if (user.isClockedIn) {
      return <ClockOut />;
    } else {
      return (
        <div>
          <Button
            onClick={() => clockIn(user.id)}
            variant="contained"
            align="center"
          >
            Clock In
          </Button>
          <Button onClick={cancelClockIn} variant="contained" align="center">
            Cancel
          </Button>
        </div>
      );
    }
  }

  // If  a role that takes orders that is not currently clocked-in
  if (user.id && !user.isClockedIn)
    return (
      <div>
        <Button
          onClick={() => clockIn(user.id)}
          variant="contained"
          align="center"
        >
          Clock In
        </Button>
        <Button onClick={cancelClockIn} variant="contained" align="center">
          Cancel
        </Button>
      </div>
    );

  // If a role that takes orders and is currently clocked-in
  return <Redirect to="/servers" />;
};

export default Homepage;
