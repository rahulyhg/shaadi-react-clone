/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (uid, args, dispatch, getState) => {
  api.post('/sendVerificationRequest', args[0]).then(response => {
    dispatch({
      type: types.PHONE_VERIFICATION_REQUEST_SENT,
      payload: {},
    });
  });
};
