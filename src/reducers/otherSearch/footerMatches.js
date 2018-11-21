import types from '../../action_types';

const initialState = {
  loading: true,
  count: 0,
  results_id: '',
  matches: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_TYPE_SET:
    case types.OTHER_SEARCH_REQUEST:
    case types.OTHER_SEARCH_FAIL:
    case types.OTHER_SEARCH_SUCCESS:
    default:
      return state;
  }
};
