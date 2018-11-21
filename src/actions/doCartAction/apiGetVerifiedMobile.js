/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (uid, dispatch, ...args) => {
  api
    .get('/payment/member-contact-details', { params: { uid } })
    .then(response => {
      dispatch({ type: types.VERIFIED_MOBILE_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.VERIFIED_MOBILE_FAIL, payload: {} });
    });
};
