import types from '../action_types/index';
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
      dispatch({ type: types.PROFILE_PHOTO_UPLOAD_SUCCESS, payload: { source, type, attachments: response.data } });
    })
    .catch(error => {});
};
