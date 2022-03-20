import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { TOKEN_STORAGE_ID } from '../App';
import { clearUserPin, fetchUserFromAPI, clockInUser } from '../actions/user';
import { Button, Container, Paper, Stack } from '@mui/material';
import { isClockInOnly } from '../utils/helpers';
import UserPinForm from '../auth/UserPinForm';
import ClockOut from './ClockOut';

const Homepage = () => {
  const user = useSelector((st) => st.user, shallowEqual);
  const [ token ] = useLocalStorage(TOKEN_STORAGE_ID);
  const [ formErrors, setFormErrors ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // Query API to identify PIN entered
  const getUser = async (pin) => {
    console.debug('login', pin);
    const res = await dispatch(fetchUserFromAPI(pin));
    if (!res.success) {
      console.debug('User Id: ', pin, res.error);
      setFormErrors(res.error);
    }
  };

  const clockIn = (userId) => {
    console.debug('clockIn', userId);
    dispatch(clockInUser(user.pin));
    // Insert code to print login time on local receipt printer
    history.push('/welcome');
  };

  const cancelClockIn = () => {
    console.debug('cancel login');
    dispatch(clearUserPin());
    setFormErrors([]);
    history.push('/');
  };

  const clearErrors = () => {
    setFormErrors([]);
  };

  if (!token) history.push('/login');

  // Enter pin to identify person
  if (!user.id)
    return (
      <UserPinForm
        errors={formErrors}
        clearErrors={clearErrors}
        login={getUser}
        align="center"
      />
    );

  // If a log-in-only role
  if (user.id && isClockInOnly(user.role)) {
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
