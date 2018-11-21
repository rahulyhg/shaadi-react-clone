import api from '../../api';
import errors from '../lib/errors';

export default (uid, params, onRequest, onSuccess, onFail, foreground = true) => {
  const { getState, file_extension } = params;

  if (!uid || uid.length === 0 || uid === 'default') {
    const message = 'Sorry, this Member is not a Shaadi.com member. Please try again.';
    onFail({ uid, error: { message } }, params, foreground);
    return;
  }

  const metadata = {
    ...getState().metadata,
    markViewed: foreground,
  };

  onRequest({ uid }, params, uid, foreground);

  api
    .get(
      '/profiles/:id',
      { params: { id: uid, viewedData: metadata, file_extension } },
      { loggedInUserGender: getState().profiles.self.gender },
    )
    .then(response => onSuccess({ ...response.data, uid }, params, foreground))
    .catch(error => onFail({ uid, ...errors.clean(error) }, params, foreground));
};
