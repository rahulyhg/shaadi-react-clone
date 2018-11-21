/* eslint camelcase: 0, no-underscore-dangle: 0 */
import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

const loadPayment = (uid, dispatch, getState, query) => {
  dispatch({ type: types.PRODUCTS_DETAIL_REQUEST, payload: {} });
  const { profileid = '', source = '', profilecount = '', page = '', pid = '' } = query;
  api
    .get('/payment/get-products', { params: { uid, profileid, source, profilecount, page, pid } })
    .then(response => {
      dispatch({
        type: types.PRODUCTS_DETAIL_SUCCESS,
        payload: { data: { ...response.data, query } },
      });
    })
    .catch(error => {
      dispatch({ type: types.PRODUCTS_DETAIL_FAIL, payload: { ...errors.clean(error), prefix: 'Error fetching message: ' } });
      const { wwwBaseUrl } = getState().config.app;
      if (/payment/i.test(window.location.pathname)) {
        window.location.href = `${wwwBaseUrl}/payment`;
      }
    });
};
export default loadPayment;
