import types from '../../action_types';
import phoneSettings from './phoneSettings';

const initialState = {
  phoneSettings: phoneSettings(undefined, {}),
};

export default (state = initialState, action = {}) => {
  const { type } = action;
  switch (type) {
    case types.PHONE_SETTING_DATA_REQUEST:
    case types.PHONE_SETTING_DATA_FAIL:
    case types.PHONE_SETTING_DATA_SUCCESS: {
      const newState = {
        ...state,
        phoneSettings: phoneSettings(state.phoneSettings, action),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};
