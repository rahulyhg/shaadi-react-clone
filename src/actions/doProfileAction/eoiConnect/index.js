/* eslint camelcase: 0 */
import cookie from 'cookie';
import get from 'lodash/get';
import types from '../../../action_types';
import apiAction from '../apiAction';
import alerts from '../../lib/alerts';
import guard from '../../lib/guard';
import { search as t } from '../../lib/content';
import { getTrackInfo, isExperiment } from '../utils';

import requestModal from './requestModal';
import onSuccess from './onSuccess';
import onFail from './onFail';

const bulkConnect = (uids, text, sendPassword, args, params) => {
  const { source, dispatch, getState, history } = params;
  const settings = getState().session.settings;
  const cookies = cookie.parse(document.cookie);
  const campaign = cookies.special_promo ? cookies.special_promo : '';

  const driveLayer =
    !getState().session.settings.hasUploadedPhoto && guard.canShow('fu', getState().session.uid)
      ? { type: 'photo' }
      : !getState().session.settings.isPaidUser ? { type: 'firstStep', campaign } : null;

  alerts.show(dispatch, [source, 'bulk'], { loading: true });
  return Promise.all(
    uids.map(puid => {
      const sFn = onSuccess(puid, args, params, history);
      const fFn = onFail(puid, args, params);
      return apiAction(puid, 'connect', 'contacted', params, { text, sendPassword, driveLayer }, sFn, fFn);
    }),
  ).then(resp => {
    const profile = getState().profiles[uids[0]];
    const selfProfile = getState().profiles.self || {};
    let bulkFlash = '';

    if (settings.isHidden) {
      bulkFlash = t.hiddenProfile(true);
    } else {
      bulkFlash = t.bulkConnect(resp.filter(f => f).length, profile.heShe, !settings.canConnectWithMessage);
    }
    if (selfProfile.flags && selfProfile.flags.isPremium === true && resp.filter(f => f).length === 0) {
      bulkFlash = t.connectLimitExceedPremium();
    }

    alerts.show(dispatch, [source, 'bulk'], bulkFlash);
    return resp;
  });
};

export default (uid, args, params) => {
  const { source, self, type, dispatch, getState, history } = params;
  const settings = getState().session.settings;
  const cookies = cookie.parse(document.cookie);
  const campaign = cookies.special_promo ? cookies.special_promo : '';
  const driveLayer =
    !getState().session.settings.hasUploadedPhoto && guard.canShow('fu', getState().session.uid)
      ? { type: 'photo' }
      : !getState().session.settings.isPaidUser ? { type: 'firstStep', campaign } : null;

  const successFn = onSuccess(
    uid,
    args,
    (source === 'daily-recommendations' && type === 'ignore' && { ...params, type: 'skip' }) || params,
    history,
  );

  const failFn = onFail(uid, args, params);
  const loadSimilarProfile =
    ['preferredSearch', 'otherSearch', 'profile'].includes(source) &&
    ['connect', 'connect_confirm'].includes(type) &&
    isExperiment('similar_profile')(getState) &&
    get(getState(), ['profilePage', 'pagination', 'source'], null) !== 'similar_profile';
  switch (type) {
    case 'remind': {
      if (settings.canConnectWithMessage) {
        return requestModal(uid, args, { ...params, type: 'remind' });
      }
      return apiAction(uid, 'remind', 'contacted', params, {}, successFn, failFn);
    }
    case 'remind_confirm': {
      dispatch({ type: types.MODAL_HIDE, payload: { uid, source } });
      const [text] = args;
      return apiAction(uid, 'remind', 'contacted', params, { text }, successFn, failFn);
    }
    case 'connect_from_send_email':
    case 'connect':
    case 'connect_premium_carousel': {
      if (settings.canConnectWithMessage) {
        if (settings.isHidden) {
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'hiddenConnectLayer' } });
        }
        return requestModal(uid, args, { ...params, type: 'connect' });
      }
      return apiAction(
        uid,
        'connect',
        'contacted',
        params,
        { driveLayer, loadSimilarProfile, trackInfo: getTrackInfo(source) },
        successFn,
        failFn,
      );
    }
    case 'connect_with_password': {
      if (settings.canConnectWithMessage) {
        return requestModal(uid, args, { ...params, type: 'connect' });
      }
      return apiAction(uid, 'connect', 'contacted', { ...params, type: 'connect' }, { sendPassword: true, driveLayer }, successFn, failFn);
    }
    case 'connect_confirm': {
      dispatch({ type: types.MODAL_HIDE, payload: { uid, source } });
      const [text, sendPassword] = args;
      return apiAction(
        uid,
        'connect',
        'contacted',
        params,
        { text, sendPassword, driveLayer, loadSimilarProfile, trackInfo: getTrackInfo(source) },
        successFn,
        failFn,
      );
    }
    case 'bulkConnect': {
      const uids = args[0];
      if (uids.length === 0) {
        const bulkFlash = t.bulkConnectEmpty();
        alerts.show(dispatch, [source, 'bulk', { uid }], bulkFlash);
        return null;
      }
      if (settings.canConnectWithMessage) {
        if (settings.isHidden) {
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'hiddenConnectLayer' } });
        }
        return requestModal(uid, args, params);
      }
      return bulkConnect(uids, null, false, args, params);
    }
    case 'bulkConnect_confirm': {
      dispatch({ type: types.MODAL_HIDE, payload: { uid, source } });
      const [uids, text, sendPassword] = args;
      return bulkConnect(uids, text, sendPassword, args, params);
    }
    case 'ignore': {
      if (source === 'daily-recommendations') {
        return apiAction(uid, 'skip', 'skip', { ...params, type: 'skip' }, {}, successFn, failFn);
      }
      return apiAction(uid, 'ignored', 'ignored', params, {}, successFn, failFn);
    }
    case 'dr_ignore': {
      return apiAction(uid, 'skip', 'dr_ignore', params, {}, successFn, failFn);
    }
    case 'accept_premium_carousel':
    case 'accept': {
      if (settings.canConnectWithMessage) {
        return requestModal(uid, args, { ...params, type: 'accept' });
      }
      const successFunc = onSuccess(uid, args, { ...params, showMessageLayer: false }, history);
      return apiAction(uid, 'accept', 'accepted', params, { driveLayer, trackInfo: getTrackInfo(source) }, successFunc, failFn);
    }
    case 'accept_confirm': {
      const [text] = args;
      dispatch({ type: types.MODAL_HIDE, payload: { uid, source } });
      return apiAction(uid, 'accept', 'accepted', params, { text, driveLayer, trackInfo: getTrackInfo(source) }, successFn, failFn);
    }
    case 'cancel_invitation':
      return apiAction(uid, 'cancel', 'cancelled', params, {}, successFn, failFn);
    case 'skip':
      dispatch({ type: types.TOGGLE_SKIP, payload: { uid } });
      return null;
    default:
      console.log('TO DO eoiConnect', type, { source, uid, args, self });
      return null;
  }
};
