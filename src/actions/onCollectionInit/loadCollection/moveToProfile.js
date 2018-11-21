/* eslint camelcase: 0 */
import raf from 'raf';

import types from '../../../action_types';
import preloadProfileList, { isProfileLoaded } from './preloadProfileList';
import markProfileViewed from './markProfileViewed';

// type Timeout
const Timeout = () => {
  let timerId = null;
  return {
    create: (fn, delay) => (timerId = setTimeout(fn, delay)),
    cancel: () => timerId && clearTimeout(timerId),
  };
};

// moveCollection :: (Uid, History, Params) -> ()
export const moveCollection = (uid, history, { dispatch, getState }) => {
  const { uids, urls } = getState().profilePage.collection;
  const index = uids.indexOf(uid);
  if (index < 0) return console.log('ERROR: No prev/next uid', index, uid, uids);

  const url = urls[index];
  if (!url) return console.log('ERROR: No prev/next url', index, uid, urls);

  return history.replace(url);
};

// timer :: Timeout
const timer = Timeout();

// moveToProfile :: (Uid, number, RouterHistory) -> (Function, Function) -> CancelTimerFunction
export default (uid, delayDuration = 2000, history) => (dispatch, getState) => {
  const { profiles, profilePage: { collection: { uids, prefetching, prefetchedProfiles = {} } } } = getState();
  const index = uids.indexOf(uid);

  // Preload profiles
  if (!prefetching) {
    preloadProfileList(uid, { dispatch, getState });
  }

  // Mark current profile as viewed
  raf(() => markProfileViewed(uid, { dispatch, getState }));

  // Force render if prefetched profiles are left unrendered
  if (!isProfileLoaded(profiles)(uid) && !!prefetchedProfiles[uid]) {
    const prefetchedCache = uids.slice(index).reduce((arr, id) => (prefetchedProfiles[id] ? [...arr, prefetchedProfiles[id]] : arr), []);

    dispatch({ type: types.PROFILE_LIST_REQUEST, payload: { spinner: true } });
    raf(() =>
      dispatch({
        type: types.PROFILE_LIST_SUCCESS,
        payload: { profiles: prefetchedCache },
      }),
    );

    setTimeout(() => dispatch({ type: types.PROFILE_LIST_POSTSUCCESS }), 600);
  }
  dispatch({ type: types.PROFILE_PAGE_SUCCESS, payload: profiles[uid] });
  // Cancel previous calls to moveCollection and make a new one
  timer.cancel();
  timer.create(() => moveCollection(uid, history, { dispatch, getState }), delayDuration);

  return timer.cancel;
};
