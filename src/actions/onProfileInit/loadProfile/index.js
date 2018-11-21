import apiGetProfile from './apiGetProfile';
import onSuccess from './onSuccess';
import onFail from './onFail';

export default (uid, dispatch, getState, location) => {
  const params = { dispatch, getState, location };
  getState().config.app.webp !== '0' && (params.file_extension = 'webp');
  apiGetProfile(uid, params, onSuccess, onFail);
};
