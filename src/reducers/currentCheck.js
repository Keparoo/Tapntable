import { tooltipClasses } from '@mui/material';
import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  ADD_PAYMENT,
  UPDATE_CHECK_TOTALS
} from '../actions/types';

const INITIAL_STATE = { items: [], newItems: [], payments: [] };
export default function newCheck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CHECK:
      const date = new Date();
      console.log('tn ng', action);
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
        subtotal: +state.subtotal + +action.item.price,
        newItems: [ ...state.newItems, action.item ]
      };

    case REMOVE_FROM_CHECK:
      return { ...state };

    case LOAD_CURRENT_CHECK:
      console.log('*******', action.check);

      return {
        ...action.check.check,
        subtotal: action.check.checkTotals.subtotal,
        localTax: action.check.checkTotals.localTax,
        stateTax: action.check.checkTotals.stateTax,
        federalTax: action.check.checkTotals.federalTax,
        totalTax: action.check.checkTotals.totalTax,
        amountPaid: action.check.checkTotals.amountPaid,
        amountDue: action.check.checkTotals.amountDue,
        items: action.check.items,
        newItems: [],
        payments: action.check.payments
      };

    case CLEAR_CURRENT_CHECK:
      return INITIAL_STATE;

    case ADD_PAYMENT:
      return { ...state, payments: [ ...state.payments, action.payment ] };

    default:
      return state;
  }
}
