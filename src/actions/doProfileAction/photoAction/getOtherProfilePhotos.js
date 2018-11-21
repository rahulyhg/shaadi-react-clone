import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, { dispatch, getState, type, source, params = {} }) => {
  dispatch({ type: types.GET_OTHER_PROFILE_PHOTOS_REQUEST, payload: { uid, params, source } });
  api
    .get('/profiles/:id/photos', { params: { ...params } }, { getState, uid })
    .then(response => {
      const { data: { data: { [uid]: data = {} } = {} } = {} } = response || {};
      dispatch({
        type: types.GET_OTHER_PROFILE_PHOTOS_SUCCESS,
        payload: { source, type, uid, data },
      });
    })
    .catch(error => {
      const payload = errors.clean(error);
      dispatch({ type: types.GET_OTHER_PROFILE_PHOTOS_FAIL, payload });
    });
};
