import types from '../../action_types';

const initialAlertItemState = {
  thumbnail: '/assets/default-thumbnail.png',
};

const alertItem = (state = initialAlertItemState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_SUCCESS: {
      const { alertId, profile, status, message, isSystem, isRead, notifiedDate, type } = action.payload;
      const newState = {
        ...state,
        uid: profile.uid || null,
        name: profile.name,
        slug: profile.slug,
        thumbnail: isSystem ? '/assets/envelope-icon.jpg' : profile.thumbnail,
        alertId,
        isSystem,
        status,
        message,
        isRead,
        notifiedDate,
        type,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialChatItemState = {
  loading: true,
  thumbnail: '/assets/default-thumbnail.png',
};

const chatItem = (state = initialChatItemState, action) => {
  switch (action.type) {
    case types.CHAT_MESSAGE_STATUS: {
      if (action.payload.chatUid !== state.uid) {
        return state;
      }
      return {
        ...state,
        status: state.status === 'none' ? 'none' : action.payload.status,
        unreadCount: state.status === 'none' ? 0 : state.unreadCount,
      };
    }
    case types.CHAT_MESSAGES_RECEIVED: {
      if (action.payload.chatUid !== state.uid) {
        return state;
      }
      const { messages } = action.payload;
      const newMessages = messages.filter(m => !m.isSelf && !['read', 'delivered'].includes(m.status));
      const last = messages[messages.length - 1];
      return {
        ...state,
        status: last ? last.status : state.status,
        unreadCount: state.unreadCount + newMessages.length,
        lastMessageDate: last ? last.time : state.lastMessageDate,
        lastMessageT: last ? last.t : state.lastMessageT,
        source: last ? 'socket' : state.source,
        lastMessage: last ? last.body : state.lastMessage,
      };
    }
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { profile, status, unreadCount, lastMessage, lastMessageDate, lastMessageT } = action.payload;
      const newState = {
        ...state,
        uid: profile.uid,
        name: profile.name,
        thumbnail: profile.thumbnail,
        status,
        unreadCount,
        lastMessage,
        lastMessageT,
        source: 'api',
        lastMessageDate,
        loading: false,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }

    case types.CHAT_INCREMENT_COUNT: {
      if (action.payload.uid !== state.uid) {
        return state;
      }
      const newState = {
        ...state,
        unreadCount: state.unreadCount + 1 || 1,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialOnlineItemState = {
  thumbnail: '/assets/default-thumbnail.png',
  platform: 'web',
  chatDetails: {},
};

const onlineItem = (state = initialOnlineItemState, action) => {
  switch (action.type) {
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { profile } = action.payload;
      const newState = {
        ...state,
        uid: profile.uid,
        name: profile.name,
        thumbnail: profile.thumbnail,
        platform: (profile.presence || {}).platform || state.platform,
        chatDetails: profile.presence || state.chatDetails,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialState = {
  alerts: [],
  chats: [],
  online: {
    accepted: [],
    shortlisted: [],
    matches: [],
  },
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATIONS_SUCCESS: {
      const { alerts } = action.payload;
      const newState = {
        ...state,
        alerts: alerts.items.map(i => alertItem(undefined, { ...action, payload: i })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_MESSAGE_STATUS:
    case types.CHAT_MESSAGES_RECEIVED: {
      const chats = state.chats.map(i => chatItem(i, action));
      const newState = {
        ...state,
        chats: [...chats.filter(i => i.uid === action.payload.chatUid), ...chats.filter(i => i.uid !== action.payload.chatUid)],
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }

    case types.CHAT_DATA_REQUEST: {
      const newState = {
        ...state,
        loading: true,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }

    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { chats, online } = action.payload;
      const { accepted, shortlisted, matches } = online;
      const newState = {
        ...state,
        loading: false,
        chats: chats.items.map(i => chatItem(undefined, { ...action, payload: i })),
        online: {
          accepted: accepted.items.map(i => onlineItem(undefined, { ...action, payload: i })),
          shortlisted: shortlisted.items.map(i => onlineItem(undefined, { ...action, payload: i })),
          matches: matches.items.map(i => onlineItem(undefined, { ...action, payload: i })),
        },
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_INCREMENT_COUNT: {
      const newState = {
        ...state,
        chats: state.chats.map(j => chatItem(j, action)),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
