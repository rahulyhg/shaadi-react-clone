import types from '../../action_types';

const initialState = {
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CONTACT_SUMMARY_DATA_REQUEST: {
      if (action.payload) {
        return {
          ...initialState,
          ...action.payload,
          loading: true,
        };
      }
      return {
        ...initialState,
        loading: true,
      };
    }
    case types.CONTACT_SUMMARY_DATA_SUCCESS: {
      return {
        ...initialState,
        ...action.payload.meta,
        loading: false,
      };
    }
    default:
      return state;
  }
}
