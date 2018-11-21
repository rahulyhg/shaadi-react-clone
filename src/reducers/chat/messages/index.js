import types from '../../../action_types';
import history from './history';

const initialState = {
  initial: history(undefined, {}),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_CONNECTING:
    case types.CHAT_CONNECTED:
    case types.CHAT_DISCONNECTED:
    case types.CHAT_PRESENCE: {
      const newState = Object.keys(state).reduce((acc, k) => ({ ...acc, [k]: history(state[k], action) }), {});
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_HIDE_FLASH:
    case types.CHAT_SHOW_FLASH:
    case types.CHAT_OTHER_IS_TYPING:
    case types.CHAT_OTHER_IS_NOT_TYPING:
    case types.CHAT_MESSAGE_STATUS:
    case types.CHAT_MESSAGES_RECEIVED:
    case types.CHAT_HISTORY_REQUEST:
    case types.CHAT_HISTORY_SUCCESS:
    case types.CHAT_HISTORY_FAIL: {
      const newState = {
        ...state,
        [action.payload.chatUid]: history(state[action.payload.chatUid], action),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
