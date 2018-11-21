import types from '../../action_types';

export default () => (state, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        isActive: payload && (state.path === payload.pathname || (state.otherPaths || []).includes(payload.pathname)),
      };
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      if (!payload || !payload.counts) {
        return state;
      }
      const count = payload.counts[state.newCntKey] || payload.counts[state.keyB] || payload.counts[state.key];
      const isNew = !!payload.counts[state.newCntKey];
      const readCount = payload.counts[state.key] || 0;
      return count === undefined ? state : { ...state, count, isNew, readCount };
    }
    case types.EVT_REF: {
      return {
        ...state,
        isActive: state.key === payload || (state.refs || []).includes(payload),
      };
    }
    default:
      return state;
  }
};
