import types from '../action_types';
import api from '../api';
import withAuth from './withAuth';

export default () => dispatch => {
  withAuth(() => {
    dispatch({ type: types.FETCH_DRAFT_REQUEST, payload: {} });

    api.get('/messages/drafts/me').then(response => {
      const payload = {
        drafts: [response.data.data.default],
      };
      dispatch({ type: types.FETCH_DRAFT_SUCCESS, payload });
    });
  });
};
