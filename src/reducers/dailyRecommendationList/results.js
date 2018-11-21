/* eslint camelcase: 0 */
/* global window */

import types from '../../action_types';
import { encode64 } from '../utils';

const initialItemState = {
  uid: null,
  justNow: false,
  justNowText: null,
  eoiLoadingStyle: 'none',
  photoLoading: false,
  actionType: '',
  displayStatusMessage: '',
  action: '',
  mCardStatus: 'normal',
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || source !== 'daily-recommendations') {
        return state;
      }
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.PHOTO_EOI_REQUEST: {
      const { uid, source } = action.payload;
      if (uid !== state.uid || source !== 'daily-recommendations') {
        return state;
      }
      return {
        ...state,
        photoLoading: true,
      };
    }
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const { uid, source, error, type } = action.payload;
      if (uid !== state.uid || (!['daily-recommendations', 'modal/sendRequest'].includes(source) && !['cancel', 'remind'].includes(type))) {
        return state;
      }
      const preventHiding = ['removeFromShortlist_mobile', 'canel', 'remind'].includes(type);
      return {
        ...state,
        justNow: true,
        justNowText: action.payload.justNowText,
        mCardStatus: preventHiding ? 'ignoreJustNow' : 'normal',
        eoiLoadingStyle: 'none',
        displayStatusMessage:
          ['daily-recommendations', 'modal/sendRequest'].includes(source) && error && error.status === 400 ? error.message : '',
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;
      if (uid !== state.uid || source !== 'daily-recommendations') {
        return state;
      }
      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        actionType: type || '',
      };
    }
    case types.DR_PROFILES_SUCCESS: {
      return {
        ...initialItemState,
        uid: action.payload.uid,
        action: action.payload.recommendation.action || '',
      };
    }
    default:
      return state;
  }
};

const initialState = {
  results_id: '',
  permalink: '/profile/daily-recommendations',
  pg_ubt: encode64(`/profile/daily-recommendations`),
  evt_ref: '',
  query: {},
  items: [],
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
    case types.DR_PROFILES_REQUEST:
      return { ...state };
    case types.DR_PROFILES_FAIL:
      return initialState;
    case types.DR_PROFILES_SUCCESS: {
      const evt = 'daily5';
      const connectionStatus = [
        'theyAccepted',
        'accepted',
        'contacted',
        'hidden',
        'deleted',
        'theyBlocked',
        'ignored',
        'blocked',
        'theyDeclined',
        'declined',
      ];
      return {
        ...state,
        results_id: action.payload.key,
        evt_ref: encode64(evt),
        items: action.payload.profiles
          .filter(pro => !connectionStatus.includes(pro.flags.connectionStatus) && pro.recommendation.action === '')
          .map(pro => resultItemReducer(undefined, { ...action, payload: pro })),
      };
    }
    default:
      return state;
  }
}
