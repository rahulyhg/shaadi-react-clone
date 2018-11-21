import types from '../../action_types';

const initialState = {
  count: 0,
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_SUCCESS:
    default: {
      const { requests } = action.payload || {};
      if (!requests) {
        return state;
      }
      const newState = {
        count: requests.count,
        items: requests.items,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
  }
};
