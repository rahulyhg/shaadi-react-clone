/* eslint camelcase: 0 */
import types from '../../action_types';

import myShaadi from './myShaadi';
import matches from './matches';
import search from './search';
import inbox from './inbox';

const nav = (state, action) => {
  const newState = [myShaadi(state[0], action), matches(state[1], action), search(state[2], action), inbox(state[3], action)];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const initialState = nav([], {});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case types.UNAUTH:
      return initialState;
    case types.ROUTE_CHANGE:
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS:
    case types.INBOX_DATA_SUCCESS:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_REQUEST:
    case types.GET_PROFILE_PHOTOS_SUCCESS:
    case types.GET_PROFILE_ASTRO_SUCCESS:
    case types.MY_SHAADI_SUBMENU_SUCCESS:
    case types.SESSION_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.DR_PROFILES_SUCCESS:
    case types.UPDATE_NAV:
      return nav(state, action);
    case types.EVT_REF:
      return !action.payload || action.payload.length === 0 ? state : nav(state, action);
    default:
      return state;
  }
}
