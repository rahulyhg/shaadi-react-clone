import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, args, { dispatch, getState, type, source, self }, data = {}, params = {}) => {
  const metadata = {
    ...getState().metadata,
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
  };
  const requestBody = { ...data, metadata };
  dispatch({ type: types.UPDATE_PROFILE_PRIVACY_SETTING_REQUEST, payload: { uid, queryParams: params, source } });
  api
    .put('/:id/preferences', requestBody)
    .then(response => {
      const payload = { source, type, uid: 'self' };
      payload.data = data.data;
      dispatch({
        type: types.UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS,
        payload,
      });
    })
    .catch(error => {
      const payload = { source, type, uid: 'self', errors };
      payload.errors = errors.clean(error);
      dispatch({ type: types.UPDATE_PROFILE_PRIVACY_SETTING_FAIL, payload });
    });
};
