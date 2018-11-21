import types from '../action_types';
import api from '../api';
import withAuth from './withAuth';
import errors from './lib/errors';

const encode64 = obj => window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))));

export default ({ results_id, page }) => dispatch => {
  withAuth(({ auth }) => {
    const q = { results_id, page };
    q.t = new Date() / 1;
    q.request_id = encode64(q);
    dispatch({ type: types.PREMIUM_BANNNER_REQUEST, payload: q });

    api
      .get('/search/banner', { params: q })
      .then(response => {
        const data = response.data;
        dispatch({ type: types.PREMIUM_BANNNER_SUCCESS, payload: data });
      })
      .catch(error => dispatch({ type: types.PREMIUM_BANNNER_FAIL, payload: errors.clean(error) }));
  });
};
