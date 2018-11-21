import axios from 'axios';
import types from '../../action_types';
import api from '../../api';
import withAuth from '../withAuth';
import errors from '../lib/errors';
import { setCancel, resetCancel } from '../lib/utils';
import { encode64 } from '../doPreferredSearch/utils';

export default (results_id, page, pages, total) => (dispatch, getState) => {
  withAuth(({ auth }, history) => {
    resetCancel(dispatch, getState().cancelApi, ['inbox', 'contactSummary']);

    const q = {};
    q.t = new Date() / 1;
    q.request_id = encode64(q);
    q.page = page || 1;
    q.pages = (getState().contactSummary.meta && getState().contactSummary.meta.pages) || 0;
    q.total = (getState().contactSummary.meta && getState().contactSummary.meta.total) || 0;
    q.results_id = results_id || '';
    q.file_extension = `${getState().config.app.webp !== '0' ? 'webp' : ''}`;

    const CancelToken = setCancel(axios, dispatch, 'contactSummary');
    dispatch({ type: types.CONTACT_SUMMARY_DATA_REQUEST, payload: q });

    api
      .get('/contactSummary', { params: q }, { CancelToken })
      .then(response => {
        const { meta } = response.data;
        dispatch({ type: types.CONTACT_SUMMARY_DATA_SUCCESS, payload: response.data, getState });
        history.push(meta.permaLink);
      })
      .catch(error => dispatch({ type: types.CONTACT_SUMMARY_DATA_FAIL, payload: errors.clean(error) }));
  });
};
