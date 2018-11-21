import types from '../../action_types';
import { createAlertReducer } from '../utils';

const toastReducer = createAlertReducer(['profile'], ['toast']);
const topToastReducer = createAlertReducer(['profile'], ['topToast']);
const tooltipReducer = createAlertReducer(['profile'], ['photo', 'eoi']);

const initialState = {
  uid: null,
  loading: false,
  loadingText: 'Loading...',
  flash: null,
  toast: toastReducer(undefined, {}),
  topToast: topToastReducer(undefined, {}),
  tooltip: tooltipReducer(undefined, {}),
  photoLoading: false,
  eoiLoadingStyle: 'none',
  justNow: false,
  justNowText: null,
  justNowIcon: null,
  isPreferredMatch: false,
  connectMessages: [],
  contact: {},
  modalShowCount: 0,
  request: {},
  justNowClass: null,
  pageTitle: '',
  triggerReportMisuse: false,
  isAstroStatusError: false,
};

const isPreferredMatch = payload => payload.matchTag === 'preferred';

export default function(state = initialState, action) {
  const flags = action.payload && action.payload.flags ? action.payload.flags : null;
  const flash =
    flags && flags.connectionStatus === 'blocked' && flags.contactAction !== 'member_blocked' && flags.connectionAction !== 'member_blocked'
      ? 'blocked'
      : null;
  switch (action.type) {
    case types.BLOCK_MEMBER_MISUSE:
      return {
        ...state,
        triggerReportMisuse: true,
      };
    case types.PROFILE_PREPARE_NEXT:
      return {
        ...state,
        loadingText: 'Moving to next profile',
      };
    case types.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        uid: state.uid,
        loadingText: state.loadingText,
        toast: state.toast,
        topToast: state.topToast,
      };
    case types.PROFILE_CACHE:
    case types.PROFILE_SUCCESS:
      return {
        ...state,
        toast: state.toast,
        topToast: state.topToast,
        tooltip: tooltipReducer(undefined, {}),
        uid: action.payload.uid,
        loading: false,
        loadingText: 'Loading...',
        justNow: false,
        justNowText: null,
        justNowIcon: null,
        flash,
        interestsAndMore: (action.payload.detailed && action.payload.detailed.interests) || {},
        isPreferredMatch: isPreferredMatch(action.payload),
        connectMessages: action.payload.connectMessages || [],
        contact: action.payload.contact || {},
        request: action.payload.request || {},
        isAstroStatusError: action.payload.isAstroStatusError,
        pageTitle: action.payload.detailed
          ? `${action.payload.userHandle} View and Contact ${
              action.payload.detailed.background.filter(key => key.title === 'Religion')[0].desc
            } Matches`
          : '',
      };
    case types.PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        uid: action.payload.uid,
        flash: action.payload.error.message,
      };
    case types.PHOTO_EOI_REQUEST: {
      if (state.uid !== action.payload.uid) return state;
      return {
        ...state,
        photoLoading: true,
      };
    }
    case types.PHOTO_EOI_SUCCESS: {
      if (state.uid !== action.payload.uid) return state;
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.PHOTO_EOI_FAIL: {
      if (state.uid !== action.payload.uid) return state;
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.EOI_REQUEST: {
      if (state.uid !== action.payload.uid) return state;
      return {
        ...state,
        eoiLoadingStyle: 'full',
        justNow: false,
        justNowText: null,
        justNowIcon: null,
      };
    }
    case types.MODAL_SHOW: {
      return {
        ...state,
        modalShowCount: state.modalShowCount + 1,
      };
    }
    case types.EOI_SUCCESS: {
      if (state.uid !== action.payload.uid) return state;
      return {
        ...state,
        eoiLoadingStyle: 'none',
        justNow: true,
        justNowText: action.payload.justNowText,
        justNowIcon: action.payload.justNowIcon,
      };
    }
    case types.EOI_FAIL: {
      if (state.uid !== action.payload.uid) return state;
      const { error } = action.payload;
      if (error.message === 'You have blocked this member.') {
        return {
          ...state,
          eoiLoadingStyle: 'none',
          justNow: true,
          justNowText: action.payload.justNowText,
          justNowIcon: action.payload.justNowIcon,
        };
      }
      if (error.message === 'limit_exceeded') {
        return {
          ...state,
          eoiLoadingStyle: 'none',
          justNow: true,
          justNowIcon: action.payload.justNowIcon,
          justNowText: action.payload.justNowText,
          justNowClass: 'just_now_error',
        };
      }
      if (error.message === 'profile_block_limit_exceeded') {
        return {
          ...state,
          eoiLoadingStyle: 'none',
          justNow: true,
          justNowText: action.payload.justNowText,
        };
      }
      if (error.message === 'misuse_already_marked') {
        return {
          ...state,
          eoiLoadingStyle: 'none',
          justNow: true,
          justNowIcon: action.payload.justNowIcon,
          justNowText: action.payload.justNowText,
        };
      }
      return {
        ...state,
        eoiLoadingStyle: 'none',
        justNow: true,
        justNowIcon: 'error',
        justNowText: error.type === 'formatted' ? error.message : 'There was some problem processing your request. Please try again later.',
        justNowClass: 'just_now_error',
      };
    }
    case types.ALERT_SHOW:
    case types.ALERT_HIDE:
    case types.ALERT_HIDE_KEY: {
      return {
        ...state,
        toast: toastReducer(state.toast, action),
        topToast: topToastReducer(state.topToast, action),
        tooltip: tooltipReducer(state.tooltip, action),
      };
    }
    case types.PROFILE_RESET:
      return initialState;
    default:
      return state;
  }
}
