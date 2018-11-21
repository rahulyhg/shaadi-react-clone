/* eslint camelcase: 0 */
import types from '../../../action_types';
import alerts from '../../lib/alerts';
import { photo as t } from '../../lib/content';

export default (uid, args, params) => (payload, { error }) => {
  const { source, type, self, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, hisHer: 'Their', gender: 'Opposite gender' };
  const selfProfile = getState().profiles.self || { uid: self, name: self, fullName: self };

  dispatch({ type: types.PHOTO_EOI_FAIL, payload });

  let tooltip = error.type === 'formatted' ? t.error({ error }) : t.loudError({ error }, 'Error');
  tooltip = t.optionalPhotoError(profile.name, profile.hisHer, profile.gender, selfProfile.fullName, error.message, type) || tooltip;
  console.log(222, tooltip, error.message, type);
  alerts.show(dispatch, [source, 'photo', { uid }], tooltip, 30);
  return null;
};
