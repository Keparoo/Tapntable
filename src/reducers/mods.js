import { FETCH_MODS } from '../actions/types';

const INITIAL_STATE = {
  categories: [],
  groups: [],
  mods: []
};
export default function items(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MODS:
      return [ ...action.mods ];

    default:
      return state;
  }
}
