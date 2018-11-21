import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import errors from '../lib/errors';
import { cacheKey } from '../lib/utils';

export default (auth, dispatch) => {
  dispatch({ type: types.SUCCESS_STORIES_REQUEST, payload: {} });
  const cKey = cacheKey('success-stories', auth.uid);

  const storiesData = localCache.read(cKey);
  if (storiesData) {
    dispatch({ type: types.SUCCESS_STORIES_CACHE, payload: storiesData });
  } else {
    api
      .get('/success-stories')
      .then(response => {
        dispatch({ type: types.SUCCESS_STORIES_SUCCESS, payload: response.data });
        localCache.write(cKey, response.data, 24 * 3600);
      })
      .catch(error => dispatch({ type: types.SUCCESS_STORIES_FAIL, payload: errors.clean(error) }));
  }
};
