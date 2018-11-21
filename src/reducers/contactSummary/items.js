import types from '../../action_types';
import { createAlertReducer } from '../utils';

const tooltipReducer = createAlertReducer(['contactSummary'], ['photo', 'eoi']);

const initialItemState = {
  uid: null,
  photoLoading: false,
  changeCursorStatus: true,
  displayStatusMessage: '',
  viewSmsShowStatus: false,
};

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
        changeCursorStatus: action.payload.albumStatus !== 'photoRequestSent',
      };
    }
    case types.PHOTO_EOI_REQUEST: {
      const { uid } = action.payload;
      if (uid !== state.uid) {
        return state;
      }
      return {
        ...state,
        photoLoading: true,
      };
    }
    case types.CONTACT_SUMMARY_DATA_SUCCESS: {
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
  items: [],
  tooltip: tooltipReducer(undefined, {}),
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
    case types.EOI_REQUEST: {
      return {
        ...state,
        items: state.items.map(i => resultItemReducer(i, action)),
      };
    }
    case types.CONTACT_SUMMARY_DATA_REQUEST: {
      return {
        ...state,
        items: state.items.map(itm => {
          itm.viewSmsShowStatus = false;
          return itm;
        }),
      };
    }
    case types.CONTACT_SUMMARY_DATA_FAIL:
      return initialState;
    case types.CONTACT_SUMMARY_DATA_SUCCESS: {
      return {
        ...state,
        items: action.payload.profiles.map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
        tooltip: tooltipReducer(undefined, action),
      };
    }
    case types.CONTACT_SUMMARY_VIEW_SMS_SHOW_SUCCESS: {
      return {
        ...state,
        uid: action.payload.uid,
        items: action.payload.items.items.map(itm => {
          if (itm.uid === action.payload.uid) {
            itm.viewSmsShowStatus = !itm.viewSmsShowStatus;
          }
          return itm;
        }),
      };
    }
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
