/* global window */
import types from '../../action_types';
import Chat from '../../chat';
import onMessage from './onMessage';

export default (auth, dispatch, getState) => {
  const { config } = getState();
  const nonce = `${Math.random().toString(16)}000000000`.substr(2, 8);

  dispatch({ type: types.CHAT_CONNECTING, payload: {} });
  const socket = new Chat(config.app.chatAppKey, {
    auth: { uid: auth.uid, accessToken: auth.accessToken, nonce, device: 'web' },
  });
  Chat.socket = socket;
  const channel = socket.subscribe(`private/${auth.uid}`);

  socket.on('connected', () => {
    const chatStatus = (getState().chat.settings && getState().chat.settings.status) || 'Online';
    dispatch({ type: types.CHAT_CONNECTED, payload: {} });
    socket.sendPresence(chatStatus);
  });

  socket.on('disconnected', flash => {
    dispatch({ type: types.CHAT_DISCONNECTED, payload: { flash } });
  });

  socket.on('error', err => {
    console.log('CHAT ERROR', err);
  });

  channel.on('message', msg => {
    onMessage(auth, msg, dispatch, getState);
  });

  channel.on('presence', status => {
    dispatch({ type: types.CHAT_PRESENCE, payload: { status } });
  });

  socket.connect();
  Chat.socket = socket;
  window.chatSocket = socket;
};
