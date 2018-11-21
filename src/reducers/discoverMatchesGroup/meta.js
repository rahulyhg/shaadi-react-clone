import types from '../../action_types';

const initialState = {
  discoverSearchType: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MATCHES_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        uid: action.payload.uid,
        discoverSearchType: action.payload.discoverSearchType,
      };
    case types.MATCHES_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
