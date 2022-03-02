import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  ADD_PAYMENT
} from '../actions/types';
import { floatToMoney } from '../utils/helpers';

const INITIAL_STATE = { items: [], newItems: [], payments: [] };
export default function newCheck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CHECK:
      const date = new Date();
      // Handle customer if bar order
      return {
        tableNum: +action.check.tableNum.tableNum,
        numGuests: +action.check.tableNum.numGuests,
        subtotal: 0,
        createdAt: date,
        items: [],
        newItems: [],
        payments: []
      };

    case ADD_TO_CHECK:
      return {
        ...state,
        subtotal: floatToMoney(+state.subtotal + +action.item.price),
        newItems: [ ...state.newItems, { ...action.item } ]
      };

    case REMOVE_FROM_CHECK:
      console.log('Remove from check', action.item);
      const items = state.newItems;
      console.log('Original Items', items);
      const updatedItems = items.splice(action.item.idx, 1);
      console.log('Updated Items', updatedItems);

      return { ...state, newItems: updatedItems };

    case LOAD_CURRENT_CHECK:
      return {
        ...action.check.check,
        subtotal: action.check.checkTotals.subtotal,
        localTax: action.check.checkTotals.localTax,
        stateTax: action.check.checkTotals.stateTax,
        federalTax: action.check.checkTotals.federalTax,
        totalTax: action.check.checkTotals.totalTax,
        totalPaid: action.check.checkTotals.totalPaid,
        amountDue: action.check.checkTotals.amountDue,
        items: action.check.items,
        newItems: [],
        payments: action.check.payments
      };

    case CLEAR_CURRENT_CHECK:
      return INITIAL_STATE;

    case ADD_PAYMENT:
      const amountDue = floatToMoney(state.amountDue - action.payment.subtotal);

      return {
        ...state,
        amountDue,
        payments: [ ...state.payments, action.payment ]
      };

    default:
      return state;
  }
}
