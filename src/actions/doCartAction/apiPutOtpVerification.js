/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (auth, dispatch, otp) => {
  const data = { auth, otp };
  api
    .put('/payment/otp-verification', data)
    .then(response => {
      dispatch({ type: types.OTP_VERIFICATION_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.OTP_VERIFICATION_FAIL, error });
    });
};
