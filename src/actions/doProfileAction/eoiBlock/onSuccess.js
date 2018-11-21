/* eslint camelcase: 0 */
import types from '../../../action_types';
import { profile as profileContent } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params, history) => payload => {
  const { source, type, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };

  dispatch({
    type: types.EOI_SUCCESS,
    payload: {
      ...payload,
      justNowText: type === 'unblock' ? 'Removed from Blocked' : 'Added to Blocked Members',
      justNowIcon: type === 'unblock' ? 'user_unblock' : 'user_block',
    },
  });

  const nextUrl = nextProfileUrl(history, source, payload);
  const currentProfile = nextUrl && `/profile${history.location.search}`;

  switch (type) {
    case 'reportMisuse_confirm': {
      dispatch({ type: types.REPORT_MODAL_SUCCESS, payload: { uid, type, source, helpdeskid: payload.helpdeskid } });
      break;
    }
    case 'reportMisuse_upload': {
      dispatch({ type: types.REPORT_MODAL_SUCCESS, payload: { uid, type, source } });
      setTimeout(() => {
        dispatch({ type: types.MODAL_HIDE });
        if (nextUrl) {
          const alertMessage = profileContent.blocked(profile.name, profile.heShe, profile.uid, currentProfile);
          gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
        }
      }, 3000);
      break;
    }
    case 'reportMisuse_close': {
      if (nextUrl) {
        const alertMessage = profileContent.blocked(profile.name, profile.heShe, profile.uid, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      break;
    }
    case 'block_confirm': {
      if (payload.reportMisuse) {
        dispatch({ type: types.BLOCK_MEMBER_MISUSE, payload: { uid, type, source, ...payload } });
      } else if (nextUrl) {
        const alertMessage = profileContent.blocked(profile.name, profile.heShe, profile.uid, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      break;
    }
    case 'unblock': {
      if (nextUrl) {
        const alertMessage = profileContent.unblock(profile.name, profile.heShe, profile.uid, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      break;
    }

    default:
      console.log('%c TO DO onSuccess in eoiBlock', 'font-size: 18px', type, source);
  }
  return null;
};
