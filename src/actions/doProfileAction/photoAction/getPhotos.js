import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, args, { dispatch, getState, type, source, self }, params = {}, onSuccess, onError) => {
  dispatch({ type: types.GET_PROFILE_PHOTOS_REQUEST, payload: { uid, params, source } });
  api
    .get('/:id/photos', { params: { ...params } }, { getState })
    .then(response => {
      dispatch({
        type: types.GET_PROFILE_PHOTOS_SUCCESS,
        payload: { source, type, uid: 'self', data: response.data.data[uid] },
      });
    })
    .catch(error => {
      const payload = errors.clean(error);
      dispatch({ type: types.GET_PROFILE_PHOTOS_FAIL, payload });
    });
};
