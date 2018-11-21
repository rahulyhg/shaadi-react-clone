import { combineReducers } from 'redux';

import recommendations from './recommendations';
import pagination from './pagination';
import autoMove from './autoMove';

export default combineReducers({
  recommendations,
  pagination,
  autoMove,
});
