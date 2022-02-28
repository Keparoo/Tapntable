import {
  GET_DAY_OPEN_TIME,
  GET_DAY_CHECKS,
  GET_DAY_PAYMENTS,
  GET_DAY_USER_DATA,
  GET_EMPLOYEE_HOURS
} from '../actions/types';

const INITIAL_STATE = {};
export default function totals(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DAY_OPEN_TIME:
      return { ...state, openTime: action.openTime };

    case GET_DAY_CHECKS:
      return { ...state, checks: action.checks };

    case GET_DAY_PAYMENTS:
      return { ...state, payments: action.payments };

    case GET_DAY_USER_DATA:
      return { ...state, userData: action.userData };

    case GET_EMPLOYEE_HOURS:
      return { state, hours: action.hours };

    default:
      return state;
  }
}
