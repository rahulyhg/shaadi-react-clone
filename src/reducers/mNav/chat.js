/* eslint camelcase: 0 */
import types from '../../action_types';
import { decode64, createSubNavReducer } from '../utils';

const commmonSubReducer = createSubNavReducer();

/* chat Sub-menus */

const recentChatsState = {
  key: 'recentChats',
  label: 'Recent Chats',
  title: 'Your recent chats',
  path: '/inbox/chats/recent-chats',
  url: '/inbox/chats/recent-chats',
  refs: [],
  isExternal: false,
  isActive: false,
  count: 0,
};

const recentChats = (state = recentChatsState, action) => {
  switch (action.type) {
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { chats } = action.payload;
      return {
        ...state,
        count: chats.unread,
      };
    }

    default:
      return commmonSubReducer(state, action);
  }
};

const buddyListState = {
  key: 'buddyList',
  label: 'Active',
  title: 'Search for profiles who are available for chat',
  path: '/inbox/chats/buddy-list',
  url: '/inbox/chats/buddy-list',
  refs: [],
  isExternal: false,
  isActive: false,
  count: 0,
};
const buddyList = (state = buddyListState, action) => {
  switch (action.type) {
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { online } = action.payload;
      return {
        ...state,
        count: online.accepted.items.length + online.shortlisted.items.length + online.matches.items.length,
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

/* chat Top menu */

const nav = (state, action) => {
  const newState = [recentChats(state[0], action), buddyList(state[1], action)];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const chatsInitialState = {
  key: 'chat',
  label: 'Chat',
  url: '/inbox/chats/recent-chats?loc=top-nav',
  path: '/inbox/chats/recent-chats?loc=top-nav',
  isExternal: false,
  isActive: false,
  count: 0,
  nav: nav([], {}),
};

export default function(state = chatsInitialState, action) {
  switch (action.type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive: !!state.nav.some(item => item.path === action.payload.pathname) || state.path === action.payload.pathname,
      };
    case types.EVT_REF: {
      if (!action.payload || action.payload.length === 0) {
        return state;
      }
      const { evt_ref } = action.payload;
      const evt = evt_ref && decode64(evt_ref);
      if (!state.nav.some(n => (n.refs || []).includes(evt))) {
        return state;
      }
      return {
        ...state,
        isActive: true,
        nav: nav(state.nav, { ...action, payload: evt }),
      };
    }
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      return {
        ...state,
        count: action.payload.chats.unread,
        nav: nav(state.nav, action),
      };
    }
    default:
      return state;
  }
}
