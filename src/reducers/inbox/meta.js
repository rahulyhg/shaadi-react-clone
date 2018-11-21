import types from '../../action_types';

import counts from './counts';
import { identifyCommunity, ucword } from '../utils';

const community = identifyCommunity(window.location.hostname)
  .myDomain.split('.')
  .slice(1)
  .join('.');
const initialState = {
  loading: true,
  counts: {},
  frozenBy: null,
  requestType: { type: 'connect', action: 'pending' },
  pageTitle: `${ucword(community)} - Find Your Life Partner`,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.INBOX_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        frozenBy: null,
      };
    }

    case types.INBOX_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload.meta,
        loading: false,
        counts: counts(state.counts, action),
      };
    }
    case types.INBOX_DATA_FREEZE: {
      return {
        ...state,
        loading: true,
        frozenBy: action.payload,
      };
    }
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      return {
        ...state,
        counts: counts(undefined, action),
      };
    }
    default:
      return state;
  }
}
