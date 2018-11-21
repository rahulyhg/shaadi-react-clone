import types from '../../action_types';

const initialState = {
  attempt: 0,
  errorMsg: '',
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.OTP_GENERATION_SUCCESS: {
      const { response: { data: { data: { attempt: attempt = 0 } } } } = action;
      return {
        ...state,
        attempt: Number(attempt),
        errorMsg: '',
        loading: false,
      };
    }
    case types.OTP_GENERATION_REQUEST: {
      return {
        ...initialState,
      };
    }
    case types.OTP_GENERATION_FAIL: {
      const { error: { response: { data: { code } } } } = action;
      return {
        ...state,
        errorMsg: code,
        loading: false,
      };
    }
    default:
      return state;
  }
}
