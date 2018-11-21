import types from '../../action_types';

const initialState = {
  loading: false,
  flash: null,
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SUCCESS_STORIES_REQUEST:
      return {
        ...state,
        flash: null,
        loading: true,
      };
    case types.SUCCESS_STORIES_CACHE:
    case types.SUCCESS_STORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        flash: null,
        loading: false,
      };
    case types.SUCCESS_STORIES_FAIL:
      return {
        ...state,
        flash: action.payload.error.message,
        loading: false,
      };

    default:
      return state;
  }
}
