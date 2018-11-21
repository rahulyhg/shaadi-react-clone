import types from '../../action_types';

const initialState = {
  loading: true,
  count: 0,
  results_id: '',
  matches: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PREFERRED_SEARCH_REQUEST:
    case types.PREFERRED_SEARCH_FAIL:
    case types.PREFERRED_SEARCH_SUCCESS:
    default:
      return state;
  }
};
