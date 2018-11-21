/* global window */
import types from '../../../action_types';
import api from '../../../api';
import { clearProfileCaches } from '../../lib/utils';
import errors from '../../lib/errors';

export default (uid, { dispatch, getState, type, source }, data = {}, onSuccess, onFail) => {
  dispatch({ type: types.EDIT_ASTRO_REQUEST, payload: { uid, data, source } });

  return api
    .put('/astro/me', data)
    .then(response => {
      clearProfileCaches(uid);

      const payload = response.data;

      if (onSuccess) {
        onSuccess(payload);
      } else {
        dispatch({ type: types.EDIT_ASTRO_SUCCESS, payload });
      }

      return Promise.resolve(true);
    })
    .catch(error => {
      const message = errors.clean(error);
      const payload = { uid, source, type, ...message };
      if (onFail) {
        onFail(payload, message);
      } else {
        dispatch({ type: types.EDIT_ASTRO_FAIL, payload });
      }
    });
};
