import types from '../../action_types';
import api from '../../api';

export default (uid, { photoSizes } = {}, { dispatch, getState, isSelf } = {}) => {
  dispatch({ type: types.GET_PROFILE_PHOTO_REQUEST, payload: {} });
  api
    .get('/:id/profile-photo', {}, { uid, getState, photoSizes })
    .then(response => {
      dispatch({ type: types.GET_PROFILE_PHOTO_SUCCESS, payload: { data: response.data.data[uid], uid: isSelf ? 'self' : uid } });
    })
    .catch(error => {
      dispatch({ type: types.GET_PROFILE_PHOTO_FAIL, payload: { error } });
    });
};
