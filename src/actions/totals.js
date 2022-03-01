import TapntableApi from '../api/api';
import {
  GET_DAY_OPEN_TIME,
  GET_DAY_CHECKS,
  GET_DAY_PAYMENTS,
  GET_DAY_USER_DATA,
  GET_EMPLOYEE_HOURS,
  GET_DAY_ORDERED_ITEMS,
  GET_DAY_TOTALS
} from './types';

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

export function getDayChecksFromAPI(openTime) {
  return async function(dispatch) {
    const checks = await TapntableApi.getDayChecks(openTime);
    return dispatch(getDayChecks(checks));
  };
}

function getDayChecks(checks) {
  return {
    type: GET_DAY_CHECKS,
    checks
  };
}

export function getDayPaymentsFromAPI(openTime) {
  return async function(dispatch) {
    const payments = await TapntableApi.getDayPayments(openTime);
    return dispatch(getDayPayments(payments));
  };
}

function getDayPayments(payments) {
  return {
    type: GET_DAY_PAYMENTS,
    payments
  };
}

export function getDayItemsFromAPI(openTime) {
  return async function(dispatch) {
    const items = await TapntableApi.getDayItems(openTime);
    return dispatch(getDayItems(items));
  };
}

function getDayItems(items) {
  return {
    type: GET_DAY_ORDERED_ITEMS,
    items
  };
}

export function getDayUserDataFromAPI(openTime) {
  return async function(dispatch) {
    const userData = await TapntableApi.getDayUserData(openTime);
    return dispatch(getDayUserData(userData));
  };
}

function getDayUserData(userData) {
  return {
    type: GET_DAY_USER_DATA,
    userData
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
