import types from '../../action_types';

const initialState = {
  uid: null,
  source: null,
  flash: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source } = action.payload;
      if (modal !== 'reportPhoneNo') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
      };
    }
    case types.REPORT_MISUSE_FAIL: {
      return {
        ...state,
        flash: action.payload.error.message,
      };
    }
    default:
      return state;
  }
}
