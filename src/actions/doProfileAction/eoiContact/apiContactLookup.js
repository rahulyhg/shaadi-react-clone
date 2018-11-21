import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, { dispatch, getState, type, source, self }, onSuccess, onFail) => {
  dispatch({ type: types.CONTACT_EOI_REQUEST, payload: { type, source, uid } });

  const profile = getState().profiles[uid] || { uid };
  const metadata = {
    ...getState().metadata,
    se: profile.se,
    source,
    event_loc_url: window.location.href,
  };

  api
    .post('/contact-lookups', { id: uid, metadata })
    .then(response => {
      const payload = { source, type, uid, ...response.data.contactLookup };
      onSuccess(payload);
      dispatch({ type: types.CONTACT_EOI_SUCCESS, payload });
    })
    .catch(error => {
      const payload = { uid, ...errors.clean(error) };
      onFail(payload);
    });
};
