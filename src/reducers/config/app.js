/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';
import { identifyCommunity } from '../utils';

const community = identifyCommunity(window.location.hostname);

const initialState = {
  appKey: '69c3f1c1ea31d60aa5516a439bb65949cf3f8a1330679fa7ff91fc9a5681b564',
  chatAppKey: '69c3f1c1ea31d60aa5516a439bb65949cf3f8a1330679fa7ff91fc9a5681b564',
  platform: 'web',
  wwwBaseUrl: `https://${community.domain}`,
  domainName: community.domainName,
  accessToken: '',
  autologinToken: '',
  authHistoryToken: '',
  uid: '',
  hasWebpSupport: false,
};

export default function(state = initialState, { type = '', payload = {} } = {}) {
  switch (type) {
    case types.COOKIE_SUCCESS: {
      const { reg_logger, abc, webp, ltabc: autologinToken = '', _alxm: authHistoryToken = '' } = payload;
      const accessToken = abc || reg_logger;
      const uid = String(accessToken).split('|')[1];
      const hasWebpSupport = webp === '1';
      return {
        ...state,
        webp,
        hasWebpSupport,
        accessToken,
        uid,
        autologinToken,
        authHistoryToken,
      };
    }
    default:
      return state;
  }
}
