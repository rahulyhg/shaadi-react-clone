import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, dispatch) => {
  api
    .get('/profiles/:id', {
      params: { id: uid },
    })
    .then(response => {
      dispatch({ type: types.PROFILE_SUCCESS, payload: response.data });
    })
    .catch(error => {
      const message = errors.clean(error);
      console.log('Silently ignoring profile fetch error', message);
    });
};
