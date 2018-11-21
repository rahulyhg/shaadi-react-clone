import types from '../../action_types';
import { createAlertReducer } from '../utils';

const tooltipReducer = createAlertReducer(['chatWindow'], ['photo', 'eoi']);
const initialChatState = {
  uid: null,
  tooltip: tooltipReducer(undefined, {}),
  hasUnread: false,
  photoLoading: false,
  eoiLoadingStyle: 'none',
  gamifiedCount: 0,
};

const chatReducer = (state = initialChatState, action = {}) => {
  switch (action.type) {
    case types.CHAT_INCREMENT_COUNT:
      if (action.payload.uid !== state.uid) {
        return state;
      }
      return { ...state, gamifiedCount: state.gamifiedCount + 1 };
    case types.CHAT_WINDOW_STACK:
      if (action.payload.uid !== state.uid) {
        return state;
      }
      return { ...state, status: 'stacked', gamifiedCount: action.payload.unreadCount };
    case types.CHAT_WINDOW_UNREAD:
      if (action.payload !== state.uid) {
        return state;
      }
      return { ...state, hasUnread: true };
    case types.CHAT_WINDOW_MINIMIZE:
      if (action.payload !== state.uid) {
        return state;
      }
      return { ...state, status: 'minimized' };
    case types.CHAT_WINDOW_CLOSE:
      if (action.payload !== state.uid) {
        return state;
      }
      return { ...state, status: 'closed' };
    case types.CHAT_WINDOW_OPEN:
      if (action.payload.uid !== state.uid) {
        return state;
      }
      return { ...state, status: 'opened', hasUnread: false, gamifiedCount: action.payload.unreadCount };
    case types.CHAT_WINDOW_ADD:
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS:
      return {
        ...state,
        uid: action.payload.uid,
        order: action.payload.order,
        status: state.status || action.payload.status,
        updatedAt: action.payload.updatedAt,
        gamifiedCount: action.payload.unreadCount || state.gamifiedCount,
      };
    default:
      return state;
  }
};

const initialState = {
  normal: [],
  stacked: [],
  closed: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_WINDOW_ADD: {
      const newState = {
        ...state,
        normal: [
          chatReducer(undefined, {
            ...action,
            payload: { ...action.payload, uid: action.payload.uid, order: -100, status: action.payload.initialStatus || 'opened' },
          }),
          ...state.normal,
        ],
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_WINDOW_STACK:
    case types.CHAT_WINDOW_UNREAD:
    case types.CHAT_WINDOW_MINIMIZE:
    case types.CHAT_WINDOW_CLOSE:
    case types.CHAT_WINDOW_OPEN: {
      const windows = state.normal.concat(state.stacked, state.closed).map(w => chatReducer(w, action));
      const newState = {
        normal: windows.filter(w => w.status !== 'stacked' && w.status !== 'closed'),
        stacked: windows.filter(w => w.status === 'stacked'),
        closed: windows.filter(w => w.status === 'closed'),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_SHOW_FLASH: {
      const newState = {
        normal: state.normal.map(w => chatReducer(w, action)),
        stacked: state.stacked.map(w => chatReducer(w, action)),
        closed: state.closed.map(w => chatReducer(w, action)),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_DATA_SUCCESS: {
      const oldWindows = state.normal.concat(state.stacked, state.closed);
      const chats = action.payload.chats.items;
      const windows = action.payload.chatWindows.map(wind => {
        const chat = chats && chats.filter(c => c.uid === wind.uid)[0];
        const payload = { ...wind, unreadCount: chat ? chat.unreadCount || 0 : 0 };
        return chatReducer(oldWindows.filter(w => w.uid === wind.uid)[0], { ...action, payload });
      });
      windows
        .filter(w => w.status === 'opened')
        .slice(1)
        .forEach(w => {
          w.status = 'minimized';
        });
      const newState = {
        normal: windows.filter(w => w.status !== 'stacked' && w.status !== 'closed'),
        stacked: windows.filter(w => w.status === 'stacked'),
        closed: windows.filter(w => w.status === 'closed'),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_INCREMENT_COUNT: {
      const oldWindows = state.normal.concat(state.stacked, state.closed);
      const windows = oldWindows.map(wind => chatReducer(oldWindows.filter(w => w.uid === wind.uid)[0], { ...action, payload: wind }));
      windows
        .filter(w => w.status === 'opened')
        .slice(1)
        .forEach(w => {
          w.status = 'minimized';
        });
      const newState = {
        normal: windows.filter(w => w.status !== 'stacked' && w.status !== 'closed'),
        stacked: windows.filter(w => w.status === 'stacked'),
        closed: windows.filter(w => w.status === 'closed'),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
