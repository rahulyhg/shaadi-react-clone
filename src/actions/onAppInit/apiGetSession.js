import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import errors from '../lib/errors';
import { cacheKey } from '../lib/utils';

export default (auth, dispatch, getState) => {
  dispatch({ type: types.SESSION_REQUEST, payload: {} });
  const cKey = cacheKey('session', auth.uid);
  const sessionData = localCache.read(cKey);
  if (sessionData) {
    dispatch({ type: types.SESSION_CACHE, payload: sessionData });
  }

  api
    .get('/sessions/me', { params: { file_extension: `${getState().config.app.webp !== '0' ? 'webp' : ''}` } })
    .then(response => {
      dispatch({ type: types.SESSION_SUCCESS, payload: response.data });
      localCache.write(cKey, response.data, 12 * 3600);
    })
    .catch(error => dispatch({ type: types.SESSION_FAIL, payload: errors.clean(error) }));
};
