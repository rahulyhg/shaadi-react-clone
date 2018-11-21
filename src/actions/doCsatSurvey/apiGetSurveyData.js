import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default ({ source, self, type, args }) => (dispatch, getState) => {
  dispatch({ type: types.CSAT_DATA_REQUEST, payload: {} });
  api
    .get('/csatSurvey')
    .then(response => {
      dispatch({ type: types.CSAT_DATA_SUCCESS, payload: response.data });
    })
    .catch(error => dispatch({ type: types.CSAT_DATA_FAIL, payload: errors.clean(error) }));
};
