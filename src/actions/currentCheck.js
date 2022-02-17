import { ADD_TO_CHECK, CREATE_CHECK, LOAD_CURRENT_CHECK } from './types';

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

export function getOpenCheck(check) {
  return {
    type: LOAD_CURRENT_CHECK,
    check
  };
}
