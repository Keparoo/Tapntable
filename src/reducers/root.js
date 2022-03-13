import user from './user';
import items from './items';
import mods from './mods';
import checks from './checks';
import payments from './payments';
import currentCheck from './currentCheck';
import totals from './totals';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  items,
  mods,
  checks,
  payments,
  currentCheck,
  totals
});
