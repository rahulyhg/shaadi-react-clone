import types from '../../action_types';

const initialState = {
  layout: 'loading',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_LAYOUT:
      return {
        ...state,
        layout: action.layout,
      };
    default:
      return state;
  }
}
