import withAuth from '../withAuth';
import loadCart from './loadCart';

export default query => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      loadCart(auth.uid, dispatch, getState, query);
    },
    { caller: 'doCartAction', allowCache: false, delay: 1 },
  );
};
