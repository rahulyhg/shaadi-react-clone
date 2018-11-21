import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, args, { dispatch, getState, type, source, self }, params = {}, onSuccess, onError) => {
  dispatch({ type: types.GET_REJECTED_ALBUM_PHOTOS_REQUEST, payload: { uid, params, source } });
  api
    .get('/:id/photos/rejected', { params })
    .then(response => {
      dispatch({
        type: types.GET_REJECTED_ALBUM_PHOTOS_SUCCESS,
        payload: { source, type, uid: 'self', data: response.data.data },
      });
    })
    .catch(error => {
      const errorCleaned = errors.clean(error);
      dispatch({ type: types.GET_REJECTED_ALBUM_PHOTOS_FAIL, payload: { source, type, errorCleaned, error, uid: 'self' } });
    });
};
