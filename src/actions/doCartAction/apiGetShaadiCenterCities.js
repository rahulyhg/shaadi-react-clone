/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default dispatch => {
  api
    .get('/payment/shaadi-centers')
    .then(response => {
      dispatch({ type: types.SHAADICENTER_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.SHAADICENTER_FAIL, payload: {} });
    });
};
