import {
  CREATE_CHECK,
  ADD_TO_CHECK,
  REMOVE_FROM_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  ADD_PAYMENT,
  ADD_MOD_TO_ITEM,
  CLEAR_NEW_ITEMS,
  INCREMENT_COURSE,
  DECREMENT_COURSE,
  INCREMENT_SEAT,
  DECREMENT_SEAT
} from '../actions/types';
import TapntableApi from '../api/api';
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
        currentSeatNum: null,
        currentCourse: 1,
        currentItem: -1
      };

    case ADD_TO_CHECK: {
      state.currentItem++;
      return {
        ...state,
        subtotal: floatToMoney(+state.subtotal + +action.item.price),
        amountDue: null,
        totalTax: null,
        newItems: [ ...state.newItems, { ...action.item } ]
      };
    }
    case ADD_MOD_TO_ITEM: {
      const updatedItems = [ ...state.newItems ];
      console.log('UpdatedItems', updatedItems[state.currentItem]);
      updatedItems[state.currentItem].mods.push(action.mod);
      return {
        ...state,
        subtotal: floatToMoney(+state.subtotal + +action.mod.modPrice),
        newItems: updatedItems
      };
    }
    case REMOVE_FROM_CHECK: {
      state.currentItem--;
      const items = [ ...state.newItems ];
      items.splice(action.item.idx, 1);
      return {
        ...state,
        subtotal: floatToMoney(
          +state.subtotal - +action.item.arr[action.item.idx].price
        ),
        newItems: items
      };
    }
    case LOAD_CURRENT_CHECK: {
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
        currentSeatNum: null,
        currentCourse: 1,
        currentItem: -1,
        payments: action.check.payments
      };
    }
    case CLEAR_NEW_ITEMS:
      state.newItems = [];
      return { ...state };

    case CLEAR_CURRENT_CHECK:
      // If unsent items, check for count and reset in db
      // Cycle through new items: add 1 to count
      if (state.newItems.length !== 0) {
        for (let item of state.newItems) {
          if (item.count !== null) {
            const count = TapntableApi.setCount(item.id, item.count + 1);
            console.log('Cancel Check: increment count items', count);
          }
        }
      }
      return INITIAL_STATE;

    case ADD_PAYMENT:
      const amountDue = floatToMoney(state.amountDue - action.payment.subtotal);

      return {
        ...state,
        amountDue,
        payments: [ ...state.payments, action.payment ]
      };

    case INCREMENT_COURSE:
      state.currentCourse += 1;
      return { ...state };

    case DECREMENT_COURSE:
      state.currentCourse -= 1;
      return { ...state };

    case INCREMENT_SEAT:
      state.currentSeatNum += 1;
      return { ...state };

    case DECREMENT_SEAT:
      state.currentSeatNum -= 1;
      return { ...state };

    default:
      return state;
  }
}
