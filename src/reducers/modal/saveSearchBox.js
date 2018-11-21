import types from '../../action_types';

const initialState = {
  savedSearchList: [],
  savedSuccess: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal } = action.payload;
      if (modal !== 'save_search_box') {
        return state;
      }
      return {
        ...state,
        savedSuccess: false,
        loadinglist: true,
      };
    }

    case types.SAVED_SEARCH_REQUEST: {
      return {
        ...state,
        savedSuccess: false,
        loadinglist: true,
      };
    }

    case types.SAVED_SEARCH_SUCCESS:
      return {
        ...state,
        savedSearchList: action.payload.data,
        loadinglist: false,
      };
    case types.SUBMIT_SAVED_SEARCH_SUCCESS:
      return {
        ...state,
        savedSuccess: true,
      };
    default:
      return state;
  }
}
