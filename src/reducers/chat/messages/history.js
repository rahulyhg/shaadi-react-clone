import types from '../../../action_types';
import message from './message';

const initialState = {
  loading: null,
  typing: null,
  flash: null,
  flashType: 'default',
  since: null,
  items: [],
  mark: new Date() / 1,
  hide_message: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHAT_HIDE_FLASH: {
      if (action.payload.flash !== state.flash) {
        return state;
      }
      return { ...state, flash: null, flashType: 'default' };
    }
    case types.CHAT_SHOW_FLASH: {
      return {
        ...state,
        flash: action.payload.flash,
        flashType: action.payload.flashType || 'default',
        mark: new Date() / 1,
      };
    }
    case types.CHAT_HISTORY_REQUEST:
      return {
        ...state,
        loading: 'loading...',
        mark: new Date() / 1,
      };
    case types.CHAT_OTHER_IS_NOT_TYPING:
      return {
        ...state,
        typing: null,
        mark: new Date() / 1,
      };
    case types.CHAT_OTHER_IS_TYPING: {
      return {
        ...state,
        typing: '%name% is typing...',
        mark: new Date() / 1,
      };
    }
    case types.CHAT_MESSAGE_STATUS: {
      const items = state.items.map(i => message(i, action));
      const newState = {
        ...state,
        items,
        mark: items.length > 0 ? items[items.length - 1].t : state.mark,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_MESSAGES_RECEIVED:
    case types.CHAT_HISTORY_SUCCESS: {
      const messageIds = state.items
        .concat(action.payload.messages)
        .map(m => m.messageId)
        .filter((value, index, self) => self.indexOf(value) === index);
      const items = messageIds
        .map(id =>
          message(state.items.filter(m => m.messageId === id)[0], {
            ...action,
            payload: action.payload.messages.filter(m => m.messageId === id)[0],
          }),
        )
        .sort((a, b) => a.t - b.t);
      const newMessage =
        items.length !== state.items.length ||
        (items.length > 0 && items[items.length - 1].messageId !== state.items[state.items.length - 1].messageId);
      const newState = {
        ...state,
        chatUid: action.payload.chatUid,
        loading: null,
        flash: newMessage ? null : state.flash,
        since: action.payload.since,
        items,
        mark: items.length > 0 ? items[items.length - 1].t : state.mark,
        hide_message: action.payload.hide_message ? action.payload.hide_message : state.hide_message,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.CHAT_HISTORY_FAIL:
      return {
        ...state,
        loading: null,
        flash: 'Error loading chat messages.',
        flashType: 'default',
        mark: new Date() / 1,
      };
    default:
      return state;
  }
};
