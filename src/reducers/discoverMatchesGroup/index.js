import { combineReducers } from 'redux';
import meta from './meta';
import results from './results';

export default combineReducers({
  meta,
  results,
});
