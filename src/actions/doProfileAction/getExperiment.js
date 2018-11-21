import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, args, { dispatch, getState, type, source, data, history }) => {
  dispatch({ type: types.GET_EXPERIEMENT_ACTION_REQUEST, payload: { uid, source, data } });
  api
    .get('/config/user/:id', data)
    .then(response => {
      dispatch({ type: types.GET_EXPERIEMENT_ACTION_SUCCESS, payload: { response, source, type } });
    })
    .catch(error => {
      const errorCleaned = errors.clean(error);
      dispatch({ type: types.GET_EXPERIEMENT_ACTION_FAIL, payload: { source, type, errorCleaned, error } });
    });
};
