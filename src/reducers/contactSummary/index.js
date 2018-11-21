import { combineReducers } from 'redux';
import meta from './meta';
import items from './items';

export default combineReducers({
  items,
  meta,
});
