import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, { dispatch, getState, type, self }, onAllowed) => {
  const profile = getState().profiles[uid] || { uid };
  const metadata = {
    se: profile.se,
    source: 'chat',
    event_loc_url: window.location.href,
  };

  api
    .get('/chat-authorizations/me', { params: { id: uid, direction: 'in', metadata } })
    .then(response => {
      if (response.data.specialAction === 'both_party_locked') {
        dispatch({ type: types.CHAT_INCREMENT_COUNT, payload: { uid } });
      } else if (response.data.isAllowed) {
        onAllowed();
      } else {
        console.log('no receive', response.data);
      }
    })
    .catch(error => {
      let flash = errors.clean(error).error.message;
      if (['service', 'unknown'].some(m => flash.toLowerCase().includes(m))) {
        flash = 'Chat is currently under maintenance. Try again in a few minutes.';
      }
      dispatch({ type: types.CHAT_SHOW_FLASH, payload: { uid, flash, flashType: 'error' } });
      setTimeout(() => dispatch({ type: types.CHAT_HIDE_FLASH, payload: { uid, flash } }), 5 * 1000);
    });
};
