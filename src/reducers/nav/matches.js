/* eslint camelcase: 0 */
import types from '../../action_types';
import { decode64, createSubNavReducer } from '../utils';

const commmonSubReducer = createSubNavReducer();

/* matches Sub-menus */

const recommendationsInitialState = {
  key: 'recommendations',
  label: 'Recommendations',
  path: '/profile/daily-recommendations',
  otherPaths: [],
  url: '/profile/daily-recommendations?from=menu',
  isExternal: false,
  isActive: false,
  count: 0,
};

const recommendations = (state = recommendationsInitialState, action) => {
  switch (action.type) {
    case types.DR_PROFILES_SUCCESS: {
      return {
        ...state,
        count: action.payload.actionNotTaken || 0,
      };
    }
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      return {
        ...state,
        isExternal: !action.payload.counts.recommendations_total,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const preferredInitialState = {
  key: 'matches-preferred',
  label: 'Preferred',
  path: '/search/partner',
  otherPaths: ['/search/partner/viewed'],
  refs: [
    'widget-myshaadi_most_my_matches',
    'widget-myshaadi_my_matches',
    'matches-preferred_viewed',
    'matches-preferred_viewed_grid',
    'matches-preferred_unviewed',
    'matches-preferred_unviewed_grid',
    'matches-most_preferred_viewed',
    'matches-most_preferred_viewed_grid',
    'matches-most_preferred_unviewed',
    'matches-most_preferred_unviewed_grid',
    'matches-preferred_viewed_2ways',
    'matches-preferred_viewed_2ways_grid',
    'matches-preferred_unviewed_2ways',
    'matches-preferred_unviewed_2ways_grid',
    'widget-search_preferred_matches',
    'pre_logout_partnermatches',
  ],
  url: '/search/partner?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const preferred = (state = preferredInitialState, action) => {
  switch (action.type) {
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
      return {
        ...state,
        count: action.payload.meta.max,
      };
    case types.OTHER_SEARCH_SUCCESS: {
      const { counts } = action.payload;
      return {
        ...state,
        count: (counts !== undefined && counts.matches) || 0,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const newMatchesInitialState = {
  key: 'recently-joined',
  label: 'New Matches',
  path: '/search/new-matches',
  otherPaths: ['/search/new-matches/viewed', '/search/discovery/recently-joined', '/search/discovery/recently-joined-viewed'],
  refs: [
    'matches-new_matches_unviewed',
    'matches-new_matches_unviewed_grid',
    'matches-new_matches_viewed',
    'matches-new_matches_viewed_grid',
    'new-matchmail-b',
    'discovery_newly_joined_unviewed',
    'discovery_newly_joined_unviewed_2ways',
    'discovery_newly_joined_unviewed_2ways_grid',
    'discovery_newly_joined_unviewed_grid',
    'discovery_newly_joined_viewed',
    'discovery_newly_joined_viewed_2ways',
    'discovery_newly_joined_viewed_2ways_grid',
    'discovery_newly_joined_viewed_grid',
    'discovery_recenly_joined_landing',
    'matches-recently_joined',
    'recently-joined-unviewed',
    'recently-joined-unviewed_grid',
    'recently-joined-viewed',
    'recently-joined-viewed_grid',
    'widget-myshaadi_recently_joined',
    'widget-myshaadi_recently_joined_grid',
    'widget-profile_recently_joined',
  ],
  url: '/search/new-matches?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const newMatches = (state = newMatchesInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_REQUEST: {
      return {
        ...state,
      };
    }
    case types.OTHER_SEARCH_SUCCESS: {
      const { counts } = action.payload;
      return {
        ...state,
        count: (counts !== undefined && counts['recently-joined']) || 0,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const nearMeInitialState = {
  key: 'near_me',
  label: 'Near Me',
  path: '/search/near-me',
  otherPaths: ['/search/near-me/viewed'],
  refs: ['matches-near_me_unviewed', 'matches-near_me_unviewed_grid', 'matches-near_me_viewed', 'matches-near_me_viewed_grid'],
  url: '/search/near-me?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const nearMe = (state = nearMeInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_REQUEST: {
      return {
        ...state,
      };
    }
    case types.OTHER_SEARCH_SUCCESS: {
      const { counts } = action.payload;
      return {
        ...state,
        count: (counts !== undefined && counts.near_me) || 0,
      };
    }

    default:
      return commmonSubReducer(state, action);
  }
};

const discoverInitialState = {
  key: 'discover',
  keyB: 'moreMatches',
  label: 'More Matches',
  path: '/profile/discovery',
  otherPaths: [
    '/search/discovery/premium',
    '/search/discovery/recent-visitors',
    '/search/discovery/premium-viewed',
    '/search/discovery/recent-visitors-viewed',
    '/search/broader/viewed',
    '/search/broader',
    '/search/personal',
  ],
  refs: [
    'discover_recent_visitors_landing',
    'discovery_broader_matches_landing',
    'discovery_premium_all',
    'discovery_premium_all_grid',
    'discovery_premium_landing',
    'discovery_premium_unviewed',
    'discovery_premium_unviewed_2ways',
    'discovery_premium_unviewed_2ways_grid',
    'discovery_premium_unviewed_grid',
    'discovery_premium_viewed',
    'discovery_premium_viewed_2ways',
    'discovery_premium_viewed_2ways_grid',
    'discovery_premium_viewed_grid',
    'discovery_recent_visitors_unviewed',
    'discovery_recent_visitors_unviewed_15',
    'discovery_recent_visitors_unviewed_15_2ways',
    'discovery_recent_visitors_unviewed_15_2ways_grid',
    'discovery_recent_visitors_unviewed_15_grid',
    'discovery_recent_visitors_unviewed_2ways',
    'discovery_recent_visitors_unviewed_2ways_grid',
    'discovery_recent_visitors_unviewed_grid',
    'discovery_recent_visitors_viewed',
    'discovery_recent_visitors_viewed_15',
    'discovery_recent_visitors_viewed_15_2ways',
    'discovery_recent_visitors_viewed_15_2ways_grid',
    'discovery_recent_visitors_viewed_15_grid',
    'discovery_recent_visitors_viewed_2ways',
    'discovery_recent_visitors_viewed_2ways_grid',
    'discovery_recent_visitors_viewed_grid',
    'discovery_reverse_matches_landing',
    'mailer-recent_visitors_daily',
    'new-matchmail',
    'widget-myshaadi_discovery_recent_profile_visitors',
    'widget-myshaadi_recent_profile_visitors',
    'widget-myshaadi_recently_updated',
    'discovery_broader_landing',
    'discovery_reverse_landing',
    'widget-preferred_broader_matches',
    'widget-search_broader_matches',
    'matches-broader_unviewed',
    'matches-broader_unviewed_grid',
    'matches-broader_viewed',
    'matches-broader_viewed_grid',
    'matches-reverse',
    'matches-reverse_grid',
  ],
  url: '/profile/discovery?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const discover = (state = discoverInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS: {
      const { counts } = action.payload;
      return {
        ...state,
        count: (counts !== undefined && counts.discovery_newly_joined + counts.discovery_premium + counts.discovery_recent_visitors) || 0,
      };
    }

    default:
      return commmonSubReducer(state, action);
  }
};

const broaderInitialState = {
  key: 'broader',
  label: 'Broader',
  path: '/search/broader',
  otherPaths: ['/search/broader/viewed'],
  refs: [
    'widget-preferred_broader_matches',
    'widget-search_broader_matches',
    'matches-broader_unviewed',
    'matches-broader_unviewed_grid',
    'matches-broader_viewed',
    'matches-broader_viewed_grid',
  ],
  url: '/search/broader?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const broader = (state = broaderInitialState, action) => {
  switch (action.type) {
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
      return {
        ...state,
        count: 0,
      };
    case types.OTHER_SEARCH_REQUEST: {
      return {
        ...state,
        count: 0,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const reverseInitialState = {
  key: 'reverse',
  label: 'Reverse',
  path: '/search/personal',
  otherPaths: [],
  refs: ['matches-reverse', 'matches-reverse_grid'],
  url: '/search/personal?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const reverse = (state = reverseInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS:
      return {
        ...state,
      };
    case types.OTHER_SEARCH_REQUEST: {
      return {
        ...state,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const twoWayInitialState = {
  key: 'twoWay',
  label: '2-Way',
  path: '/search/ematchmaker',
  otherPaths: [],
  refs: ['matches-2way', 'matches-2way_grid'],
  url: '/search/ematchmaker?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const twoWay = (state = twoWayInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS:
      return {
        ...state,
      };
    case types.OTHER_SEARCH_REQUEST: {
      return {
        ...state,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const shortlistsInitialState = {
  key: 'shortlists',
  label: 'Shortlists',
  path: '/profile/shortlist',
  otherPaths: [],
  url: '/profile/shortlist?loc=top-nav',
  isExternal: true,
  isActive: false,
  count: 0,
};

const shortlists = (state = shortlistsInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const viewedInitialState = {
  key: 'viewed',
  label: 'Recently Viewed',
  path: '/profile/viewed',
  otherPaths: [],
  refs: [
    'landing-viewed_profiles',
    'landing-ignored_members',
    'landing-blocked_members',
    'list-viewed_profiles',
    'list-ignored_members',
    'list-blocked_members',
    'list-shortlisted_members',
    'recently-viewed_viewed_landing',
    'recently-viewed_shortlisted_landing',
    'recently-viewed_ignored_landing',
    'recently-viewed_blocked_landing',
  ],
  url: '/profile/viewed?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
};

const viewed = (state = viewedInitialState, action) => commmonSubReducer(state, action);

/* matches Top menu */

const nav = (state, action) => {
  const newState = [
    newMatches(state[0], action),
    recommendations(state[1], action),
    preferred(state[2], action),
    nearMe(state[3], action),
    discover(state[4], action),
    broader(state[5], action),
    reverse(state[6], action),
    twoWay(state[7], action),
    shortlists(state[8], action),
    viewed(state[9], action),
  ];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const matchesInitialState = {
  key: 'matches',
  label: 'Matches',
  path: '/profile/daily-recommendations',
  url: '/profile/daily-recommendations?cltrk=y',
  isExternal: false,
  isActive: false,
  count: 0,
  topBarMatches: 0,
  nav: nav([], {}),
};

export default function(state = matchesInitialState, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive:
          payload &&
          (state.nav.some(item => item.path === payload.pathname || item.otherPaths.includes(payload.pathname)) ||
            state.path === payload.pathname),
      };
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_REQUEST:
      return {
        ...state,
        nav: nav(state.nav, action),
      };
    case types.DR_PROFILES_SUCCESS:
      return {
        ...state,
        topBarMatches: action.payload.actionNotTaken || state.count,
        nav: nav(state.nav, action),
      };
    case types.EVT_REF: {
      if (!payload || payload.length === 0) {
        return state;
      }
      const { evt_ref } = payload;
      const setProfilesBack = payload.set_profiles_back || '';
      let evt = evt_ref && decode64(evt_ref);
      if (['partnermatches'].includes(setProfilesBack)) {
        evt = `${evt}_${setProfilesBack}`;
      }
      if (!state.nav.some(n => (n.refs || []).includes(evt))) {
        return state;
      }
      return {
        ...state,
        isActive: true,
        nav: nav(state.nav, { ...action, payload: evt }),
      };
    }
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      if (!payload || !payload.counts) {
        return state;
      }
      const { counts } = payload;

      return {
        ...state,
        url: (!counts.recommendations && preferredInitialState.path) || state.url,
        path: (!counts.recommendations && preferredInitialState.path) || state.path,
        count: payload.counts.matches,
        topBarMatches: payload.counts.topBarMatches,
        nav: nav(state.nav, action),
      };
    }
    case types.SESSION_SUCCESS: {
      return {
        ...state,
        nav: nav(state.nav, action),
      };
    }
    case types.UPDATE_NAV: {
      const { url = state.url } = action.payload;
      return {
        ...state,
        url,
        path: url,
      };
    }
    default:
      return state;
  }
}
