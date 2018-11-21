import types from '../../action_types';

const initialState = {
  uid: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
      if (action.payload.modal !== 'viewContactConfirm') {
        return state;
      }
      return {
        ...state,
        uid: action.payload.uid,
        display_name: action.payload.display_name,
      };
    default:
      return state;
  }
}
