import { combineReducers } from 'redux';
import meta from './meta';
import results from './results';
import sortOrder from './sortOrder';
import pagination from './pagination';
import facetBar from './facetBar';
// import footerMatches from './footerMatches';
import featuredProfiles from './featuredProfiles';
import { createWidgetReducer } from '../utils';

export default combineReducers({
  meta,
  results,
  sortOrder,
  pagination,
  facetBar,
  footerMatches: createWidgetReducer('partner-search-broader'),
  featuredProfiles,
});
