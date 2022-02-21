import { GET_PAYMENTS } from '../actions/types';

const INITIAL_STATE = [];
export default function payments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PAYMENTS:
      return [ ...payments ];

    default:
      return state;
  }
}
