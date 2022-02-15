// import axios from 'axios';
import TapntableApi from '../api/api';
import { FETCH_ITEMS } from './types';

// Handle async API call for list of items

export function fetchItemsFromAPI() {
  return async function(dispatch) {
    const items = await TapntableApi.getItems();
    return dispatch(getItems(items));
  };
}

function getItems(items) {
  return {
    type: FETCH_ITEMS,
    items
  };
}
