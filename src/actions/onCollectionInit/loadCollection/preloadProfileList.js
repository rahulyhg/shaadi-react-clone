/* eslint-disable prettier/prettier */
/* eslint camelcase: 0 */
import { parse } from 'qs';
import get from 'lodash/get';

import types from '../../../action_types';
import apiGetProfileList from '../apiGetProfileList';
import { fetchSearchMatches } from './loadSearchMatches';

const PREFETCH_PROFILE_COUNT = 5;
const PREFETCH_OFFSET = 3;

// Smaller implementations to save us some KBs
const noop = () => {};
const not = fn => a => !fn(a);
const includes = (arr, item) => arr.indexOf(item) !== -1;

// type Uid = string;
// type Params = { dispatch :: Function, getState :: Function, render :: Boolean, spinner :: Boolean };
// type Profile = Object


// preloadProfileList :: (Uid, Params) -> ()
export default (uid, params) => {
  const { getState, render = false } = params;
  const { profiles, profilePage: { collection: { uids } } } = getState();

  // const index = uids.indexOf(uid);
  const loadedProfiles = filterLoadedProfiles(profiles);
  const lastUid = loadedProfiles[loadedProfiles.length - 1];

  // If it is about the reach the end of paginated profiles, call pagination
  // if (uids.length - 1 - PREFETCH_OFFSET === index) {
  //   prefetchPagination(uid, lastUid, params);
  //   return;
  // }

  const lastLoadedIndex = uids.indexOf(lastUid);
  
  if(lastLoadedIndex !== -1) {
    const nextUids = uids
      .slice(lastLoadedIndex + 1, lastLoadedIndex + 1 + PREFETCH_PROFILE_COUNT)
      .filter(not(isProfileReady(profiles)));

    if (nextUids.length && shouldPrefetch(uid, loadedProfiles, { render })) {
      prefetchProfiles(nextUids, params);
    }
  }
};



// filterLoadedProfiles :: Map<Profile> -> Array<Uid>
export const filterLoadedProfiles = profiles =>
  Object.keys(profiles).filter(isProfileLoaded(profiles));


// isProfileReady :: Map<Profile> -> Uid -> bool
export const isProfileReady = profiles => uid =>
  get(profiles, [uid, 'detailed', 'ready']);

// isProfileLoaded :: Map<Profile> -> Uid -> bool
export const isProfileLoaded = profiles => uid =>
  !includes(['default', 'self'], uid) && !!get(profiles, [uid, 'uid']);

// shouldPrefetch :: (Uid, Array<Uid>) -> bool
export const shouldPrefetch = (uid, loadedProfiles, { render = false } = {}) => {
  const currentIndex = loadedProfiles.indexOf(uid);
  if(currentIndex === -1) return false;

  const fromLast = loadedProfiles.length - currentIndex - 1;
  return fromLast === PREFETCH_OFFSET || (render && fromLast <= 0);
};



// onRequest :: Params -> Object -> ()
const onRequest = ({ dispatch, render = false, spinner = false }) => payload => {
  if (render) {
    dispatch({ type: types.PROFILE_LIST_REQUEST, payload: { ...payload, spinner } });
  } else {
    dispatch({ type: types.PROFILES_BACKGROUND_REQUEST, payload: { ...payload, spinner } });
  }
}

// onSuccess :: Params -> Object -> ()
const onSuccess = ({ dispatch, render = false }) => payload => {
  if (render) {
    dispatch({ type: types.PROFILE_LIST_SUCCESS, payload });
    dispatch({ type: types.PROFILE_LIST_POSTSUCCESS, payload });
  } else {
    dispatch({ type: types.PROFILES_BACKGROUND_SUCCESS, payload });
  }
};

// onCollectionSuccess :: Uid -> (any, Params) -> ()
const onCollectionSuccess = uid => (payload, { dispatch }) => dispatch({
  type: types.COLLECTION_SUCCESS,
  payload: { ...payload, uid },
});



// prefetchProfiles :: (Array<Uid>, Params) -> ()
export const prefetchProfiles = (uids, params) => {
  const { getState } = params;

  params.file_extension =
    getState().config.app.webp !== '0'
      ? 'webp'
      : params.file_extension;

  apiGetProfileList({ uids }, params, onRequest(params), onSuccess(params), noop, false);
};

// prefetchProfiles :: (Uid, Uid, Params) -> ()
export const prefetchPagination = (uid, lastUid, params) => {
  const query = parse(window.location.search.slice(1));
  fetchSearchMatches(undefined, onCollectionSuccess(uid))(params, lastUid, query.pg_ubt, query);
};
