import withAuth from './withAuth';
import types from '../action_types';
import api from '../api';

export default () => dispatch => {
  dispatch({ type: types.TRUST_BADGE_REQUEST, payload: {} });

  withAuth(() => {
    api.get('/profile_badges/me').then(response => {
      dispatch({ type: types.TRUST_BADGE_SUCCESS, payload: response });
    });
  }, 'getTrustBadge');
};
