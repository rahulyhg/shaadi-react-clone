import types from '../action_types';
import api from '../api';
import withAuth from './withAuth';
import errors from './lib/errors';

export default ({ orderid }) => (dispatch, getState) => {
  withAuth(auth => {
    dispatch({ type: types.PAYMENT_THANK_YOU_REQUEST, payload: {} });
    api
      .get('/payment/order-success', { params: { orderid } })
      .then(response => {
        const responsedata = { ...response.data.data };
        dispatch({
          type: types.PAYMENT_THANK_YOU_SUCCESS,
          payload: { data: { ...responsedata } },
        });
      })
      .catch(error => {
        dispatch({ type: types.PAYMENT_THANK_YOU_FAIL, payload: { ...errors.clean(error), prefix: 'Error fetching message: ' } });
        const { wwwBaseUrl } = getState().config.app;
        if (/payment/i.test(window.location.pathname)) {
          window.location.href = `${wwwBaseUrl}/payment`;
        }
      });
  });
};
