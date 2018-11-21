/* eslint camelcase: 0 */
import types from '../../../action_types';
import alerts from '../../lib/alerts';
import { photo as t } from '../../lib/content';
import apiPhotoRefreshProfile from './apiPhotoRefreshProfile';
import onFail from './onFail';

export default (uid, args, params) => payload => {
  const { source, type, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, heShe: 'They', himHer: 'Them' };

  dispatch({ type: types.PHOTO_EOI_SUCCESS, payload });
  apiPhotoRefreshProfile(uid, type, source, dispatch, onFail);

  switch (type) {
    case 'requestPhoto': {
      const tooltip = t.photoRequested(profile.name, profile.heShe);
      return alerts.show(dispatch, [source, 'photo', { uid }], tooltip, 8);
    }
    case 'requestPassword': {
      const tooltip = t.passwordRequested(profile.name);
      return alerts.show(dispatch, [source, 'photo', { uid }], tooltip, 8);
    }
    default:
      console.log('%c TO DO onSuccess in eoiConnect', 'font-size: 18px', type, source);
  }
  return null;
};
