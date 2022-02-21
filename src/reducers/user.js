import { FETCH_USER, CLEAR_USER_PIN } from '../actions/types';

const INITIAL_STATE = {};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.user };

    case CLEAR_USER_PIN:
      return INITIAL_STATE;

    default:
      return state;
  }
}
