import types from '../../action_types';
import { createAlertReducer, encode64 } from '../utils';

const ValidSearches = [
  'discovery_recent_visitors',
  'discovery_premium',
  'broader',
  'reverse',
  'full-profile',
  'shortlisted',
  'ignored',
  'blocked',
];

const tooltipReducer = createAlertReducer(ValidSearches, ['eoi', 'photo', 'horoscope', 'bulk', 'format']);

const initialItemState = {
  uid: null,
  justNow: false,
  eoiLoadingStyle: 'none',
  photoLoading: false,
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || !ValidSearches.includes(source)) {
        return state;
      }
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.PHOTO_EOI_REQUEST: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || !ValidSearches.includes(source)) {
        return state;
      }
      return {
        ...state,
        photoLoading: true,
      };
    }
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || !ValidSearches.includes(source)) {
        return state;
      }
      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle } = action.payload;
      if (uid !== state.uid || !ValidSearches.includes(source)) {
        return state;
      }
      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
      };
    }
    case types.MATCHES_GROUP_SUCCESS: {
      return {
        ...initialItemState,
        uid: action.payload.uid,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  latest_request_id: undefined,
  displayed_request_id: undefined,
  results_id: '',
  permalink: '/profile/discover',
  pg_ubt: '',
  evt_ref: '',
  query: {},
  items: [],
  tooltip: tooltipReducer(undefined, {}),
  count: 0,
  np: 'discovery',
  source: '',
  sourceList: '',
};

const sources = {
  discovery_recent_visitors: [
    'discovery_recent_visitors',
    'recent_vistors',
    encode64('discover_recent_visitors_landing'),
    encode64(`/search/discovery/recent-visitors||20`),
  ],
  discovery_premium: [
    'discovery_premium_landing',
    'premium_matches',
    encode64('discovery_premium_landing'),
    encode64(`/search/discovery/premium||20`),
  ],
  broader: ['discovery_broader_landing', 'broader_matches', encode64('discovery_broader_landing'), encode64(`/search/broader||20`)],
  reverse: ['discovery_reverse_landing', 'reverse_matches', encode64('discovery_reverse_landing'), encode64(`/search/personal||20`)],
  'full-profile': [
    'recently-viewed_viewed_landing',
    'viewed_matches',
    encode64('recently-viewed_viewed_landing'),
    encode64(`/profile/viewed-profiles||20`),
  ],
  shortlisted: [
    'recently-viewed_shortlisted_landing',
    'shortlisted_matches',
    encode64('recently-viewed_shortlisted_landing'),
    encode64(`/profile/shortlist||10`),
  ],
  ignored: [
    'recently-viewed_ignored_landing',
    'ignored_matches',
    encode64('recently-viewed_ignored_landing'),
    encode64(`/profile/ignored-members||10`),
  ],
  blocked: [
    'recently-viewed_blocked_landing',
    'blocked_matches',
    encode64('recently-viewed_blocked_landing'),
    encode64(`/profile/blocked-members||10`),
  ],
  default: ['', '', '', ''],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MATCHES_GROUP_SUCCESS: {
      const sourceType = (sources[action.payload.meta.type] && action.payload.meta.type) || 'default';
      return {
        ...state,
        results_id: action.payload.meta.results_id,
        count: action.payload.meta.max,
        type: action.payload.meta.type,
        category: action.payload.meta.category,
        source: sources[sourceType][0] || '',
        sourceList: sources[sourceType][1] || '',
        evt_ref: sources[sourceType][2] || '',
        pg_ubt: sources[sourceType][3] || '',
        total: action.payload.meta.total,
        displayed_request_id: action.payload.meta.request_id,
        response_type: action.payload.meta.responseType,
        remark: action.payload.meta.remark,
        items: action.payload.profiles.map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
      };
    }
    case types.MATCHES_GROUP_FAIL:
      return initialState;
    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.EOI_REQUEST:
      return {
        ...state,
        items: state.items.map(i => resultItemReducer(i, action)),
      };
    case types.ALERT_SHOW:
    case types.ALERT_HIDE:
    case types.ALERT_HIDE_KEY: {
      return {
        ...state,
        tooltip: tooltipReducer(state.tooltip, action),
      };
    }
    default:
      return state;
  }
}
