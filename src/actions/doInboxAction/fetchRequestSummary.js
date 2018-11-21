import withAuth from '../withAuth';
import types from '../../action_types';
import api from '../../api';

const fetchRequestSummary = (actionType, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      dispatch({ type: types.INBOX_REQUEST_SUMMARY_REQUEST, payload: {} });

      api.get('/inbox/requests').then(response => {
        dispatch({ type: types.INBOX_REQUEST_SUMMARY_SUCCESS, payload: response.data });
      });
    },
    { caller: 'doInboxAction', allowCache: true, delay: 1 },
  );
};

export default fetchRequestSummary;
