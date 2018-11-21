import types from '../../action_types';
import { encode64, createAlertReducer } from '../utils';

const tooltipReducer = createAlertReducer(['inbox'], ['eoi', 'photo', 'horoscope', 'bulk', 'format']);

const initialItemState = {
  eoiLoadingStyle: 'none',
  photoLoading: false,
  toggleCard: false,
};
const validateAction = source => ['inbox', 'featured'].includes(source);

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS: {
      const { uid } = action.payload;
      if (uid !== state.uid) {
        return state;
      }
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.PHOTO_EOI_REQUEST: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || !validateAction(source)) {
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
      if (uid !== state.uid || !validateAction(source)) {
        return state;
      }
      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
        source,
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;
      if (uid !== state.uid || !validateAction(source)) {
        return state;
      }

      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        eoiReqType: type,
        source,
      };
    }
    case types.MODAL_HIDE: {
      const uid = (action.payload && action.payload.uid) || null;
      if (state.uid !== uid) {
        return state;
      }
      return {
        ...state,
        toggleCard: true,
      };
    }

    default:
      return state;
  }
};
const initialState = {
  results_id: '',
  permalink: '/inbox/pending/recent-interests',
  evt: '',
  evt_ref: '',
  items: [],
  tooltip: tooltipReducer(undefined, {}),
  source: 'unified',
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_REQUEST:
    case types.MODAL_HIDE: {
      return {
        ...state,
        items: state.items.map(i => resultItemReducer(i, action)),
      };
    }
    case types.INBOX_DATA_SUCCESS: {
      const { evtRef, results_id, permalink } = action.payload.meta;
      return {
        ...state,
        results_id,
        evt: evtRef,
        evt_ref: encode64(evtRef),
        tooltip: tooltipReducer(undefined, action),
        displayed_request_id: action.payload.meta.request_id,
        permalink,
        items: action.payload.items,
      };
    }
    case types.ALERT_SHOW:
    case types.ALERT_HIDE: {
      return {
        ...state,
        tooltip: tooltipReducer(state.tooltip, action),
      };
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
