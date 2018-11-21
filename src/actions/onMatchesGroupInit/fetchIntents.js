import axios from 'axios';
import types from '../../action_types';
import api from '../../api';
import { setCancel, resetCancel } from '../lib/utils';

export default (dispatch, state, params) => {
  resetCancel(dispatch, state.cancelApi, ['inbox', 'contactSummary', 'matches']);
  const CancelToken = setCancel(axios, dispatch, 'inbox');

  dispatch({ type: types.MATCHES_GROUP_REQUEST, payload: {} });

  api
    .get('/intentsGroup', { params }, { CancelToken })
    .then(response => {
      dispatch({ type: types.MATCHES_GROUP_SUCCESS, payload: response.data });
    })
    .catch(error => {});
};
