import types from '../../action_types';

const initialState = {
  loading: true,
  flash: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.DR_PROFILES_SUCCESS:
      return {
        loading: false,
      };
    case types.DR_PROFILES_REQUEST:
      return {
        loading: true,
      };
    default:
      return state;
  }
}
