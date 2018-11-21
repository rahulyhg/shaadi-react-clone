import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

// send, accepted, declined, send_reminder, contact
export default (action, id, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.FETCH_DEFAULT_DRAFT_REQUEST, payload: { type, source } });
  api
    .get('/drafts/default', { params: { action, id } })
    .then(response => {
      dispatch({
        type: types.FETCH_DEFAULT_DRAFT_SUCCESS,
        payload: { source, type, draft: response.data.draft, isSent: response.data.isSent },
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_DEFAULT_DRAFT_FAIL, payload: { ...errors.clean(error), prefix: 'Error fetching message: ' } });
    });
  if (type === 'accept') {
    api.get('/chat-histories', { params: { uid: id, type: 'connect' } }).then(response => {
      dispatch({ type: types.CONNECT_MESSAGE_SUCCESS, payload: response.data });
    });
  }
};
