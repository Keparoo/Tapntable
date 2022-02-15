import { FETCH_ITEMS } from '../actions/types';

const INITIAL_STATE = [];
export default function itemsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return [ ...action.items ];
    default:
      return state;
  }
}
