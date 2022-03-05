import { GET_OPEN_CHECKS } from '../actions/types';

const INITIAL_STATE = [];
export default function checks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_OPEN_CHECKS:
      return [ ...action.checks ];

    case 'ADD_ITEM':
      return state;

    case 'DELETE_ITEM':
      return state;

    default:
      return state;
  }
}
