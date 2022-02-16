import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK
} from '../actions/types';

const INITIAL_STATE = { items: [] };
export default function newCheck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CHECK:
      const date = new Date();
      console.log('tn ng', action);
      // Handle customer if bar order
      return {
        ...state,
        tableNum: +action.check.tableNum.tableNum,
        numGuests: +action.check.tableNum.numGuests,
        subtotal: 0,
        createdAt: date
      };
    case ADD_TO_CHECK:
      return {
        ...state,
        subtotal: +state.subtotal + +action.item.price,
        items: [ ...state.items, action.item ]
      };
    case REMOVE_FROM_CHECK:
      return state;
    default:
      return state;
  }
}
