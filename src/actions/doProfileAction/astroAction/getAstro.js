import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';
import localCache from '../../../localCache';
import { cacheKey } from '../../lib/utils';

export default (uid, args, { dispatch, getState, type, source, self }, params = {} /* , onSuccess, onError */) => {
  dispatch({ type: types.GET_PROFILE_ASTRO_REQUEST, payload: { uid, queryParams: params, source } });
  const cKey = cacheKey('getAstro', uid);
  const astroCacheData = localCache.read(cKey);
  if (astroCacheData) {
    dispatch({ type: types.GET_PROFILE_ASTRO_CACHE, payload: astroCacheData });
  } else {
    api
      .get('/:id/astro', { params })
      .then(response => {
        const astroData = response.data.data[uid || self];
        dispatch({
          type: types.GET_PROFILE_ASTRO_SUCCESS,
          payload: { source, type, uid: 'self', data: response.data.data[uid || self] },
        });
        // cache needs to invalidated when user add/edits horoscope at react page
        localCache.write(cKey, astroData, 300);
      })
      .catch(error => {
        const payload = errors.clean(error);
        dispatch({ type: types.GET_PROFILE_ASTRO_FAIL, payload });
      });
  }
};
