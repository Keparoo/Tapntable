import TapntableApi from '../api/api';
import { calculateCheck } from '../utils/helpers';
import {
  ADD_TO_CHECK,
  CREATE_CHECK,
  LOAD_CURRENT_CHECK,
  CLEAR_CURRENT_CHECK,
  REMOVE_FROM_CHECK,
  ADD_MOD_TO_ITEM,
  CLEAR_NEW_ITEMS,
  INCREMENT_COURSE,
  DECREMENT_COURSE,
  INCREMENT_SEAT,
  DECREMENT_SEAT,
  FIRE_COURSE_2,
  FIRE_COURSE_3,
  PRINT_CHECK,
  ADD_PAYMENT
} from './types';

// Handle async API call for list of blog titles

export function newCheck(check) {
  console.log('In action', check);
  return {
    type: CREATE_CHECK,
    check
  };
}

export function addItemToCheck(item) {
  return {
    type: ADD_TO_CHECK,
    item
  };
}

export function removeItemFromCheck(item) {
  if (item.arr[item.idx].count !== null) {
    const count = TapntableApi.setCount(
      item.arr[item.idx].id,
      item.arr[item.idx].count + 1
    );
    item.arr[item.idx].count += 1;
    console.debug('RemoveItem, adjust count', count);
  }
  return {
    type: REMOVE_FROM_CHECK,
    item
  };
}

export function getCheckDetailsFromAPI(check) {
  console.debug('getCheckDetailsFromAPI', check);

  return async function(dispatch) {
    //Get check items
    const items = await TapntableApi.getOrderedItems(check.id);
    console.log('The items now are:', items);

    //Get related mods for items
    for (const item of items) {
      const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
      item.mods = mods;
    }

    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);
    console.log('The checkTotals are', checkTotals);

    return dispatch(getOpenCheck({ check, items, payments, checkTotals }));
  };
}

export function getOpenCheck(check) {
  return {
    type: LOAD_CURRENT_CHECK,
    check
  };
}

export function clearCurrentCheck() {
  return {
    type: CLEAR_CURRENT_CHECK
  };
}

export function addModToItem(mod) {
  return {
    type: ADD_MOD_TO_ITEM,
    mod
  };
}

export function clearNewItems() {
  return {
    type: CLEAR_NEW_ITEMS
  };
}

export function incrementCourse() {
  return {
    type: INCREMENT_COURSE
  };
}

export function decrementCourse() {
  return {
    type: DECREMENT_COURSE
  };
}

export function incrementSeat() {
  return {
    type: INCREMENT_SEAT
  };
}

export function decrementSeat() {
  return {
    type: DECREMENT_SEAT
  };
}

export function fireCourse2InApi(orderId, check) {
  const COURSE_NUM = 2;
  return async function(dispatch) {
    const course2Timestamp = await TapntableApi.fireCourse(orderId, COURSE_NUM);
    console.debug('Fire Course 2', course2Timestamp);

    //Get check items
    const items = await TapntableApi.getOrderedItems(check.id);

    //Get related mods for items
    for (const item of items) {
      const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
      item.mods = mods;
    }

    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);

    dispatch(getOpenCheck({ check, items, payments, checkTotals }));

    return dispatch(fireCourse2());
  };
}

function fireCourse2() {
  return {
    type: FIRE_COURSE_2
  };
}

export function fireCourse3InApi(orderId, check) {
  const COURSE_NUM = 3;
  return async function(dispatch) {
    const course3Timestamp = await TapntableApi.fireCourse(orderId, COURSE_NUM);
    console.debug('Fire Course 3', course3Timestamp);

    //Get check items
    const items = await TapntableApi.getOrderedItems(check.id);

    //Get related mods for items
    for (const item of items) {
      const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
      item.mods = mods;
    }

    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);

    dispatch(getOpenCheck({ check, items, payments, checkTotals }));

    return dispatch(fireCourse3());
  };
}

function fireCourse3() {
  return {
    type: FIRE_COURSE_3
  };
}

export function addPaymentToAPI(checkId, paymentType, amount) {
  console.debug('addPaymentToAPI');

  return async function(dispatch) {
    const newPayment = await TapntableApi.postPayment(
      checkId,
      paymentType,
      +amount
    );
    console.log('New Credit Payment Made', newPayment);
    // Check if check is payed and close
    return dispatch(addPayment());
  };
}

const addPayment = () => {
  return {
    type: ADD_PAYMENT
  };
};

export function printCheckToAPI(
  checkId,
  subtotal,
  localTax,
  stateTax,
  federalTax
) {
  return async function(dispatch) {
    const printCheckRes = await TapntableApi.printCheck(
      checkId,
      subtotal,
      localTax,
      stateTax,
      federalTax
    );
    console.debug('printCheck', printCheckRes);
    // Insert logic to print at local printer when available?
    return dispatch(printCheck());
  };
}

const printCheck = () => {
  return {
    type: PRINT_CHECK
  };
};

// export function closeCheckInAPI(
//   checkId,
//   subtotal,
//   localTax,
//   stateTax,
//   federalTax
// ) {
//   return async function(dispatch) {
//     const closeCheckRes = await TapntableApi.closeCheck(
//       checkId,
//       subtotal,
//       localTax,
//       stateTax,
//       federalTax
//     );
//     console.debug('Close check', closeCheckRes);
//     return dispatch(closeCheck());
//   };
// }

// const closeCheck = () => {
//   return {
//     type: CLOSE_CHECK
//   };
// };
