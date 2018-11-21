/* eslint camelcase: 0, no-underscore-dangle: 0 */
import types from '../../action_types';
import api from '../../api';

const redirectToCart = () => {
  window.location.href = `${window.location.origin}/cart`;
};

const addToCart = (auth, dispatch, getState, query) => {
  dispatch({ type: types.ADD_CART_REQUEST, payload: {} });
  const { product_code = '', discount_code = '' } = query;
  const params = { auth, product_code, discount_code };

  api
    .post('/payment/add-to-cart', { params })
    .then(response => {
      if (response.data.data && response.data.data.success) {
        redirectToCart();
      }
      dispatch({
        type: types.ADD_CART_SUCCESS,
        payload: { data: { ...response.data, query } },
      });
    })
    .catch(error => {
      dispatch({ type: types.ADD_CART_FAIL, payload: error });
    });
};
export default addToCart;
