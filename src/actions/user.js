import TapntableApi from '../api/api';
import { FETCH_USER, CLEAR_USER_PIN } from './types';

// Handle async API call for list of items

export function fetchUserFromAPI(pin) {
  return async function(dispatch) {
    const items = await TapntableApi.getUser(pin);
    return dispatch(getUser(items));
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user
  };
}

export function clearUserPin() {
  return {
    type: CLEAR_USER_PIN
  };
}
