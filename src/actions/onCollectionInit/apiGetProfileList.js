import api from '../../api';
import errors from '../lib/errors';

export default ({ uids: profileids, q }, params, onRequest, onSuccess, onFail, foreground = true) => {
  const { getState, file_extension } = params;

  if (!profileids || profileids.length === 0) {
    const message = 'Sorry, no more profiles to fetch';
    onFail({ profileids, error: { message } }, params, foreground);
    return;
  }

  const metadata = {
    ...getState().metadata,
    markViewed: foreground,
  };

  onRequest({ profileids }, params, foreground);

  api
    .get(
      '/profiles/list',
      { params: { profileids, q, viewedData: metadata, file_extension } },
      { loggedInUserGender: getState().profiles.self.gender },
    )
    .then(response => onSuccess({ ...response.data, profileids }, params, foreground))
    .catch(error => onFail({ profileids, ...errors.clean(error) }, params, foreground));
};
