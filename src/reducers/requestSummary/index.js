import types from '../../action_types';

const initialState = { detail: {} };
export default function(state = initialState, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case types.INBOX_REQUEST_SUMMARY_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
