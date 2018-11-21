import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, args, { dispatch, getState, type, source, self, key }) => {
  const params = args[0] || {};
  const data = {
    key,
    searchname: params.searchname,
    email_frequency: params.email_frequency,
  };
  api
    .post('/save-search', data)
    .then(response => {
      dispatch({
        type: types.SUBMIT_SAVED_SEARCH_SUCCESS,
        payload: { source, type, data: response.data },
      });
    })
    .catch(error => {
      const payload = errors.clean(error);
      dispatch({ type: types.SAVED_SEARCH_FAIL, payload });
    });
};
