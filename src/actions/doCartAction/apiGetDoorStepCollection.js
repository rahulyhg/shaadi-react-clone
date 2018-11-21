/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';

export default dispatch => {
  api
    .get('/payment/door-step')
    .then(response => {
      dispatch({ type: types.DOORSTEP_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.DOORSTEP_FAIL, payload: {} });
    });
};
