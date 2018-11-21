import api from '../../api';
import errors from '../lib/errors';

export default (uid, type, source, dispatch, getState, data = {}) => {
  const profile = getState().profiles.self || { uid };
  const metadata = {
    ...getState().metadata,
    se: profile.se,
    action_source: 'profile',
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
  };

  return api.post('/profile-actions/layerShown', { uid, type, source, ...data, metadata }).catch(error => {
    const message = errors.clean(error);
    console.log(`%c Execution of Layer Show API error.`, 'color: orange; font-weight: bold;', message, error.response);
  });
};
