import items from './items';
import checks from './checks';
import payments from './payments';
import currentCheck from './currentCheck';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  checks,
  payments,
  currentCheck
});
