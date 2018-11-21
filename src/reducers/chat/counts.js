import types from '../../action_types';

const initialState = {
  alerts: 0,
  chats: 0,
  online: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATIONS_SUCCESS: {
      const { alerts } = action.payload;
      return {
        ...state,
        alerts: action.payload.markAsRead ? 0 : alerts.unread,
      };
    }
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { chats, online } = action.payload;
      return {
        ...state,
        chats: chats.unread,
        online: online.accepted.items.length + online.shortlisted.items.length + online.matches.items.length,
      };
    }
    default:
      return state;
  }
}
