import types from '../../action_types';

const initialState = {
  id: '',
  errorMsg: '',
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDERID_SUCCESS: {
      const { response: { data: { data: { status_code, order_id } } } } = action;
      return {
        ...state,
        id: status_code === 200 ? order_id : '',
        loading: false,
      };
    }
    case types.GET_ORDERID_REQUEST: {
      return {
        ...initialState,
      };
    }
    case types.GET_ORDERID_FAIL: {
      const { error: { response: { data: { code } } } } = action;
      return {
        ...state,
        errorMsg: code ? 'An error occurred while processing your payment. Please try again or try a different mode of payment.' : '',
        loading: false,
      };
    }
    default:
      return state;
  }
}
