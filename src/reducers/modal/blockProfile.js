import types from '../../action_types';

const initialState = {
  uid: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'blockProfile') {
        return state;
      }
      return {
        ...state,
        uid: action.payload.uid,
        himHer: action.payload.himHer,
      };
    }
    default:
      return state;
  }
}
