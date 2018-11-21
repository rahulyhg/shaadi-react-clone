/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, { dispatch }) => {
  dispatch({ type: types.CHAT_HISTORY_REQUEST, payload: { chatUid: uid } });

  api
    .get('/chat-histories', { params: { uid } })
    .then(response => {
      dispatch({ type: types.CHAT_HISTORY_SUCCESS, payload: response.data });
    })
    .catch(error => dispatch({ type: types.CHAT_HISTORY_FAIL, payload: { ...errors.clean(error), chatUid: uid } }));
};
