import types from '../action_types';

const initialState = {
  matches: null,
  inbox: null,
  contactSummary: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CANCEL: {
      return { ...state, [action.payload.source]: action.payload.cancelFn };
    }

    case types.RESET_CANCEL: {
      const newState = { ...state };
      action.payload.source.forEach(source => {
        newState[source] = null;
      });

      return newState;
    }
    default: {
      return state;
    }
  }
}
