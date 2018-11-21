import types from '../../action_types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
    default:
      return state;
  }
}
