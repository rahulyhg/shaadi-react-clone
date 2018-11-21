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
  url: '/profile/daily-recommendations?loc=top-nav&from=menu',
  isExternal: true,
  isActive: false,
  count: 0,
};

const recommendations = (state = recommendationsInitialState, action) => {
  switch (action.type) {
    case types.EOI_SUCCESS: {
      const { type, source } = action.payload;
      if (['connect_mobile', 'accept_mobile'].includes(type) && source === 'daily-recommendations') {
        return {
          ...state,
          count: state.count - 1 || 0,
        };
      }
      return {
        ...state,
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
  key: 'msite-search',
  label: 'Search',
  path: '/search',
  otherPaths: [],
  refs: [],
  url: '/search',
  isExternal: true,
  isActive: false,
  count: 0,
};

const searchMatches = (state = newMatchesInitialState, action) => {
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

const discoverInitialState = {
  key: 'discover',
  label: 'Discover',
  path: '/profile/discovery',
  otherPaths: [
    '/search/discovery/premium',
    '/search/discovery/recent-visitors',
    '/search/discovery/premium-viewed',
    '/search/discovery/recent-visitors-viewed',
    '/search/discovery/recently-joined',
  ],
  refs: [
    'discover_recent_visitors_landing',
    'discovery_broader_matches_landing',
    'discovery_newly_joined_unviewed',
    'discovery_newly_joined_unviewed_2ways',
    'discovery_newly_joined_unviewed_2ways_grid',
    'discovery_newly_joined_unviewed_grid',
    'discovery_newly_joined_viewed',
    'discovery_newly_joined_viewed_2ways',
    'discovery_newly_joined_viewed_2ways_grid',
    'discovery_newly_joined_viewed_grid',
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
    'discovery_recenly_joined_landing',
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
    'matches-recently_joined',
    'new-matchmail',
    'recently-joined-unviewed',
    'recently-joined-unviewed_grid',
    'recently-joined-viewed',
    'recently-joined-viewed_grid',
    'widget-myshaadi_discovery_newly_joined',
    'widget-myshaadi_discovery_recent_profile_visitors',
    'widget-myshaadi_recent_profile_visitors',
    'widget-myshaadi_recently_joined',
    'widget-myshaadi_recently_joined_grid',
    'widget-myshaadi_recently_updated',
    'widget-profile_recently_joined',
    'discovery_broader_landing',
    'discovery_reverse_landing',
  ],
  url: '/profile/discovery?loc=top-nav',
  isExternal: true,
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
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS: {
      const { experiments } = action.payload;
      const nearMeBucket = (experiments && experiments.experiments && experiments.experiments.near_me.bucket) || 'A';
      const otherPaths = state.otherPaths.filter(type => !/^\/search\/discovery\/recently-joined/.test(type));
      const refs = state.refs.filter(ref => !/newly_joined|recently_joined|recenly_joined|recently-joined/g.test(ref));
      if (nearMeBucket === 'B') {
        return {
          ...state,
          label: 'More Matches',
          isExternal: true,
          keyB: 'moreMatches',
          refs: [
            ...refs,
            'widget-preferred_broader_matches',
            'widget-search_broader_matches',
            'matches-broader_unviewed',
            'matches-broader_unviewed_grid',
            'matches-broader_viewed',
            'matches-broader_viewed_grid',
            'matches-reverse',
            'matches-reverse_grid',
          ],
          otherPaths: [...otherPaths, '/search/broader/viewed', '/search/broader', '/search/personal'],
        };
      }
      return state;
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
  isExternal: true,
  isActive: false,
  count: 0,
};

const broader = (state = broaderInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS: {
      return {
        ...state,
        count: action.payload.meta.category === 'broader' ? action.payload.meta.max : state.count,
      };
    }
    case types.SESSION_SUCCESS: {
      const searchMigrationBucket = action.payload.experiments.experiments.msite_search_migration.bucket;

      if (searchMigrationBucket === 'B') {
        return {
          ...state,
          isExternal: false,
        };
      }
      return state;
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
  isExternal: true,
  isActive: false,
  count: 0,
};

const reverse = (state = reverseInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS: {
      return {
        ...state,
        count: action.payload.meta.category === 'reverse' ? action.payload.meta.max : state.count,
      };
    }
    case types.SESSION_SUCCESS: {
      const searchMigrationBucket = action.payload.experiments.experiments.msite_search_migration.bucket;
      if (searchMigrationBucket === 'B') {
        return {
          ...state,
          isExternal: false,
        };
      }
      return state;
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
  isExternal: true,
  isActive: false,
  count: 0,
};

const twoWay = (state = twoWayInitialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS: {
      return {
        ...state,
        count: action.payload.meta.category === '2-way' ? action.payload.meta.max : state.count,
      };
    }
    case types.SESSION_SUCCESS: {
      const searchMigrationBucket = action.payload.experiments.experiments.msite_search_migration.bucket;

      if (searchMigrationBucket === 'B') {
        return {
          ...state,
          isExternal: false,
        };
      }
      return state;
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
  label: 'Viewed',
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
  isExternal: true,
  isActive: false,
  count: 0,
};

const viewed = (state = viewedInitialState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS: {
      const nearMeBucket = action.payload.experiments.experiments.near_me.bucket;

      if (nearMeBucket === 'B') {
        return {
          ...state,
          label: 'Recently Viewed',
          isExternal: true,
        };
      }
      return state;
    }
    default:
      return commmonSubReducer(state, action);
  }
};

/* matches Top menu */

const nav = (state, action) => {
  const newState = [
    searchMatches(state[0], action),
    recommendations(state[1], action),
    preferred(state[2], action),
    discover(state[3], action),
    broader(state[4], action),
    twoWay(state[5], action),
    reverse(state[6], action),
    shortlists(state[7], action),
    viewed(state[8], action),
  ];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const matchesInitialState = {
  key: 'matches',
  label: 'Matches',
  path: '/profile/daily-recommendations',
  url: '/profile/daily-recommendations?loc=top-nav&cltrk=y',
  isExternal: true,
  isActive: false,
  count: 0,
  topBarMatches: 0,
  nav: nav([], {}),
};

export default function(state = matchesInitialState, action) {
  switch (action.type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive:
          state.nav.some(item => item.path === action.payload.pathname || item.otherPaths.includes(action.payload.pathname)) ||
          state.path === action.payload.pathname,
      };
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_REQUEST:
    case types.EOI_SUCCESS:
      return {
        ...state,
        nav: nav(state.nav, action),
      };
    case types.EVT_REF: {
      if (!action.payload || action.payload.length === 0) {
        return state;
      }
      const { evt_ref } = action.payload;
      const setProfilesBack = action.payload.set_profiles_back || '';
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
    case types.COUNTS_SUCCESS:
      return {
        ...state,
        count: action.payload.counts.matches,
        topBarMatches: action.payload.counts.topBarMatches,
        nav: nav(state.nav, action),
      };
    case types.SESSION_SUCCESS: {
      return {
        ...state,
        nav: nav(state.nav, action),
      };
    }
    default:
      return state;
  }
}
