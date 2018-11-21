import types from '../action_types/index';
import api from '../api/index';

export default ({ dispatch, getState, type, source, self }, data = {}, onSuccess, onError) => {
  const metadata = {
    ...getState().metadata,
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
  };

  dispatch({ type: types.FACEBOOK_ALBUM_PHOTO_REQUEST, payload: { source, type, uid: self } });
  api
    .post('/facebook-photo-upload', { ...data, metadata })
    .then(response => {
      if (onSuccess) {
        onSuccess(response.data);
      }
    })
    .catch(error => {
      if (onError) {
        onError(error);
      }
    });
};
