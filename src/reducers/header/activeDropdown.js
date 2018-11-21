import types from '../../action_types';

const initialState = 'none';

export default function(state = initialState, action) {
  switch (action.type) {
    case types.HIDE_ALL_DROPDOWNS:
      return initialState;
    case types.UPDATE_ACTIVE_DROPDOWN: {
      return action.payload.activeDropdown;
    }
    default:
      return state;
  }
}
