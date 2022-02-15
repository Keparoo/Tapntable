import { ADD_TO_CHECK, REMOVE_FROM_CHECK } from '../actions/types';

const INITIAL_STATE = { items: [] };
export default function currentCheck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CHECK:
      console.log('In reducer', action.item);
      return { ...state, items: [ ...state.items, action.item ] };
    case REMOVE_FROM_CHECK:
      return state;
    default:
      return state;
  }
}
