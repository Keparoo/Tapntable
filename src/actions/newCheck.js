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
