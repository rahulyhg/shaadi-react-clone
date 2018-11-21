import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, type, source, dispatch, onFail, contactAction) => {
  dispatch({ type: types.EOI_REQUEST, payload: { uid, type, source } });
  api
    .get('/profiles/:id', {
      params: { id: uid },
    })
    .then(response => {
      console.log('%c connectionStatus', 'color: green; font-size: 20px', response.data.flags.connectionStatus);
      const payload = { uid, source, type, connectionStatus: response.data.flags.connectionStatus };
      dispatch({ type: types.EOI_SUCCESS, payload });
      if (contactAction !== 'available') dispatch({ type: types.PROFILE_SUCCESS, payload: response.data });
    })
    .catch(error => {
      const message = errors.clean(error);
      const payload = { uid, source, type, ...message };
      if (onFail) {
        onFail(payload, message);
      } else {
        dispatch({ type: types.EOI_FAIL, payload });
      }
    });
};
