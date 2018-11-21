/* eslint camelcase: 0 */
import types from '../../../action_types';
import api from '../../../api';

export default (uid, args, params) => {
  const { dispatch } = params;

  const data = {
    memberlogin: params.self,
    firstname: args[0],
    phoneNo: args[1],
  };
  dispatch({ type: types.CONSULTANT_SUBMITTED_REQUEST, data });
  api
    .post('/serve/enquirynew', data)
    .then(response => {
      dispatch({ type: types.CONSULTANT_SUBMITTED_SUCCESS, response });
    })
    .catch(error => {
      dispatch({ type: types.CONSULTANT_SUBMITTED_FAIL, payload: {} });
    });
};
