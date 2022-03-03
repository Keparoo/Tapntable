import {
  GET_DAY_OPEN_TIME,
  GET_EMPLOYEE_HOURS,
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
      return { ...action.totals };

    case GET_DAY_OPEN_TIME:
      return { ...state, dayOpen: action.dayOpen };

    case GET_EMPLOYEE_HOURS:
      return { ...state, hours: action.hours };

    default:
      return state;
  }
}
