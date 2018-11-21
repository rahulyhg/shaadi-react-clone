import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import errors from '../lib/errors';
import { cacheKey } from '../lib/utils';

export default (auth, dispatch) => {
  dispatch({ type: types.FOUR_HOUR_REQUEST, payload: {} });
  const key = cacheKey('4HourShown', auth.uid);
  const tickerShown = localCache.read(key);

  api
    .get('/tickers/me', { params: { type: 'fourHourTicker' } })
    .then(response => {
      const { ticker } = response.data || {};
      // For testing, uncomment ->
      // ticker.time_left = 3615;
      // ticker.photo = true;
      // ticker.forceShow = true;
      const canUpdate = ticker.photo || ticker.family_details || ticker.career; // && ticker.astro;
      const t = ticker.time_left || 0;
      const isVisible = ticker.forceShow || (t > 0 && canUpdate && !tickerShown);
      const payload = {
        ticker: { ...ticker, target_time: Math.round(new Date() / 1000) + t, isVisible },
      };
      dispatch({ type: types.FOUR_HOUR_SUCCESS, payload });
    })
    .catch(error => dispatch({ type: types.FOUR_HOUR_FAIL, payload: errors.clean(error) }));
};
