import types from '../../action_types';
import apiIsReceiveAllowed from './apiIsReceiveAllowed';
import doChatAction from '../doChatAction';

const sound = (getState, dispatch) =>
  new Promise((resolve, reject) => {
    if (getState().chat.settings.sound === 'off') {
      return resolve('failed');
    }
    return setTimeout(() => resolve('success'), 500);
  });

export default (auth, msg, dispatch, getState) => {
  console.log(`<--- onMessage ${msg.status}`, `${msg.from || ''}>${msg.to || ''} ${msg.body || ''}`);
  switch (msg.status) {
    case 'serverDelay': {
      console.log(`api skew: ${msg.addToServer / 1000}s`);
      dispatch({ type: types.CHAT_SKEW, payload: { api: msg.addToServer } });
      return;
    }
    case 'chatcode': {
      doChatAction('onMessage', msg.from, 'chatActivity', 'chatcode')(dispatch, getState);
      return;
    }
    case 'beganTyping':
      dispatch({ type: types.CHAT_OTHER_IS_TYPING, payload: { chatUid: msg.from } });
      return;
    case 'pausedTyping':
    case 'endedTyping':
      dispatch({ type: types.CHAT_OTHER_IS_NOT_TYPING, payload: { chatUid: msg.from } });
      return;
    case 'read': {
      const { messageId, from } = msg;
      dispatch({ type: types.CHAT_MESSAGE_STATUS, payload: { chatUid: from, messageId, status: 'read' } });
      return;
    }
    case 'delivered': {
      const { messageId, from } = msg;
      dispatch({ type: types.CHAT_MESSAGE_STATUS, payload: { chatUid: from, messageId, status: 'delivered' } });
      return;
    }
    case 'selfMessage': {
      const { from, messageId, body, t, time, to } = msg;
      const m = { chatUid: to, from, messageId, body, t, time, to, isSelf: true, status: 'sent' };
      dispatch({ type: types.CHAT_MESSAGES_RECEIVED, payload: { chatUid: to, messages: [m] } });
      dispatch({ type: types.CHAT_MESSAGE_STATUS, payload: { chatUid: to, messageId, status: 'sent' } });
      return;
    }
    case 'newMessage': {
      const onAllowed = () => {
        const { from, messageId, body, t, time, to } = msg;
        doChatAction('onMessage', from, 'chatActivity', 'markAsDelivered', [messageId])(dispatch, getState);
        setTimeout(() => {
          dispatch({ type: types.CHAT_OTHER_IS_NOT_TYPING, payload: { chatUid: from } });
          dispatch({
            type: types.CHAT_MESSAGES_RECEIVED,
            payload: {
              chatUid: from,
              messages: [{ chatUid: from, from, messageId, body, t, time, to, isSelf: false, status: 'none' }],
            },
          });
        }, 1);
        const isMobile = getState().view.layout === 'mobile';
        const windows = getState().chat.windows;
        const ourWindow = [...windows.normal, ...windows.stacked, ...windows.closed].filter(w => w.uid === from)[0];
        const openWindows = [...windows.normal, ...windows.stacked, ...windows.closed].filter(w => w.status === 'opened');
        if (!getState().profiles[from]) {
          doChatAction('onMessage', from, 'refreshChatProfile')(dispatch, getState);
        }
        if (!ourWindow && openWindows.length > 0) {
          dispatch({ type: types.CHAT_WINDOW_ADD, payload: { uid: from, initialStatus: 'minimized' } });
          dispatch({ type: types.CHAT_WINDOW_UNREAD, payload: from });
          !isMobile &&
            sound(getState, dispatch).then(() => {
              setTimeout(() => dispatch({ type: types.BEEP_SOUND_STOP }), 1500);
            });
        } else if (!ourWindow && openWindows.length === 0) {
          dispatch({ type: types.CHAT_WINDOW_ADD, payload: { uid: from, initialStatus: 'opened' } });
          doChatAction('onMessage', from, 'chatActivity', 'markAsRead', [messageId])(dispatch, getState);
          doChatAction('onMessage', msg.from, 'chatWindowAction', ['open'])(dispatch, getState);
          dispatch({ type: types.CHAT_WINDOW_UNREAD, payload: from });
          !isMobile &&
            sound(getState, dispatch).then(() => {
              setTimeout(() => dispatch({ type: types.BEEP_SOUND_STOP }), 1500);
            });
        } else if (ourWindow && ourWindow.status === 'stacked') {
          dispatch({ type: types.CHAT_WINDOW_UNREAD, payload: from });
          !isMobile &&
            sound(getState, dispatch).then(() => {
              setTimeout(() => dispatch({ type: types.BEEP_SOUND_STOP }), 1500);
            });
        } else if (ourWindow && ourWindow.status === 'minimized') {
          dispatch({ type: types.CHAT_WINDOW_UNREAD, payload: from });
          !isMobile &&
            sound(getState, dispatch).then(() => {
              setTimeout(() => dispatch({ type: types.BEEP_SOUND_STOP }), 1500);
            });
        } else if (ourWindow && ourWindow.status === 'closed') {
          doChatAction('onMessage', from, 'chatActivity', 'markAsRead', [messageId])(dispatch, getState);
          doChatAction('onMessage', msg.from, 'chatWindowAction', ['open'])(dispatch, getState);
        } // else ourWindow is open, nothing to do
      };
      const params = { dispatch, getState, type: 'onMessage', self: auth.uid };
      apiIsReceiveAllowed(msg.from, params, onAllowed);
      return;
    }
    default:
      console.log(`%c TO DO in onMessage ${msg.status}`, 'font-size: 16px', auth.uid, JSON.stringify(msg));
  }
};
