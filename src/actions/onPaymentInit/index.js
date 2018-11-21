import withAuth from '../withAuth';
import loadPayment from './loadPayment';

export default query => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      loadPayment(auth.uid, dispatch, getState, query);
    },
    { caller: 'onPaymentInit', allowCache: false, delay: 1 },
  );
};
