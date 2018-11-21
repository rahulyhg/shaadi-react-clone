import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, args, { dispatch, getState, type, source, self }, params = {} /* , onSuccess, onError */) => {
  dispatch({ type: types.GET_PROFILE_PRIVACY_SETTING_REQUEST, payload: { uid, queryParams: params, source } });
  api
    .get('/:id/preferences', { params })
    .then(response => {
      dispatch({
        type: types.GET_PROFILE_PRIVACY_SETTING_SUCCESS,
        payload: { source, type, uid: 'self', data: response.data.data[uid || self] },
      });
    })
    .catch(error => {
      const payload = errors.clean(error);
      dispatch({ type: types.GET_PROFILE_PRIVACY_SETTING_FAIL, payload });
    });
};
