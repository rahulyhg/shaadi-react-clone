import withAuth from '../withAuth';
import addToCart from './addToCart';

export default query => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      addToCart(auth, dispatch, getState, { ...query, history });
    },
    { caller: 'doPaymentAction', allowCache: false, delay: 1 },
  );
};
