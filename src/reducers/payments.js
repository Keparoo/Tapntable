import { GET_OPEN_PAYMENTS } from '../actions/types';

const INITIAL_STATE = [];
export default function payments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_OPEN_PAYMENTS:
      return [ ...action.payments ];

    default:
      return state;
  }
}
