/* eslint camelcase: 0, no-underscore-dangle: 0 */
import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

const loadCart = (uid, dispatch, getState, query) => {
  dispatch({ type: types.CART_REQUEST, payload: {} });
  api
    .get('/payment/get-cart', { params: { uid } })
    .then(response => {
      dispatch({
        type: types.CART_SUCCESS,
        payload: { data: { ...response.data, query } },
      });
    })
    .catch(error => {
      dispatch({ type: types.CART_FAIL, payload: { ...errors.clean(error), prefix: 'Error fetching message: ' } });
      if (/cart/i.test(window.location.pathname)) {
        const { wwwBaseUrl } = getState().config.app;
        window.location.href = `${wwwBaseUrl}/payment`;
      }
    });
};

export default loadCart;
