import types from '../../action_types';
import api from '../../api';

const open = (uid, dispatch, getState) => {
  const chat = getState().chat;
  const windows = chat.windows.normal.concat(chat.windows.stacked, chat.windows.closed);
  const w = windows.filter(wind => wind.uid === uid)[0];
  const chats = chat.sidebar.chats.filter(i => i.uid === uid)[0];

  const data = [{ profileid: uid, state: '0' }];

  // Minimize all open
  const alreadyOpen = windows.filter(wind => wind.status === 'opened');
  alreadyOpen.forEach(wind => {
    data.push({ profileid: wind.uid, state: '1' });
    dispatch({ type: types.CHAT_WINDOW_MINIMIZE, payload: wind.uid });
  });

  // Changing the state of chat window
  api
    .put('/chat-windows/update', data)
    .then(response => response)
    .catch(error => console.log('chat windows open error ', error));

  // Open the one we want
  dispatch({
    type: w ? types.CHAT_WINDOW_OPEN : types.CHAT_WINDOW_ADD,
    payload: { uid, unreadCount: chats ? chats.unreadCount : 0 },
  });

  // Stack if we already had 5
  const addedMore = w ? w.status === 'stacked' || w.status === 'closed' : true;
  if (chat.windows.normal[3] && addedMore) {
    dispatch({
      type: types.CHAT_WINDOW_STACK,
      payload: { uid: chat.windows.normal[3].uid, unreadCount: chats ? chats.unreadCount : 0 },
    });
  }
};

const close = (uid, dispatch, getState) => {
  const chat = getState().chat;
  const data = [{ profileid: uid, state: '3' }];

  if (chat.windows.stacked.length > 0) {
    data.push({ profileid: chat.windows.stacked[0].uid, state: '1' });
    dispatch({ type: types.CHAT_WINDOW_MINIMIZE, payload: chat.windows.stacked[0].uid });
  }

  dispatch({ type: types.CHAT_WINDOW_CLOSE, payload: uid });
  // Changing the state of chat window
  api
    .put('/chat-windows/update', data)
    .then(response => response)
    .catch(error => console.log('chat windows open error ', error));
};

const minimize = (uid, dispatch) => {
  const data = [{ profileid: uid, state: '1' }];

  dispatch({ type: types.CHAT_WINDOW_MINIMIZE, payload: uid });
  // Changing the state of chat window
  api
    .put('/chat-windows/update', data)
    .then(response => response)
    .catch(error => console.log('chat windows open error ', error));
};

const minimizeAll = (uid, dispatch, getState) => {
  const chat = getState().chat;
  const data = [];

  const windows = chat.windows.normal.concat(chat.windows.stacked, chat.windows.closed);
  const alreadyOpen = windows.filter(wind => wind.status === 'opened');
  alreadyOpen.forEach(wind => {
    data.push({ profileid: wind.uid, state: '1' });
    dispatch({ type: types.CHAT_WINDOW_MINIMIZE, payload: wind.uid });
  });

  // Changing the state of chat window
  api
    .put('/chat-windows/update', data)
    .then(response => response)
    .catch(error => console.log('chat windows open error ', error));
};

const Actions = {
  open,
  close,
  minimize,
  minimizeAll,
};

export default (uid, args, { dispatch, getState }) => {
  const act = args[0];
  Actions[act](uid, dispatch, getState);
};
