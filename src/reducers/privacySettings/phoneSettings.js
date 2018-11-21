import types from '../../action_types';

const initialState = {
  list: [],
  preference: '',
  loading: false,
  memberShipPlan: '',
  isNative: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PHONE_SETTING_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        memberShipPlan: action.payload.memberShip,
        isNative: action.payload.isNative,
      };
    }
    case types.PHONE_SETTING_DATA_FAIL:
    case types.PHONE_SETTING_DATA_SUCCESS: {
      const { phoneSettings } = action.payload;
      return {
        ...state,
        loading: false,
        list: (phoneSettings && phoneSettings.list && phoneSettings.list) || initialState.state,
        preference: (phoneSettings && phoneSettings.preference && phoneSettings.preference) || initialState.preference,
        memberShipPlan: action.payload.memberShip,
        isNative: action.payload.isNative,
      };
    }
    default:
      return state;
  }
}
