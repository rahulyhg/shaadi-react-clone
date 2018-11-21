import types from '../../action_types';

const initialState = {
  btnloading: false,
  cartErrorMsg: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CART_SUCCESS: {
      if (action.payload.data === null || !action.payload.data) {
        return state;
      }
      return {
        ...state,
        btnloading: true,
      };
    }
    case types.ADD_CART_REQUEST: {
      return {
        ...state,
        btnloading: true,
      };
    }
    case types.ADD_CART_FAIL: {
      const apiData = action.payload.response.data;
      const defaultErrMsg = 'The offer you are trying to apply has expired.';
      const cartErrorMsg = apiData.status === 400 && apiData.message ? apiData.message : defaultErrMsg;

      return {
        ...state,
        btnloading: false,
        cartErrorMsg,
      };
    }
    default:
      return state;
  }
}
