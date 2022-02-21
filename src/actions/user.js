import TapntableApi from '../api/api';
import { FETCH_USER } from './types';

// Handle async API call for list of items

export function fetchUserFromAPI() {
  return async function(dispatch) {
    const items = await TapntableApi.getUser();
    return dispatch(getUser(items));
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user
  };
}
