/* global window */
import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';
import alerts from '../../lib/alerts';
import { search as t } from '../../lib/content';

export default (uid, name, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.SHORTLIST_CREATE_REQUEST, payload: { uid, type, source, name } });

  api
    .post('/shortlists', { name })
    .then(response =>
      dispatch({
        type: types.SHORTLIST_CREATE_SUCCESS,
        payload: { uid, name, id: response.data.id },
      }),
    )
    .catch(error => {
      const message = errors.clean(error);
      if (!['List with this name exists, please specify a different name.'].includes(message.error.message || '')) {
        dispatch({ type: types.SHORTLIST_CREATE_FAIL, payload: message });
        dispatch({ type: types.EOI_FAIL, payload: { uid, source, type, ...message } });
        alerts.show(dispatch, [source, 'eoi', { uid }], t.error(message), 8);
      }
    });
};
