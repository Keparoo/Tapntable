import { ADD_TO_CHECK, CREATE_CHECK, CREATE_ORDER } from './types';

// Handle async API call for list of blog titles

export function newCheck(check) {
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

export function createOrderedItems(items) {
  return async function(dispatch) {
    // const order = await TapntableApi.createOrder();
    items.map();
    return dispatch(newOrder(items));
  };
}

function newOrder(order) {
  return {
    type: CREATE_ORDER,
    order
  };
}
