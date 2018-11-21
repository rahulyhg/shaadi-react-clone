import withAuth from '../withAuth';
import types from '../../action_types';
import sendOverChat from './sendOverChat';
import doChatWindowAction from './doChatWindowAction';
import fetchChatHistory from './fetchChatHistory';
import changeSettings from './changeSettings';
import apiGetNotifications from './apiGetNotifications';
import onAlertsSuccess from './onAlertsSuccess';
import createAlertsTicker from './createAlertsTicker';
import guard from '../lib/guard';
import apiChatRefreshProfile from './apiChatRefreshProfile';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      const params = { source, self: auth.uid, type, dispatch, getState };
      switch (type) {
        case 'onChatInitMobile': {
          if (guard.canShow('download_banner', auth.uid)) {
            dispatch({ type: types.DOWNLOAD_BANNER_SHOW });
          }
          break;
        }
        case 'onChatInitDesktop': {
          const onTick = createAlertsTicker(auth, dispatch, getState);
          setInterval(onTick, 29 * 1000);
          onTick();
          break;
        }
        case 'hideAlertsToast': {
          dispatch({ type: types.NOTIFICATIONS_TOAST_HIDE, payload: { id: args[0] } });
          break;
        }
        case 'profileCardDisplay': {
          dispatch({ type: types.CHAT_SETTINGS_CHANGE, payload: { key: args[0], value: args[1] } });
          break;
        }
        case 'hideAllPopups':
          dispatch({ type: types.HIDE_ALL_DROPDOWNS });
          break;
        case 'fetchChatHistory':
          fetchChatHistory(uid, params);
          if (!getState().profiles[uid]) {
            apiChatRefreshProfile(uid, dispatch);
          }
          break;
        case 'refreshChatProfile':
          apiChatRefreshProfile(uid, dispatch);
          break;
        case 'chatWindowAction':
          doChatWindowAction(uid, args, params);
          break;
        case 'chatActivity':
          sendOverChat(auth, uid, args, params);
          break;
        case 'set': {
          if (args[0] === 'activeTab' && args[1] === 'alerts') {
            apiGetNotifications(auth, dispatch, getState, onAlertsSuccess, 'manual');
          }
          changeSettings(auth, args, params);
          break;
        }
        default:
          console.log('%c TO DO in doChatAction', 'font-size: 16px; color: blue;', params);
      }
    },
    { caller: 'doChatAction', allowCache: true, delay: 1 },
  );
};
