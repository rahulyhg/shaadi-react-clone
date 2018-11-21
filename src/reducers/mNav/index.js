/* eslint camelcase: 0 */
import { decode64 } from '../utils';
import types from '../../action_types';

import matches from './matches';
import chat from './chat';
import inbox from './inbox';

const nav = (state, action) => {
  const newState = [matches(state[0], action), inbox(state[1], action), chat(state[2], action)];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const initialState = nav([], {});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UNAUTH:
      return initialState; // in future we need to make sure whether this is the right behavior
    case types.ROUTE_CHANGE:
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_REQUEST:
    case types.GET_PROFILE_PHOTOS_SUCCESS:
    case types.GET_PROFILE_ASTRO_SUCCESS:
    case types.MY_SHAADI_SUBMENU_SUCCESS:
    case types.SESSION_SUCCESS:
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE: {
      return nav(state, action);
    }
    case types.EVT_REF: {
      if (!action.payload || action.payload.length === 0) {
        return state;
      }
      const { evt_ref } = action.payload;
      const evt = evt_ref && decode64(evt_ref);
      if (evt && !state.some(top => top.nav.some(n => (n.refs || []).includes(evt)))) {
        console.log('%c TO DO: Add mNav EVT_REF', 'font-size: 300%', evt);
      }
      return nav(state, action);
    }
    default:
      return state;
  }
}
