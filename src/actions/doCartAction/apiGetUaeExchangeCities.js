/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default dispatch => {
  api
    .get('/payment/uae-cities')
    .then(response => {
      dispatch({ type: types.UAE_EXCHANGE_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.UAE_EXCHANGE_FAIL, payload: {} });
    });
};
