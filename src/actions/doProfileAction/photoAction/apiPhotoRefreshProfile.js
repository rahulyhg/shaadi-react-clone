import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, type, source, dispatch, onFail) => {
  dispatch({ type: types.PHOTO_EOI_REQUEST, payload: { uid, type, source } });

  api
    .get('/profiles/:id', {
      params: { id: uid },
    })
    .then(response => {
      console.log('%c albumStatus', 'color: green; font-size: 20px', response.data.flags.albumStatus);
      const payload = { uid, source, type, albumStatus: response.data.flags.albumStatus };
      dispatch({ type: types.PHOTO_EOI_SUCCESS, payload });
      dispatch({ type: types.PROFILE_SUCCESS, payload: response.data });
    })
    .catch(error => {
      const message = errors.clean(error);
      const payload = { uid, source, type, ...message };
      if (onFail) {
        onFail(payload, message);
      } else {
        dispatch({ type: types.PHOTO_EOI_FAIL, payload });
      }
    });
};
