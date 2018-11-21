import { profile as tProfile } from '../../lib/content';
import types from '../../../action_types';
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params, history) => payload => {
  const { dispatch, type, source, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };
  const newPayload = {
    ...payload,
    justNowText: type === 'decline_with_delete' ? 'Invitation Deleted' : 'Invitation Declined',
    justNowIcon: 'declined_profile',
  };

  dispatch({ type: types.EOI_SUCCESS, payload: newPayload });

  const nextUrl = nextProfileUrl(history, source, payload);
  const currentProfile = nextUrl && `/profile${history.location.search}`;

  switch (type) {
    case 'decline':
    case 'decline_confirm':
      if (nextUrl) {
        const alertMessage = tProfile.decline(profile.name, profile.heShe, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState, source });
      }
      break;
    case 'decline_with_delete':
      if (nextUrl) {
        const alertMessage = tProfile.delete(profile.name, profile.heShe, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      break;
    default:
      console.log('%c TO DO onSuccess in eoiConnect', 'font-size: 18px', type, source);
  }

  return null;
};
