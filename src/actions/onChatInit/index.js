/* global window */
import withAuth from '../withAuth';
import types from '../../action_types';
import localCache from '../../localCache';
import apiGetChatData from './apiGetChatData';
import socketInit from './socketInit';
import createChatTicker from './createChatTicker';
import doChatAction from '../doChatAction';

export default (isMobile, chatList) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      const chatSettingsKey = `${auth.uid}::chatSettings`;
      const settings = localCache.read(chatSettingsKey);

      if (settings) {
        dispatch({ type: types.CHAT_SETTINGS_CACHE, payload: settings });
      }
    },
    { caller: 'onChatInit/settingsCache', allowCache: true },
  );

  withAuth(
    ({ auth }) => {
      apiGetChatData(auth, dispatch, getState, socketInit, { isMobile, chatList });
      if (isMobile) {
        doChatAction('chatInit', null, 'onChatInitMobile')(dispatch, getState);
      } else {
        doChatAction('chatInit', null, 'onChatInitDesktop')(dispatch, getState);
      }

      const onTick = createChatTicker(auth, dispatch, getState, { isMobile });
      setInterval(onTick, 180 * 1000);
    },
    { caller: 'onChatInit', allowCache: true, delay: 99 },
  );
};
