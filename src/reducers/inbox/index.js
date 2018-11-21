import { combineReducers } from 'redux';
import meta from './meta';
import results from './results';
import pagination from './pagination';
import facetBar from './facetBar';
import featuredInvites from './featuredInvites';

export default combineReducers({
  meta,
  pagination,
  results,
  facetBar,
  featuredInvites,
});
