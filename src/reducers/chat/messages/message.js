import types from '../../../action_types';

const initialState = {
  messageId: 'none',
  chatUid: null,
  from: null,
  to: null,
  body: '...',
  time: '--:--',
  t: 0,
  isSelf: false,
  isDeleted: false,
  status: 'none',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHAT_MESSAGE_STATUS: {
      if (action.payload.messageId !== state.messageId && !(action.payload.messageIds || []).includes(state.messageId)) {
        return state;
      }
      const newState = {
        ...state,
        status: action.payload.status,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_MESSAGES_RECEIVED:
    case types.CHAT_HISTORY_SUCCESS: {
      if (!action.payload || !action.payload.messageId) {
        return state;
      }
      const source = action.type === types.CHAT_MESSAGES_RECEIVED ? 'socket' : 'api';
      return {
        ...state,
        ...action.payload,
        source,
      };
    }
    default:
      return state;
  }
};
