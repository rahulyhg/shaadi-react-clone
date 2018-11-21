import withAuth from '../withAuth';
import sendOverChat from './sendOverChat';
import fetchChatHistory from './fetchChatHistory';
import apiChatRefreshProfile from './apiChatRefreshProfile';
import doChatWindowAction from './doChatWindowAction';
import guard from '../lib/guard';
import types from '../../action_types';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      const params = { source, self: auth.uid, type, dispatch, getState };
      switch (type) {
        case 'fetchChatHistory':
          fetchChatHistory(uid, params);
          doChatWindowAction(uid, ['open'], params);
          if (!getState().profiles[uid]) {
            apiChatRefreshProfile(uid, dispatch);
          }
          break;
        case 'hideDownloadBanner': {
          guard.markShown('download_banner', auth.uid, 3600 * 24 * 5);
          dispatch({ type: types.DOWNLOAD_BANNER_HIDE });
          break;
        }
        case 'chatActivity':
          console.log('chatActivity', args);
          sendOverChat(auth, uid, args, params);
          break;
        default:
          console.log('%c TO DO in doChatAction', 'font-size: 16px; color: blue;', params);
      }
    },
    { caller: 'doChatAction', allowCache: true, delay: 1 },
  );
};
