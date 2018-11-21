/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

const initialState = false;
export default function(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_CACHE:
    case types.AUTH_SUCCESS:
    case types.SESSION_SUCCESS:
      return true;
    case types.UNAUTH:
      return false;
    default: {
      const { type, payload } = action;
      if (type && type.endsWith('_FAIL') && payload && payload.error && payload.error.status === 401) {
        return false;
      }
      return state;
    }
  }
}
