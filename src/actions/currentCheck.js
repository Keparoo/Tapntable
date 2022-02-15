import { ADD_TO_CHECK } from './types';

// Handle async API call for list of blog titles

export function addItemToCheck(item) {
  return {
    type: ADD_TO_CHECK,
    item
  };
}
