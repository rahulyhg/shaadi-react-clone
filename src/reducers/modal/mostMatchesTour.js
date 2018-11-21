import types from '../../action_types';

const initialState = {
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PREFERRED_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PREFERRED_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'mostMatchesTour') {
        return state;
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
