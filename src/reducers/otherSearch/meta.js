import types from '../../action_types';

const initialState = {
  listStyle: 'list',
  loading: true,
  frozenBy: null,
  flash: null,
  preferredSelection: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.OTHER_SEARCH_REQUEST:
      return {
        ...state,
        listStyle: ['list', 'grid'].includes(action.payload.format) ? action.payload.format : state.listStyle,
        loading: true,
        frozenBy: null,
        flash: null,
      };
    case types.OTHER_SEARCH_SUCCESS: {
      return {
        ...state,
        listStyle: action.payload.meta.format || state.listStyle,
        loading: false,
        flash: null,
        frozenBy: null,
        preferredSelection: action.payload.meta.preferred_selection || null,
      };
    }

    case types.OTHER_SEARCH_FREEZE: {
      return {
        ...state,
        frozenBy: action.payload,
      };
    }
    case types.OTHER_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        flash: action.payload.error.message.slice(0, 300),
        frozenBy: null,
      };
    default:
      return state;
  }
}
