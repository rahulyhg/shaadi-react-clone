import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (id, text, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.MODIFY_DRAFT_REQUEST, payload: { type, source } });

  api
    .put('/drafts', { id, text })
    .then(response => {
      dispatch({
        type: types.MODIFY_DRAFT_SUCCESS,
        payload: { source, type, draft: response.data.draft },
      });
      window.setTimeout(() => dispatch({ type: types.HIDE_DRAFT_FLASH, payload: { source, type } }), 1500);
    })
    .catch(error => {
      window.setTimeout(() => dispatch({ type: types.HIDE_DRAFT_FLASH, payload: { source, type } }), 5000);
      dispatch({ type: types.MODIFY_DRAFT_FAIL, payload: errors.clean(error) });
    });
};
