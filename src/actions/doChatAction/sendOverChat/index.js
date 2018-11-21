import types from '../../../action_types';
import Chat from '../../../chat';
import apiIsSendAllowed from './apiIsSendAllowed';
import apiChatRefreshProfile from '../apiChatRefreshProfile';

const p8 = s => {
  const ts = +new Date();
  const p = `${Math.random().toString(16)}000000000`.substr(2, 8);
  return s === 1 ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : s === 0 ? p : `-${ts}`;
};

const guid = (k1, k2) => {
  const k3 = 'web';
  return (k3 ? `${k3}-` : '') + (k1 ? `${k1}-` : '') + (k2 || '') + p8(1) + p8(2);
};

const asTime = msecs => {
  const t = new Date(msecs);
  return `${t.getHours() > 12 ? t.getHours() - 12 : t.getHours()}:${t.getMinutes()}${t.getHours() >= 12 ? 'PM' : 'AM'}`;
};

const sendOverChat = (auth, uid, [type, message], { dispatch, getState }, retries = 3) => {
  console.log(`---> sendOverChat ${type}`, JSON.stringify(message));
  switch (type) {
    case 'chatcode': {
      apiChatRefreshProfile(uid, dispatch);
      break;
    }
    case 'markAsRead':
    case 'markAsDelivered': {
      if (Chat.socket) {
        const messageIds = message;
        const status = type === 'markAsRead' ? 'read' : 'delivered';
        dispatch({ type: types.CHAT_MESSAGE_STATUS, payload: { chatUid: uid, messageIds, status } });
        messageIds.forEach(messageId => {
          if (!Chat.socket.sendReceipt(uid, messageId, status) && retries > 0) {
            setTimeout(() => sendOverChat(auth, uid, [type, [messageId]], { dispatch, getState }, retries - 1), 2000);
            console.log(`Will retry ${type} on ${messageId} in 2s #${retries}`);
          }
        });
      } else if (retries > 0) {
        setTimeout(() => sendOverChat(auth, uid, [type, message], { dispatch, getState }, retries - 1), 2000);
        console.log(`No socket. Will retry ${type} on ${message.length} messages in 2s #${retries}`);
      }
      break;
    }
    case 'startTyping':
    case 'stopTyping': {
      if (Chat.socket) {
        Chat.socket.sendTypingIndication(uid, type === 'startTyping');
      }
      break;
    }
    case 'sendMessage': {
      const params = { dispatch, getState, type, self: auth.uid };
      const onAllowed = (showBeforeSend, act) => {
        const messageId = guid(auth.uid, uid);
        const t = (new Date() / 1); // eslint-disable-line prettier/prettier
        const time = asTime(t);
        const to = uid;
        const m = { chatUid: to, from: auth.uid, messageId, body: message, t, time, to, isSelf: true, status: 'none' };
        if (showBeforeSend) {
          dispatch({ type: types.CHAT_MESSAGES_RECEIVED, payload: { chatUid: uid, messages: [m] } });
        }

        if (Chat.socket) {
          Chat.socket.sendMessage(uid, message, messageId, 0);
          Chat.socket.sendTypingIndication(uid, false);
        } else if (retries > 0) {
          setTimeout(() => sendOverChat(auth, uid, [type, message], { dispatch, getState }, retries - 1), 2000);
          console.log(`No socket. Will retry ${type} in 2s #${retries}`);
        }
        if (act) {
          dispatch(act);
        }
      };
      apiIsSendAllowed(uid, params, onAllowed);
      break;
    }
    default: {
      console.log('TO DO in sendOverChat action', type, uid, message);
      break;
    }
  }
};

export default sendOverChat;
