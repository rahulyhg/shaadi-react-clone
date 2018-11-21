import types from '../../action_types';

const initialState = {
  sidebar: '...',
  window: '...',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_DATA_FAIL:
      return {
        ...state,
        sidebar: action.payload.error.message.slice(0, 24),
      };
    case types.CHAT_DATA_REQUEST:
      return {
        ...state,
        sidebar: null,
      };
    case types.CHAT_DATA_SUCCESS:
      return {
        ...state,
        sidebar: null,
      };
    case types.CHAT_CONNECTING:
      return {
        ...state,
        window: null,
      };
    case types.CHAT_CONNECTED:
      return {
        ...state,
        window: null,
      };
    case types.CHAT_DISCONNECTED:
      return {
        ...state,
        window: action.payload.flash || 'not connected',
      };
    default:
      return state;
  }
}
