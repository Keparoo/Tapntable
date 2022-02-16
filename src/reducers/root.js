import items from './items';
import checks from './checks';
import newCheck from './newCheck';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  checks,
  newCheck
});
