/* eslint camelcase: 0 */
import types from '../../../action_types';
import { profile as profileContent } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params, history) => payload => {
  const { source, type, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };

  const payloadOverride = {
    ...payload,
    nextUrl: getState().profilePage.pagination.nextUrl,
    nextUid: getState().profilePage.pagination.nextUid,
  };
  const nextUrl = nextProfileUrl(history, source, payloadOverride);
  const currentProfile = nextUrl && `/profile${history.location.search}`;
  switch (type) {
    case 'block_confirm': {
      if (payload.error.message === 'You have blocked this member.') {
        dispatch({
          type: types.EOI_FAIL,
          payload: {
            ...payload,
            justNowText: 'You have already blocked this member.',
            justNowIcon: 'user_block',
          },
        });
      }

      if (payload.reportMisuse) {
        dispatch({ type: types.BLOCK_MEMBER_MISUSE, payload: { uid, type, source, ...payload } });
      } else if (nextUrl) {
        const alertMessage = profileContent.blocked(profile.name, profile.heShe, profile.uid, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      break;
    }
    case 'reportMisuse_confirm': {
      if (payload.error.message === 'profile_block_limit_exceeded') {
        dispatch({
          type: types.EOI_FAIL,
          payload: {
            ...payload,
            justNowText: 'You have reached your daily limit',
            justNowIcon: 'user_block',
          },
        });
        setTimeout(() => {
          dispatch({ type: types.MODAL_HIDE });
          if (nextUrl) {
            const alertMessage = profileContent.reportMisuseBlocked(profile.name, profile.heShe, profile.uid, currentProfile);
            gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
          }
        }, 2000);
      }

      if (payload.error.message === 'misuse_already_marked') {
        dispatch({
          type: types.EOI_FAIL,
          payload: {
            ...payload,
            justNowText: 'You have already blocked this user',
            justNowIcon: 'user_block',
          },
        });

        setTimeout(() => {
          dispatch({ type: types.MODAL_HIDE });
          if (nextUrl) {
            const alertMessage = profileContent.misuseAlreadyMarked(profile.name, profile.heShe, profile.uid, currentProfile);
            gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
          }
        }, 2000);
      }
      break;
    }

    default:
      console.log('%c TO DO onFail in eoiBlock', 'font-size: 18px', type, source);
  }
  return null;
};
