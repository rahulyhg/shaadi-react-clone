/* eslint camelcase: 0 */
import types from '../../action_types';
import { decode64, createSubNavReducer, isMenuActive } from '../utils';

const commmonSubReducer = createSubNavReducer();

/* search Sub-menus */

const basicSearchInitialState = {
  key: 'basicSearch',
  label: 'Basic Search',
  title: 'Quickest way to find matches',
  path: '/search/basic_search',
  url: '/search?search_type=basic_search&loc=top-nav',
  refs: ['searchresults-basic', 'searchresults-basic_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const basicSearch = (state = basicSearchInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const advancedSearchState = {
  key: 'advancedSearch',
  label: 'Advanced Search',
  title: 'Use this advanced search to find perfect match',
  path: '/search/smart_search',
  url: '/search?search_type=smart_search&loc=top-nav',
  refs: ['search_results-advanced', 'search_results-advanced_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const advancedSearch = (state = advancedSearchState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const whoIsOnlineState = {
  key: 'whoIsOnline',
  label: 'Online Now',
  title: 'Search for profiles who are available for chat',
  path: '/search/online',
  url: '/search?search_type=whoisonline&loc=top-nav',
  refs: ['search_results-who_is_online', 'search_results-who_is_online_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const whoIsOnline = (state = whoIsOnlineState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const specialCasesState = {
  key: 'specialCases',
  label: 'Special Cases',
  title: 'Find differently abled profiles',
  path: '/search/specialcase',
  url: '/search?search_type=specialcase_search&loc=top-nav',
  refs: ['search_results-special_cases', 'search_results-special_cases_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const specialCases = (state = specialCasesState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const astroSearchState = {
  key: 'astroSearch',
  label: 'Astro Search',
  path: '/search/astro',
  url: '/search?search_type=astrology_search&loc=top-nav',
  refs: ['search_results-astro', 'search_results-astro_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const astroSearch = (state = astroSearchState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const savedSearchesState = {
  key: 'savedSearches',
  label: 'My Saved Searches',
  path: '/search/ss',
  url: '/search/saved-search/list',
  refs: ['search_results-saved', 'search_results-saved_grid'],
  isExternal: true,
  isActive: false,
  count: 0,
};

const savedSearches = (state = savedSearchesState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

/* search Top menu */

const nav = (state, action) => {
  const newState = [
    basicSearch(state[0], action),
    advancedSearch(state[1], action),
    whoIsOnline(state[2], action),
    specialCases(state[3], action),
    savedSearches(state[4], action),
    astroSearch(state[5], action),
  ];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const searchInitialState = {
  key: 'search',
  label: 'Search',
  url: '/search?loc=top-nav',
  isExternal: true,
  isActive: false,
  count: 0,
  nav: nav([], {}),
};

export default function(state = searchInitialState, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive: isMenuActive({ payload, state }),
      };
    case types.EVT_REF: {
      if (!payload || payload.length === 0) {
        return state;
      }
      const { evt_ref } = payload;
      const evt = evt_ref && decode64(evt_ref);
      if (!state.nav.some(n => (n.refs || []).includes(evt))) {
        return state;
      }
      return {
        ...state,
        isActive: true,
        nav: nav(state.nav, { ...action, payload: evt }),
      };
    }
    default:
      return state;
  }
}
