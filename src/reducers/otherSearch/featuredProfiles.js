import types from '../../action_types';
import { createAlertReducer, encode64, identifyCommunity } from '../utils';
import perPage from '../../constants/perPage';

const community = identifyCommunity(window.location.hostname);

const tooltipReducer = createAlertReducer(['otherSearch'], ['eoi', 'photo', 'horoscope', 'bulk', 'format']);

const initialItemState = {
  uid: null,
  justNow: false,
  eoiLoadingStyle: 'none',
  photoLoading: false,
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const { uid, source, error } = action.payload;
      if (uid !== state.uid || source !== 'otherSearch') {
        return state;
      }
      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
        displayStatusMessage: source === 'otherSearch' && error && error.status === 400 ? error.message : '',
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;
      if (uid !== state.uid || source !== 'otherSearch') {
        return state;
      }
      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        actionType: type || '',
      };
    }
    case types.OTHER_SEARCH_SUCCESS: {
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
  permalink: '/search/partner',
  pg_ubt: encode64(`https://${community.myDomain}/search/partner`),
  evt_ref: '',
  query: {},
  items: [],
  tooltip: tooltipReducer(undefined, {}),
  goPremiumRef: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.EOI_REQUEST:
      return {
        ...state,
        items: state.items.map(i => resultItemReducer(i, action)),
      };
    case types.OTHER_SEARCH_REQUEST:
      return initialState;
    case types.OTHER_SEARCH_SUCCESS: {
      if (
        action.payload.permalink.indexOf('/search/new-matches') !== -1 ||
        action.payload.permalink.indexOf('/search/partner') !== -1 ||
        action.payload.permalink.indexOf('/search/near-me') !== -1
      ) {
        const evt = `${action.payload.evtref}`;
        return {
          ...state,
          results_id: action.payload.meta.results_id,
          permalink: action.payload.permalink,
          evt,
          pg_ubt: encode64(`${(action.payload.permalink || '/search/partner').split('?')[0]}||${perPage(action.payload.pagepath)}`),
          evt_ref: encode64(evt),
          type: action.payload.type,
          displayed_request_id: action.payload.meta.request_id,
          items: action.payload.featuredProfiles.map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
          tooltip: tooltipReducer(undefined, action),
          allLinkCount: action.payload.counts,
          goPremiumRef:
            action.payload.permalink.indexOf('/search/near-me') !== -1
              ? 'featured_profiles_near_me'
              : action.payload.permalink.indexOf('/search/new-matches') !== -1 ? 'featured_profiles_new_matches' : '',
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
