/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

const initialState = false;
export default function(state = initialState, action) {
  switch (action.type) {
    case types.COOKIE_SUCCESS:
      return !(action.payload.abc || action.payload.ltabc || action.payload._alxm);
    case types.AUTH_CACHE:
    case types.AUTH_SUCCESS:
      return false;
    case types.AUTH_FAIL:
    case types.UNAUTH:
      return true;
    case types.PREFERRED_SEARCH_FAIL:
    case types.OTHER_SEARCH_FAIL:
      return action.payload.error.status === 401 ? true : state;
    default: {
      const { type, payload } = action;
      if (type && type.endsWith('_FAIL') && payload && payload.error && payload.error.status === 401) {
        return true;
      }
      return state;
    }
  }
}
