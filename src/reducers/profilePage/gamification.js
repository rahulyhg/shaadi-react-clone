import types from '../../action_types';

const initialState = {
  loading: false,
  flash: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.EDIT_PROFILE_REQUEST:
    case types.EDIT_ASTRO_REQUEST:
      return { loading: true, flash: null };
    case types.EDIT_PROFILE_SUCCESS:
    case types.EDIT_ASTRO_SUCCESS:
      return { loading: false, flash: null };
    case types.EDIT_ASTRO_FAIL:
    case types.EDIT_PROFILE_FAIL:
      return { loading: false, flash: action.payload.error.message };
    default:
      return state;
  }
}
