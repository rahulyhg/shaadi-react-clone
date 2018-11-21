import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (action, id, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.FETCH_VIP_CONSULTANT_REQUEST, payload: { type, source } });
  api
    .get('/serve/get-vip-consulant-detail', { params: { action, id } })
    .then(response => {
      dispatch({
        type: types.FETCH_VIP_CONSULTANT_SUCCESS,
        payload: { source, type, data: response.data },
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_VIP_CONSULTANT_FAIL, payload: { ...errors.clean(error), prefix: 'Error fetching message: ' } });
    });
};
