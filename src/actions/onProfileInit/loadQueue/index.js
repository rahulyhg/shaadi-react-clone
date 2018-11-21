/* eslint camelcase: 0 */

import { parse } from 'qs';
import loadSearchMatches from './loadSearchMatches';
import loadOtherMatches from './loadOtherMatches';
import loadSetProfiles from './loadSetProfiles';
import loadDRProfiles from './loadDRProfiles';

export default (uid, dispatch, getState, location) => {
  const params = { dispatch, getState };
  const query = parse(location.search.slice(1));

  if (location.pathname.indexOf('daily-recommendations') >= 0) {
    loadDRProfiles(params, uid, query);
  } else if (query.set_profiles) {
    loadSetProfiles(params, uid, query);
  } else if (query.ubt) {
    loadOtherMatches(params, uid, query.ubt, query);
  } else {
    loadSearchMatches(params, uid, query.pg_ubt, query);
  }
};
