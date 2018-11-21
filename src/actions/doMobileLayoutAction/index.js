/* eslint camelcase: 0 */

import withAuth from '../withAuth';
import types from '../../action_types';

export default (source, action, uid, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const params = { source, self: auth.uid, type: action, dispatch, getState, history };
      switch (action) {
        case 'openDrawer': {
          return dispatch({ type: types.M_DRAWER_ACTION, payload: 'open' });
        }
        case 'closeDrawer': {
          return dispatch({ type: types.M_DRAWER_ACTION, payload: 'close' });
        }
        case 'toggleDrawer': {
          return dispatch({ type: types.M_DRAWER_ACTION, payload: 'toggle' });
        }
        default:
          console.log('TO DO  mobileLayoutAction', source, action, uid, args, params);
          return null;
      }
    },
    { caller: 'doMobileLayoutAction', allowCache: true, delay: 1 },
  );
};
