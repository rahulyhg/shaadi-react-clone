/* global window */
import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';
import alerts from '../../lib/alerts';
import { search as t } from '../../lib/content';

export default (uid, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.SELECTED_SHORTLISTS_REQUEST, payload: { uid, type, source } });

  api
    .get('/shortlists/me/list_ids', { params: { profile_id: uid } })
    .then(response =>
      dispatch({
        type: types.SELECTED_SHORTLISTS_SUCCESS,
        payload: { uid, list_ids: response.data.map(i => `${i}`) },
      }),
    )
    .catch(error => {
      const message = errors.clean(error);
      dispatch({ type: types.SELECTED_SHORTLISTS_FAIL, payload: message });
      dispatch({ type: types.EOI_FAIL, payload: { uid, source, type, ...message } });
      alerts.show(dispatch, [source, 'eoi', { uid }], t.loudError(message), 8);
    });
};
