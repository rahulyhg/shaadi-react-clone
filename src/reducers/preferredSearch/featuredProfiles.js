import get from 'lodash/get';
import types from '../../action_types';
import { createAlertReducer, encode64 } from '../utils';
import perPage from '../../constants/perPage';

const tooltipReducer = createAlertReducer(['preferredSearch'], ['eoi', 'photo', 'horoscope', 'bulk', 'format']);

const initialItemState = {
  uid: null,
  justNow: false,
  eoiLoadingStyle: 'none',
  photoLoading: false,
  actionType: '',
  displayStatusMessage: '',
  eoiClose: false,
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const { uid, source, error } = action.payload;
      if (uid !== state.uid || source !== 'preferredSearch') {
        return state;
      }
      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
        displayStatusMessage: source === 'preferredSearch' && error && error.status === 400 ? error.message : '',
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;
      if (uid !== state.uid || source !== 'preferredSearch') {
        return state;
      }
      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        actionType: type || '',
      };
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      return {
        ...initialItemState,
        uid: action.payload.uid,
      };
    }
    case types.MODAL_SHOW: {
      return {
        ...state,
        eoiClose: false,
      };
    }
    case types.MODAL_HIDE: {
      return {
        ...state,
        eoiClose: !get(action, 'payload.uid'),
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
  pg_ubt: encode64(`/search/partner`),
  evt_ref: '',
  query: {},
  items: [],
  tooltip: tooltipReducer(undefined, {}),
  goPremiumRef: 'featured_profiles_preferred',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.EOI_REQUEST:
    case types.MODAL_HIDE:
    case types.MODAL_SHOW:
      return {
        ...state,
        items: state.items.map(i => resultItemReducer(i, action)),
      };
    case types.PREFERRED_SEARCH_REQUEST:
      return initialState;
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const evt = `matches-${action.payload.meta.type === 'most_preferred' ? 'most_preferred' : 'preferred'}${
        action.payload.meta.viewed === 'N' ? '_unviewed' : '_viewed'
      }${action.payload.meta.type === '2-way' ? '_2ways' : ''}${action.payload.meta.format === 'grid' ? '_grid' : ''}_premiumplus_carousel`;
      return {
        ...state,
        results_id: action.payload.meta.results_id,
        permalink: action.payload.permalink,
        evt,
        pg_ubt: encode64(`${(action.payload.permalink || '/search/partner').split('?')[0]}||${perPage('/search/partner')}`),
        evt_ref: encode64(evt),
        type: action.payload.type,
        displayed_request_id: action.payload.meta.request_id,
        items: action.payload.featuredProfiles.map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
        tooltip: tooltipReducer(undefined, action),
        goPremiumRef: 'featured_profiles_preferred',
      };
    }
    default:
      return state;
  }
}
