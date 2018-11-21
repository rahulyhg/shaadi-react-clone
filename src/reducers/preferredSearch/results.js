/* eslint camelcase: 0 */
/* global window */

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
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || source !== 'preferredSearch') {
        return state;
      }
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.PHOTO_EOI_REQUEST: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || source !== 'preferredSearch') {
        return state;
      }
      return {
        ...state,
        photoLoading: true,
      };
    }
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
  experiments_bucket: 'A',
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    case types.PREFERRED_SEARCH_REQUEST:
      return { ...state, query: action.payload, latest_request_id: action.payload.request_id };
    case types.PREFERRED_SEARCH_FAIL:
      return initialState;
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const evt = `matches-${action.payload.meta.type === 'most_preferred' ? 'most_preferred' : 'preferred'}${
        action.payload.meta.viewed === 'N' ? '_unviewed' : '_viewed'
      }${action.payload.meta.type === '2-way' ? '_2ways' : ''}${action.payload.meta.format === 'grid' ? '_grid' : ''}`;
      return {
        ...state,
        results_id: action.payload.meta.results_id,
        permalink: action.payload.permalink,
        evt,
        pg_ubt: encode64(`${(action.payload.permalink || '/search/partner').split('?')[0]}||${perPage('/search/partner')}`),
        evt_ref: encode64(evt),
        type: action.payload.type,
        displayed_request_id: action.payload.meta.request_id,
        items: action.payload.profiles.map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
        tooltip: tooltipReducer(undefined, action),
      };
    }
    case types.SESSION_SUCCESS: {
      const webCtaBucket =
        (action.payload && action.payload.experiments && action.payload.experiments.experiments.webCTA_Dec2017.bucket) || 'A';
      return {
        ...state,
        experiments_bucket: webCtaBucket,
      };
    }
    case types.ALERT_SHOW:
    case types.ALERT_HIDE: {
      const tooltipPageShow = action.payload.page || '';
      const tooltipPositionShow = action.payload.position || '';
      const tooltipPositionHide = (action.payload.positions && action.payload.positions[0]) || '';
      const hidePopup = (action.payload.params && action.payload.params.hidePopup) || false;
      if (
        !hidePopup &&
        ['preferredSearch', 'otherSearch', 'any'].includes(tooltipPageShow) &&
        (['photo', 'eoi'].includes(tooltipPositionShow) || ['photo', 'eoi'].includes(tooltipPositionHide))
      ) {
        return {
          ...state,
          tooltip: tooltipReducer(state.tooltip, action),
        };
      }
      return state;
    }
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
