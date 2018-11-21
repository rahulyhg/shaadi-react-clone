/* eslint camelcase: 0 */
import withAuth from '../withAuth';
import updateUi from './updateUi';
import loadMatches from './loadMatches';
import types from '../../action_types';
import apiGetCounts from '../onAppInit/apiGetCounts';
import localCache from '../../localCache';
import { cacheKey } from '../lib/utils';

export default (path, query, changes = {}) => (dispatch, getState) => {
  dispatch({ type: types.OTHER_SEARCH_TYPE_SET, payload: { ...changes, path, query } });

  const searchTypeDetail = getState().otherSearch.searchType;

  const target = { path, query, changes, searchList_type: searchTypeDetail.name };
  updateUi(target, dispatch);

  withAuth(
    ({ auth }, history) => {
      console.log('%c Search', 'color: blue; font-size: 20px', JSON.stringify(target));
      const cKey = cacheKey('counts', auth.uid);
      const countsData = localCache.read(cKey);
      if (!countsData) {
        apiGetCounts(auth, dispatch);
      }
      loadMatches(auth.uid, target, dispatch, getState, history);
    },
    { caller: 'doSearch', allowCache: true, delay: 1 },
  );
};
