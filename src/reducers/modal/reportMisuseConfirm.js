import types from '../../action_types';

const initialState = {
  display_name: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'reportMisuseConfirm') {
        return state;
      }

      return {
        ...state,
        display_name: action.payload.display_name,
        uid: action.payload.uid,
        reason: action.payload.reason,
        reasonText: action.payload.reasonText,
      };
    }
    default:
      return state;
  }
}
