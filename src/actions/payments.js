import TapntableApi from '../api/api';
import { GET_PAYMENTS } from './types';

// Handle async API call for list of payments

export function getPaymentsFromAPI(checkId) {
  return async function(dispatch) {
    const payments = await TapntableApi.getPayments(checkId);
    console.log('Payments from API', payments);
    return dispatch(getPayments(payments));
  };
}

function getPayments(payments) {
  return {
    type: GET_PAYMENTS,
    payments
  };
}
