import types from '../../action_types';

const initialState = {
  uid: null,
  name: '',
  source: null,
  hasExceededMaxRequests: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source, hasExceededMaxRequests, name, type } = action.payload;
      if (modal !== 'blockMember') {
        return state;
      }
      return {
        ...state,
        name,
        uid,
        source,
        type,
        hasExceededMaxRequests,
      };
    }
    default:
      return state;
  }
}
