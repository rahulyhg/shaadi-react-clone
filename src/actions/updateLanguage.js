import api from '../api/index';

export default ({ dispatch, getState, type, source, self }, data = {}) => {
  const metadata = {
    ...getState().metadata,
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
  };

  api
    .post('/profile-photo-upload', { ...data, metadata })
    .then(response => {
      // Will handle this once animation is cracked
    })
    .catch(error => {});
};
