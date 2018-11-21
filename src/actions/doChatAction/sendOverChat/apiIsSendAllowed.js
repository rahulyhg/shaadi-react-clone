import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';
import apiChatRefreshProfile from '../apiChatRefreshProfile';

export default (uid, { dispatch, getState, type, self }, onAllowed) => {
  const profile = getState().profiles[uid] || { uid };
  const metadata = {
    se: profile.se,
    source: 'chat',
    event_loc_url: window.location.href,
  };

  console.log('(can send?)');
  api
    .get('/chat-authorizations/me', { params: { id: uid, direction: 'out', metadata } })
    .then(response => {
      if (response.data.specialAction === 'try_offline') {
        console.log('(      maybe)');
        onAllowed(false);
        dispatch({
          type: types.CHAT_SHOW_FLASH,
          payload: { chatUid: uid, uid, flash: response.data.message, flashType: 'error' },
        });
        return;
      }
      if (response.data.specialAction === 'eoi_sent') {
        console.log('(      eoi_sent)');
        const flash = 'Your invitation has been sent.';
        onAllowed(true, { type: types.CHAT_SHOW_FLASH, payload: { chatUid: uid, uid, flash, flashType: 'success' } });
        if (getState().profilePage.item.uid === uid) apiChatRefreshProfile(uid, dispatch);
        return;
      }
      if (response.data.isAllowed) {
        console.log('(      yes)');
        onAllowed(true);
      } else {
        console.log('(      no)');
        dispatch({
          type: types.CHAT_SHOW_FLASH,
          payload: { chatUid: uid, uid, flash: response.data.message, flashType: 'error' },
        });
      }
    })
    .catch(error => {
      console.log('(      uhoh)');
      let flash = errors.clean(error).error.message;
      if (['service', 'unknown'].some(m => flash.toLowerCase().includes(m))) {
        flash = 'Chat is currently under maintenance. Try again in a few minutes.';
      }
      dispatch({ type: types.CHAT_SHOW_FLASH, payload: { chatUid: uid, uid, flash, flashType: 'error' } });
      setTimeout(() => dispatch({ type: types.CHAT_HIDE_FLASH, payload: { uid, flash } }), 20 * 1000);
    });
};
