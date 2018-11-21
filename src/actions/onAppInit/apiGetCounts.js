import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import errors from '../lib/errors';
import { cacheKey } from '../lib/utils';

export default (auth, dispatch) => {
  dispatch({ type: types.COUNTS_REQUEST, payload: {} });
  const cKey = cacheKey('counts', auth.uid);
  const countsData = localCache.read(cKey);
  if (countsData) {
    dispatch({ type: types.COUNTS_CACHE, payload: countsData });
  }

  api
    .get('/counts/me')
    .then(response => {
      dispatch({ type: types.COUNTS_SUCCESS, payload: response.data });
      localCache.write(cKey, response.data, 1800);
    })
    .catch(error => dispatch({ type: types.COUNTS_FAIL, payload: errors.clean(error) }));
};
