/* eslint camelcase: 0 */
import withAuth from '../withAuth';
import updateUi from './updateUi';
import loadMatches from './loadMatches';

export default (path, query, isMostPreferred, changes = {}) => (dispatch, getState) => {
  const target = { path, query, changes, isMostPreferred };
  updateUi(target, dispatch);

  withAuth(
    ({ auth }, history) => {
      console.log('%c Search', 'color: blue; font-size: 20px', JSON.stringify(target));
      loadMatches(auth.uid, target, dispatch, getState, history);
    },
    { caller: 'doPreferredSearch', allowCache: true, delay: 1 },
  );
};
