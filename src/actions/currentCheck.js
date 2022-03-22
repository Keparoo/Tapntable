import TapntableApi from '../api/api';
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
  DECREMENT_SEAT
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
