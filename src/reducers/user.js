import { FETCH_USER } from '../actions/types';

const INITIAL_STATE = {};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.user };

    default:
      return state;
  }
}
