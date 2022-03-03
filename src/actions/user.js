import TapntableApi from '../api/api';
import { FETCH_USER, CLEAR_USER_PIN } from './types';
import { CLOCK_IN, CLOCK_OUT } from '../constants';

// Handle async API call for list of items

export function fetchUserFromAPI(pin) {
  return async function(dispatch) {
    try {
      const user = await TapntableApi.getUser(pin);
      console.debug('fetchUserFromApi', user);
      return dispatch(getUser(user));
    } catch (err) {
      console.error('User Error', err);
      return err;
    }
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user
  };
}

export function clockInUser(pin) {
  return async function(dispatch) {
    try {
      const user = await TapntableApi.getUser(pin);
      const log = await TapntableApi.logEvent(user.id, CLOCK_IN);
      const clockedInUser = await TapntableApi.clockIn(user.id);
      console.debug('Clock In user', clockedInUser, log);
      return dispatch(getUser(clockedInUser));
    } catch (err) {
      console.error('Error Clocking In', err);
      return err;
    }
  };
}

export function clockOutUser(userId) {
  return async function(dispatch) {
    try {
      const log = await TapntableApi.logEvent(userId, CLOCK_OUT);
      const clockedOutUser = await TapntableApi.clockOut(userId);
      console.debug('Clock Out user', clockedOutUser, log);
      return dispatch(clearUserPin());
    } catch (err) {
      console.error('Error Clocking Out', err);
      return err;
    }
  };
}

export function clearUserPin() {
  return {
    type: CLEAR_USER_PIN
  };
}
