import types from '../../action_types';

const initialState = {
  family_details: false,
  astro: false,
  photo: false,
  isVisible: false,
  career: false,
  target_time: Math.round(new Date() / 1000),
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FOUR_HOUR_SUCCESS: {
      const { family_details, astro, photo, isVisible, career, target_time } = action.payload.ticker;
      return { ...state, family_details, astro, photo, isVisible, career, target_time };
    }
    case types.FOUR_HOUR_CLOSE: {
      return {
        ...initialState,
        isVisible: false,
      };
    }
    case types.FOUR_HOUR_FAIL:
      return {
        ...initialState,
      };
    case types.GET_PROFILE_PHOTOS_SUCCESS: {
      const photo = !(action.payload && action.payload.data && action.payload.data.count > 0);
      return {
        ...state,
        photo,
      };
    }
    default:
      return state;
  }
}
