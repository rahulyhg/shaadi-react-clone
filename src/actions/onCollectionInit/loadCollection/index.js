/* eslint camelcase: 0 */

import { parse } from 'qs';
import types from '../../../action_types';
import gotoProfile from './gotoProfile';
import loadSearchMatches from './loadSearchMatches';
import loadOtherMatches from './loadOtherMatches';
import loadSetProfiles from './loadSetProfiles';
import loadSingleProfile from './loadSingleProfile';

export default (uid, dispatch, getState, location) => {
  const params = { dispatch, getState };
  const query = parse(location.search.slice(1));
  const { uids, baseUid, leftWall, rightWall } = getState().profilePage.collection;
  const index = uids.indexOf(uid);

  if (index > 0 && index < uids.length - 1) return gotoProfile(params, uid);
  if (baseUid === uid) return gotoProfile(params, uid);
  if (index === 0 && leftWall) return gotoProfile(params, uid);
  if (index === uids.length - 1 && rightWall) return gotoProfile(params, uid);

  dispatch({ type: types.COLLECTION_MOVE, payload: { uid } });

  if (query.set_profiles) {
    loadSetProfiles(params, uid, query);
  } else if (query.ubt) {
    loadOtherMatches(params, uid, query.ubt, query);
  } else if (query.pg_ubt) {
    loadSearchMatches(params, uid, query.pg_ubt, query);
  } else {
    loadSingleProfile(params, uid);
  }
  return null;
};
