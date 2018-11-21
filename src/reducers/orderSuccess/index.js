import types from '../../action_types';

const initialState = {
  order_status: '',
  order_id: '',
  mode_of_payment: '',
  shaadi_care_amount: '',
  crm_no: '',
  product: '',
  duration: '',
  amount: '0',
  currency: '',
  contact_details: '',
  sub_text: '',
  sub_sections: [],
  order_details: [],
  loading: true,
  errorMsg: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PAYMENT_THANK_YOU_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.PAYMENT_THANK_YOU_FAIL: {
      return { ...state, loading: true, errorMsg: (action.payload.error || {}).message || 'Order Id not Found' };
    }
    case types.PAYMENT_THANK_YOU_SUCCESS: {
      if (!action.payload.data) {
        return state;
      }
      const orderSuccessData = action.payload.data;
      return {
        ...state,
        loading: false,
        ...orderSuccessData,
      };
    }
    default:
      return state;
  }
}
