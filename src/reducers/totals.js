import {
  GET_DAY_OPEN_TIME,
  GET_DAY_CHECKS,
  GET_DAY_PAYMENTS,
  GET_DAY_USER_DATA,
  GET_EMPLOYEE_HOURS,
  GET_DAY_ORDERED_ITEMS,
  GET_DAY_TOTALS
} from '../actions/types';

const INITIAL_STATE = {
  checks: [],
  payments: [],
  items: [],
  userData: [],
  hours: []
};
export default function totals(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DAY_TOTALS:
      console.log('*********Totals', action.totals);
      return { ...action.totals };
    case GET_DAY_OPEN_TIME:
      return { ...state, dayOpen: action.dayOpen };

    case GET_DAY_CHECKS:
      return { ...state, checks: action.checks };

    case GET_DAY_PAYMENTS:
      return { ...state, payments: action.payments };

    case GET_DAY_ORDERED_ITEMS:
      return { ...state, items: action.items };

    case GET_DAY_USER_DATA:
      return { ...state, userData: action.userData };

    case GET_EMPLOYEE_HOURS:
      return { ...state, hours: action.hours };

    default:
      return state;
  }
}
