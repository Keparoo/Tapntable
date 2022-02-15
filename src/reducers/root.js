import items from './items';
import checks from './checks';
import currentCheck from './currentCheck';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  checks,
  currentCheck
});
