import TapntableApi from '../api/api';
import { GET_DAY_OPEN_TIME, GET_EMPLOYEE_HOURS, GET_DAY_TOTALS } from './types';

// Handle async API call for manager totals

export function getDayOpenFromAPI() {
  return async function(dispatch) {
    const dayOpen = await TapntableApi.getDayOpen();
    return dispatch(getDayOpen(dayOpen));
  };
}

function getDayOpen(dayOpen) {
  return {
    type: GET_DAY_OPEN_TIME,
    dayOpen
  };
}

export function getEmployeeHoursFromAPI(openTime) {
  return async function(dispatch) {
    const hours = await TapntableApi.getEmployeeHours(openTime);
    return dispatch(getEmployeeHours(hours));
  };
}

function getEmployeeHours(hours) {
  return {
    type: GET_EMPLOYEE_HOURS,
    hours
  };
}

export function getDayTotalsFromAPI() {
  return async function(dispatch) {
    const dayOpen = await TapntableApi.getDayOpen();
    const checks = await TapntableApi.getDayChecks(dayOpen);
    const payments = await TapntableApi.getDayPayments(dayOpen);
    const items = await TapntableApi.getDayItems(dayOpen);
    const userData = await TapntableApi.getDayUserData(dayOpen);
    return dispatch(
      getDayTotals({ dayOpen, checks, payments, items, userData })
    );
  };
}

function getDayTotals(totals) {
  return {
    type: GET_DAY_TOTALS,
    totals
  };
}
