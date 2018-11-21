/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (auth, dispatch, mobile, country, country_code) => {
  const data = { auth, mobile, country, country_code };
  api
    .post('/payment/otp-generation', data)
    .then(response => {
      dispatch({ type: types.OTP_GENERATION_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.OTP_GENERATION_FAIL, error });
    });
};
