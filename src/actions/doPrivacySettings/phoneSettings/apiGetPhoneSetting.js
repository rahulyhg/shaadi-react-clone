import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

const apiGet = ({ source, self, type, args, memberShip, isNative }) => (dispatch, getState) => {
  dispatch({ type: types.PHONE_SETTING_DATA_REQUEST, payload: { memberShip, isNative } });
  api
    .get('/phoneSettings')
    .then(response => {
      dispatch({ type: types.PHONE_SETTING_DATA_SUCCESS, payload: { ...response.data.phoneSettings, memberShip, isNative } });
    })
    .catch(error => dispatch({ type: types.PHONE_SETTING_DATA_FAIL, payload: errors.clean(error) }));
};
export default apiGet;
