import types from '../../action_types';

const initialState = {
  success: false,
  errorMsg: '',
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.OTP_VERIFICATION_SUCCESS: {
      const { response: { data: { data: { success = 'false' } } } } = action;
      return {
        ...state,
        success: success === 'true',
        errorMsg: '',
        loading: false,
      };
    }
    case types.OTP_VERIFICATION_REQUEST: {
      return {
        ...initialState,
      };
    }
    case types.OTP_VERIFICATION_FAIL: {
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
