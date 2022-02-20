import TapntableApi from '../api/api';
import { GET_OPEN_CHECKS } from './types';

// Handle async API call for list of items

export function getOpenChecksFromAPI(userId) {
  return async function(dispatch) {
    const checks = await TapntableApi.getOpenChecks(userId);
    return dispatch(getChecks(checks));
  };
}

function getChecks(checks) {
  return {
    type: GET_OPEN_CHECKS,
    checks
  };
}
