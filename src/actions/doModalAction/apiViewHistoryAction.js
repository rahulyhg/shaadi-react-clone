/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (source, uid, type, args, dispatch, getState) => {
  const currState = getState();
  api.get('/chat-histories', { params: { uid } }).then(response => {
    dispatch({
      type: types.HISTORY_MODAL_SHOW,
      payload: {
        modal: 'history',
        profileid: uid,
        data: response.data,
        display_name: currState.profiles[uid].name,
      },
    });
  });
};
