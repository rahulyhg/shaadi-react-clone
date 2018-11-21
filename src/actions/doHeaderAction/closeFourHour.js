import types from '../../action_types';
import localCache from '../../localCache';
import { cacheKey } from '../lib/utils';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  const cKey = cacheKey('4HourShown', uid);
  const payload = true;
  dispatch({ type: types.FOUR_HOUR_CLOSE, payload: {} });
  localCache.write(cKey, payload, 3600 * 4);
};
