import TapntableApi from '../api/api';
import { GET_OPEN_PAYMENTS } from './types';

// Handle async API call for list of payments

export function getOpenPaymentsFromAPI(loginTime, userId) {
  console.log('In Action', userId);

  return async function(dispatch) {
    const payments = await TapntableApi.getUserShiftPayments(loginTime, userId);
    console.log('Payments from API', payments);
    return dispatch(getPayments(payments));
  };
}

function getPayments(payments) {
  return {
    type: GET_OPEN_PAYMENTS,
    payments
  };
}
