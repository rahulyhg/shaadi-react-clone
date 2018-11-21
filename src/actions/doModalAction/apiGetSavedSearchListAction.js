import api from '../../api';
import types from '../../action_types';
import errors from '../lib/errors';

export default (uid, args, dispatch, getState) => {
  dispatch({ type: types.SAVED_SEARCH_REQUEST, payload: {} });

  api
    .get('/save-search', { params: { uid } })
    .then(response => {
      dispatch({
        type: types.SAVED_SEARCH_SUCCESS,
        payload: {
          data: response.data,
        },
      });
      dispatch({ type: types.MODAL_SHOW, payload: { modal: 'saveSearchBox' } });
    })
    .catch(error => {
      const payload = errors.clean(error);
      dispatch({ type: types.SAVED_SEARCH_FAIL, payload });
    });
};
