import types from '../../action_types';

const initialState = {
  selected: [],
  ready: false,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_SHORTLISTS_SUCCESS: {
      const newState = {
        ...state,
        ready: true,
        selected: action.payload.list_ids.map(id => `${id}`),
        count: action.payload.list_ids.length,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PROFILE_SUCCESS: {
      const { flags, detailed } = action.payload;

      if (['shortlisted', 'default'].includes(flags.connectionStatus) && !!detailed.shortlistCount) {
        const newState = {
          ...state,
          ready: true,
          selected: detailed.shortlisted.map(list => `${list.id}`),
          count: detailed.shortlistCount,
        };
        return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
      }
      return state;
    }
    case types.EOI_SUCCESS: {
      if (['shortlisted', 'default'].includes(action.payload.connectionStatus) && action.payload.list_ids) {
        const newState = {
          ...state,
          ready: true,
          selected: action.payload.list_ids.map(id => `${id}`),
          count: action.payload.list_ids.length,
        };
        return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
      }
      return state;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS: {
      const selected = state.selected;
      const count = action.payload.summary.shortlistCount;
      const newState = {
        ...state,
        count: count >= 0 ? count : 0,
        ready: selected.length === count,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};
