import types from '../../action_types';
import errors from '../lib/errors';
import api from '../../api';

export default (uid, args, { dispatch, getState }) => {
  dispatch({ type: types.CONTACT_GET_SMS_REQUEST });

  const data = {
    profile_id: uid,
  };
  api
    .post('/get-sms', data)
    .then(response => {
      dispatch({ type: types.CONTACT_GET_SMS_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: types.CONTACT_GET_SMS_ERROR, payload: errors.clean(error) });
    });
};
