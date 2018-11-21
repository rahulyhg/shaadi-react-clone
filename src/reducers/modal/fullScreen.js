import types from '../../action_types';

const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_HIDE:
      return false;
    case types.MODAL_SHOW:
      return action.payload.fullScreen === true;
    default:
      return state;
  }
}
