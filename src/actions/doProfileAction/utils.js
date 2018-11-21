import { parse, stringify } from 'qs';
import get from 'lodash/get';
import types from '../../action_types';
import doDaTracking from '../doDaTracking';
import { currentPath } from '../../helpers/urls';

const nextProfileUrl = (history, source, payload = {}) => {
  if (source === 'chat' || ['bulkConnect', 'bulkConnect_confirm'].includes(payload.type)) return null;
  if (
    !['profile', 'daily-recommendations'].includes(source) &&
    !['/profile/daily-recommendations', '/profile'].includes(history.location.pathname)
  )
    return null;
  if (payload.nextUrl && (payload.nextUrl.indexOf('/profile?') === 0 || payload.nextUrl.indexOf('/profile/daily-recommendations') === 0))
    return payload.nextUrl;

  if (!payload.nextUid) return null;
  const q = parse(`${history.location.search}`.slice(1));
  q.profileid = payload.nextUid;
  return `/profile?${stringify(q)}`;
};
const getRedirectionTimeInterval = (actionSource, type, bucket = 'A', listRef) => {
  const RedirectionTimer = {
    A: 2000,
    B: 5000,
    C: 5000,
  };
  if (listRef && listRef === 'unified') return 2000;
  if (bucket !== 'A' && actionSource === 'daily-recommendations' && type === 'skip') {
    return 2000;
  }
  return RedirectionTimer[bucket] || 2000;
};
const gotoNextProfile = (args = {}) => {
  let moveToNextUrl = true;
  const { history, dispatch, nextUrl, getState, type = null, source: actionSource = null } = args;
  const listRef = actionSource === 'profile' && getState().profilePage.pagination.source;

  if ([null, undefined].includes(nextUrl)) return;
  const source = history.location.pathname.indexOf('daily-recommendations') === -1 ? 'profile' : 'daily-recommendations';
  const profilePageBucket = get(getState().session, ['settings', 'experiments', 'profilepage_revamp_abc', 'bucket'], 'A');
  const baseWait = getRedirectionTimeInterval(actionSource, type, profilePageBucket, listRef);
  const currentUrl = currentPath();
  const { profileid = '' } = parse(nextUrl.split('?')[1]);

  if (profileid) {
    if (source === 'profile' && profilePageBucket === 'C' && getState().profilePage.pagination.source !== 'unified') {
      moveToNextUrl = false;
    }
    doDaTracking(source, 'profile_view_on_next', profileid)(dispatch, getState);
  }
  dispatch({ type: types.PROFILE_PREPARE_NEXT, payload: { nextUrl, profileid } });
  if (moveToNextUrl) {
    if (getState().modal.template !== 'none') {
      dispatch({ type: types.POSTPONE_AUTO_MOVE, payload: { nextUrl, profileid, history, source } });
    }
    setTimeout(() => {
      const isModalOpen = getState().modal.template !== 'none';
      const nowUrl = currentPath();
      if (nowUrl !== currentUrl) {
        console.log('%c move to next cancelled', 'color: red; font-size: 20px');
        return null;
      }
      if (isModalOpen) {
        dispatch({ type: types.POSTPONE_AUTO_MOVE, payload: { nextUrl, profileid, history, source } });
      } else {
        const newUrl =
          source === 'daily-recommendations'
            ? nextUrl || getState().dailyRecommendationPage.pagination.nextUrl
            : getState().profilePage.pagination.nextUrl;

        if (nextUrl === nowUrl || nextUrl !== newUrl || !nextUrl) {
          newUrl && history.push(newUrl);
        } else {
          history.push(nextUrl);
        }
      }
      return null;
    }, baseWait);
  }
};

const goProfileUrl = (payload = {}) => {
  const q = { txtprofileid: payload.uid };
  return `/profile?${stringify(q)}`;
};

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const getTrackInfo = source => {
  switch (source) {
    case 'featured':
      return {
        event_loc: 'featured_invitation',
        event_referrer: 'featured_invitation',
        event_referrer_ref: encode64('featured_invitation'),
        event_loc_ref: encode64('featured_invitation'),
      };
    case 'similar_profile':
      return {
        event_loc: 'similar_profile',
        event_referrer: 'similar_profile',
        event_referrer_ref: encode64('similar_profile'),
        event_loc_ref: encode64('similar_profile'),
      };
    default:
      return {};
  }
};

const isExperiment = experiment => getState =>
  get(getState(), ['session', 'settings', 'experiments', 'similar_profile', 'bucket'], 'A') === 'B';

export { nextProfileUrl, gotoNextProfile, goProfileUrl, getTrackInfo, isExperiment, encode64 };
