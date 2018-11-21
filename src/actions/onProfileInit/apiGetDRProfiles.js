import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, dispatch, onLoad) => {
  dispatch({ type: types.DR_PROFILES_REQUEST, payload: {} });
  api
    .get('/drProfiles', { params: { uid } })
    .then(response => {
      const { defaultProfileId } = (response && response.data) || {};
      const t = response.data.timeLeftToConnect || 0;
      dispatch({ type: types.DR_PROFILES_SUCCESS, payload: { ...response.data, target_time: Math.round(new Date() / 1000) + t } });
      onLoad(uid || defaultProfileId);
    })
    .catch(error => dispatch({ type: types.DR_PROFILES_FAIL, payload: errors.clean(error) }));
};
