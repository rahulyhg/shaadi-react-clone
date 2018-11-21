import types from '../../action_types';
import localCache from '../../localCache';
// import Chat from '../../chat';
import api from '../../api';

const changeSettings = (auth, [key, value], { dispatch, getState }, retries = 3) =>
  import('../../chat').then(Chat => {
    if (key === 'status') {
      const data = { [key]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() };
      api
        .put('/chat-presence/update', data)
        .then(response => {
          dispatch({ type: types.CHAT_SETTINGS_CHANGE, payload: { key, value } });
        })
        .catch(error => console.log('chat changeSettings error ', error));
    } else {
      dispatch({ type: types.CHAT_SETTINGS_CHANGE, payload: { key, value } });
    }

    if (key === 'status') {
      if (Chat.socket) {
        if (!Chat.socket.sendPresence(value) && retries > 0) {
          setTimeout(() => changeSettings(auth, [key, value], { dispatch, getState }, retries - 1), 2000);
          console.log(`Will retry setting status ${value} in 2s`);
        }
      }
    }

    const cacheKey = `${auth.uid}::chatSettings`;
    const payload = getState().chat.settings;
    localCache.write(cacheKey, payload, 3600 * 24 * 7);
  });

export default changeSettings;
