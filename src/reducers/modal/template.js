import types from '../../action_types';

const initialState = 'none';

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_HIDE:
      return 'none';
    case types.MODAL_SHOW:
      return action.payload.modal || 'not-specified';
    default:
      return state;
  }
}
