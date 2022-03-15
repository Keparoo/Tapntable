import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  ADD_PAYMENT,
  ADD_MOD_TO_ITEM
} from '../actions/types';
import { floatToMoney } from '../utils/helpers';

const INITIAL_STATE = {
  items: [],
  newItems: [],
  payments: [],
  currentItem: -1
};
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
        payments: [],
        currentItem: -1
      };

    case ADD_TO_CHECK:
      state.currentItem++;
      return {
        ...state,
        subtotal: floatToMoney(+state.subtotal + +action.item.price),
        newItems: [ ...state.newItems, { ...action.item } ]
      };

    case ADD_MOD_TO_ITEM:
      const updatedItems = [ ...state.newItems ];
      updatedItems[state.currentItem].mods.push(action.mod);
      return {
        ...state,
        subtotal: floatToMoney(+state.subtotal + +action.mod.modPrice),
        newItems: updatedItems
      };

    case REMOVE_FROM_CHECK:
      const items = [ ...state.newItems ];
      items.splice(action.item.idx, 1);
      return {
        ...state,
        subtotal: floatToMoney(
          +state.subtotal - +action.item.arr[action.item.idx].price
        ),
        newItems: items
      };

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
        currentItem: -1,
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
