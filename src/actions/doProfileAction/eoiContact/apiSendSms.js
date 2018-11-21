import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, { dispatch, getState, type, source, self }, data, onSuccess) => {
  dispatch({ type: types.CONTACT_EOI_REQUEST, payload: { type, source, uid } });
  const profile = getState().profiles[uid] || { uid };
  const metadata = {
    ...getState().metadata,
    se: profile.se,
    source,
    event_loc_url: window.location.href,
  };

  api
    .post('/send-sms', { id: uid, metadata, ...data })
    .then(response => {
      const payload = { source, type, uid, ...response.data };
      onSuccess(payload);
      dispatch({ type: types.CONTACT_EOI_SUCCESS, payload });
    })
    .catch(error => {
      dispatch({ type: types.CONTACT_EOI_FAIL, payload: { uid, ...errors.clean(error), profile, self } });
    });
};
