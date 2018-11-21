/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

const initialState = {
  isPremiumBannerVisible: false,
  premiumBanner: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PREMIUM_BANNNER_CACHE:
    case types.PREMIUM_BANNNER_SUCCESS: {
      return {
        ...state,
        isPremiumBannerVisible: true,
        premiumBanner: action.payload,
      };
    }
    case types.PREMIUM_BANNNER_REQUEST: {
      return {
        ...state,
      };
    }
    case types.PREMIUM_BANNNER_FAIL: {
      return {
        ...state,
        isPremiumBannerVisible: true,
      };
    }
    default: {
      return state;
    }
  }
}
