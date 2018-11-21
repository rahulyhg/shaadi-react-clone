import types from '../../action_types';

const initialState = {
  details: {},
  chart: {},
  hasAstro: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_ASTRO_CACHE:
    case types.GET_PROFILE_ASTRO_SUCCESS: {
      if (!action.payload || !action.payload.data) {
        return state;
      }
      const { details, chart } = action.payload.data;
      if (!details || !chart) {
        return state;
      }
      return {
        ...state,
        details,
        chart,
        hasAstro: !!Object.keys(chart).length,
      };
    }
    case types.GET_PROFILE_ASTRO_REQUEST:
    case types.GET_PROFILE_ASTRO_FAIL:
    default:
      return state;
  }
};
