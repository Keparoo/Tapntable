import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK
} from '../actions/types';

const INITIAL_STATE = { items: [], newItems: [] };
export default function newCheck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CHECK:
      const date = new Date();
      console.log('tn ng', action.check);
      // Handle customer if bar order
      return {
        tableNum: +action.check.tableNum.tableNum,
        numGuests: +action.check.tableNum.numGuests,
        subtotal: 0,
        createdAt: date,
        items: [],
        newItems: []
      };

    case ADD_TO_CHECK:
      return {
        ...state,
        subtotal: +state.subtotal + +action.item.price,
        newItems: [ ...state.newItems, action.item ]
      };

    case REMOVE_FROM_CHECK:
      return { ...state };

    case LOAD_CURRENT_CHECK:
      const subtotal = action.check.check.items.reduce(
        (a, b) => +a + (+b.price || 0),
        0
      );
      return { ...action.check.check, subtotal, newItems: [] };

    case CLEAR_CURRENT_CHECK:
      return INITIAL_STATE;

    default:
      return state;
  }
}
