// import axios from 'axios';
import TapntableApi from '../api/api';
import { FETCH_ITEMS } from './types';

// Handle async API call for list of blog titles

// const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export function fetchItemsFromAPI() {
  return async function(dispatch) {
    const response = await TapntableApi.getItems();
    return dispatch(getItems(response.data));
  };
}

function getItems(items) {
  return {
    type: FETCH_ITEMS,
    items
  };
}
