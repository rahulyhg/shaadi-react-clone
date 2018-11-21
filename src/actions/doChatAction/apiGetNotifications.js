/* global window */
import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (auth, dispatch, getState, onSuccess, source) => {
  const payload = { mark_as_read: source === 'manual' ? 'yes' : 'no' };
  getState().config.app.webp !== '0' && (payload.file_extension = 'webp');

  dispatch({ type: types.NOTIFICATIONS_REQUEST, payload });
  api
    .get('/notifications/me', { params: payload })
    .then(response => {
      onSuccess(dispatch, getState, response.data.alerts.unread, response.data.alerts.items, getState().chat.sidebar.alerts, source);
      dispatch({ type: types.NOTIFICATIONS_SUCCESS, payload: { ...response.data, markAsRead: source === 'manual' } });
    })
    .catch(error => dispatch({ type: types.NOTIFICATIONS_FAIL, payload: errors.clean(error) }));
};
