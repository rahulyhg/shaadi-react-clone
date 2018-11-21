import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default ({ dispatch, getState, type, source, self }) => {
  dispatch({ type: types.FETCH_DRAFTS_REQUEST, payload: { type, source } });

  api
    .get('/drafts')
    .then(response => {
      dispatch({
        type: types.FETCH_DRAFTS_SUCCESS,
        payload: { source, type, drafts: response.data.drafts || [] },
      });
    })
    .catch(error => {
      window.setTimeout(() => dispatch({ type: types.HIDE_DRAFT_FLASH, payload: { source, type } }), 5000);
      dispatch({ type: types.FETCH_DRAFTS_FAIL, payload: { ...errors.clean(error), prefix: 'Error loading drafts: ' } });
    });
};
