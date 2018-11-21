/* global window */
import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';
import localCache from '../../localCache';

let chatData;
export default (auth, dispatch, getState, onSuccess, sourceInfo = {}) => {
  dispatch({ type: types.CHAT_DATA_REQUEST, payload: {} });
  const cacheKey = auth.uid ? `${auth.uid}::chats/me` : null;
  if (cacheKey) {
    chatData = localCache.read(cacheKey);

    if (chatData) {
      dispatch({ type: types.CHAT_DATA_CACHE, payload: chatData });
    }
  }
  api
    .get('/chats/me', { params: { file_extension: `${getState().config.app.webp !== '0' ? 'webp' : ''}` } }, { ...sourceInfo })
    .then(response => {
      let cachedData = chatData;
      if (sourceInfo.chatList === 'buddyList') {
        chatData && (response.data.chats = chatData.chats);
        cachedData = { chats: { unread: 0, items: [] }, ...chatData, online: response.data.online };
      }
      if (sourceInfo.chatList === 'recentChats') {
        chatData && (response.data.online = chatData.online);
        cachedData = {
          online: {
            accepted: { items: [] },
            shortlisted: { items: [] },
            matches: { items: [] },
          },
          ...chatData,
          chats: response.data.chats,
        };
      }
      if (!sourceInfo.chatList) {
        cachedData = response.data;
      }
      dispatch({ type: types.CHAT_DATA_SUCCESS, payload: response.data });
      cachedData && localCache.write(cacheKey, cachedData, 3600);

      if (onSuccess) {
        onSuccess(auth, dispatch, getState);
      }
    })
    .catch(error => dispatch({ type: types.CHAT_DATA_FAIL, payload: errors.clean(error) }));
};
