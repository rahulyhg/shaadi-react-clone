/* eslint camelcase: 0 */
import { GA } from '../../lib/utils';
import types from '../../../action_types';
import apiGetProfile from '../apiGetProfile';
import cacheGetProfile from '../cacheGetProfile';
import publishQueue from './publishQueue';

const onRequest = (payload, { dispatch }) => {
  dispatch({ type: types.PROFILE_REQUEST, payload });
};
const onFail = (payload, { dispatch }) => {
  dispatch({ type: types.PROFILE_FAIL, payload });
};
const onSuccess = (payload, params) => {
  console.log('%c connectionStatus', 'color: green; font-size: 20px', payload.flags.connectionStatus);
  console.log('%c albumStatus', 'color: green; font-size: 20px', payload.flags.albumStatus);

  const { getState, dispatch } = params;
  GA.trackProfileViews(getState().session.settings);
  dispatch({ type: types.PROFILE_SUCCESS, payload });
  if (getState().profilePage.justNow) dispatch({ type: types.EOI_JUSTNOW_RESET, payload: { uid: payload.uid, source: 'profile' } });
  publishQueue(payload, params);
};

export default (params, uid) => {
  const { getState, dispatch } = params;
  const current = getState().profiles[uid];
  const { cache } = getState().profilePage.collection;
  dispatch({ type: types.COLLECTION_MOVE, payload: { uid } });

  if (current && current.detailed && current.detailed.ready && cache[uid]) {
    cacheGetProfile(uid, params, onRequest, onSuccess, onFail);
  } else {
    getState().config.app.webp !== '0' && (params.file_extension = 'webp');
    apiGetProfile(uid, params, onRequest, onSuccess, onFail, true);
  }
};
