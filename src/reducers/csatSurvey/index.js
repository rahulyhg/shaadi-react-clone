import types from '../../action_types';

const initialState = {
  questions: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CSAT_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.CSAT_DATA_FAIL:
    case types.CSAT_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
      };
    }
    default:
      return state;
  }
}
