import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (txtUid, dispatch, onLoad) => {
  if (!txtUid || txtUid.length === 0 || txtUid === 'default') {
    const message = 'Sorry, this Member is not a Shaadi.com member. Please try again.';
    dispatch({ type: types.PROFILE_FAIL, payload: { error: { message } } });
    return;
  }
  dispatch({ type: types.PROFILE_REQUEST, payload: { txtUid } });
  api
    .get('/txtprofiles/:id', { params: { id: txtUid } })
    .then(response => {
      const { uid } = (response && response.data) || {};
      onLoad(uid);
    })
    .catch(error => dispatch({ type: types.PROFILE_FAIL, payload: { ...errors.clean(error), searchType: 'profile_id' } }));
};
