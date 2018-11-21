import types from '../../action_types';
import discover from './discover';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MATCHES_GROUP_SUCCESS: {
      const { discoverSearchType } = action.payload;

      const MatchesResponse = {};
      discoverSearchType.forEach(type => {
        MatchesResponse[type] = discover(undefined, { type: action.type, payload: action.payload.searchResult[type] || {} });
      });

      return {
        ...state,
        ...MatchesResponse,
      };
    }

    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.EOI_REQUEST:
    case types.ALERT_SHOW:
    case types.ALERT_HIDE:
    case types.ALERT_HIDE_KEY: {
      const MatchesResponse = {};
      Object.keys(state).forEach(type => {
        MatchesResponse[type] = discover(state[type], action);
      });
      return {
        ...state,
        ...MatchesResponse,
      };
    }
    default:
      return state;
  }
}
