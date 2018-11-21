/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default (auth, dispatch, isShaadiCareChecked, isProfileBoosterChecked, cartId, mopId, mopName, accessToken) => {
  const data = { auth, isShaadiCareChecked, isProfileBoosterChecked, cartId, mopId, mopName, accessToken };
  api
    .post('/payment/get-order-id', data)
    .then(response => {
      dispatch({ type: types.GET_ORDERID_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.GET_ORDERID_FAIL, error });
    });
};
