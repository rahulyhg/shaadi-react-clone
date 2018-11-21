import { combineReducers } from 'redux';

import products from './products';
import cartResult from './cartResult';

export default combineReducers({
  products,
  cartResult,
});
