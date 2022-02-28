import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { clearUserPin, fetchUserFromAPI, clockInUser } from '../actions/user';
import { Typography, Button, Container, Paper, Stack } from '@mui/material';
import UserPinForm from '../auth/UserPinForm';
import UserLoginForm from '../auth/UserLogInForm';
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
  const getUser = (pin) => {
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
  if (!user.id) return <UserPinForm login={getUser} align="center" />;

  // If a log-in-only role
  if (user.id && user.role === EMPLOYEE) {
    if (user.isClockedIn) {
      return <ClockOut />;
    } else {
      return (
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ paddingBottom: 8 }}>
            <Stack
              direction="row"
              spacing={2}
              mt={24}
              pt={8}
              justifyContent="center"
            >
              <Button onClick={() => clockIn(user.id)} variant="contained">
                Clock In
              </Button>
              <Button onClick={cancelClockIn} variant="contained">
                Cancel
              </Button>
            </Stack>
          </Paper>
        </Container>
      );
    }
  }

  // If  a role that takes orders that is not currently clocked-in
  if (user.id && !user.isClockedIn)
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ paddingBottom: 8 }}>
          <Stack
            direction="row"
            spacing={2}
            mt={24}
            pt={8}
            justifyContent="center"
          >
            <Button onClick={() => clockIn(user.id)} variant="contained">
              Clock In
            </Button>
            <Button onClick={cancelClockIn} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Container>
    );

  // If a role that takes orders and is currently clocked-in
  return <Redirect to="/servers" />;
};

export default Homepage;
