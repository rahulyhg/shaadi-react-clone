import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, requestParams, { dispatch, getState, source } = {}) => {
  dispatch({ type: types.GET_SELF_PROFILE_REQUEST, payload: {} });
  api
    .get('/reg-photo-page-profile', {}, { getState, source })
    .then(response => {
      dispatch({ type: types.GET_SELF_PROFILE_SUCCESS, payload: { data: response.data } });
    })
    .catch(error => {
      dispatch({ type: types.GET_SELF_PROFILE_FAIL, payload: { error, cleanedErr: errors.clean(error) } });
    });
};
