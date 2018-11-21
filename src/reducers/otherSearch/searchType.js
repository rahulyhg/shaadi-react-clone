import types from '../../action_types';
import { identifySearchType } from '../utils';

const initialState = {
  name: 'preferred',
  count: 0,
  showRecentViewFacet: true,
  showMatchesFacet: true,
  setMatchesFacetValue: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ROUTE_CHANGE: {
      const { pathname, query, cluster, values } = action.payload;
      const searchTypeDetail = identifySearchType(pathname, cluster, values, query);

      return {
        ...state,
        name: searchTypeDetail.name || state.name,
      };
    }
    case types.OTHER_SEARCH_TYPE_SET: {
      const { path, query, cluster, values } = action.payload;
      const searchTypeDetail = identifySearchType(path, cluster, values, query);
      return {
        ...state,
        count: 0,
        name: searchTypeDetail.name,
        showRecentViewFacet: searchTypeDetail.showRecentViewFacet,
        showMatchesFacet: searchTypeDetail.showMatchesFacet,
        setMatchesFacetValue: searchTypeDetail.setMatchesFacetValue,
      };
    }
    case types.OTHER_SEARCH_SUCCESS:
      return {
        ...state,
        count: action.payload.meta.max,
      };
    case types.OTHER_SEARCH_REQUEST:
    case types.OTHER_SEARCH_FAIL:
    default:
      return state;
  }
};
