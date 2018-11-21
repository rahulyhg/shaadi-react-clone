import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';

export default (uid, params, onSuccess, onFail) => {
  const { dispatch, getState, file_extension, location } = params;

  if (!uid || uid.length === 0 || uid === 'default') {
    const message = 'Sorry, this Member is not a Shaadi.com member. Please try again.';
    onFail({ type: types.PROFILE_FAIL, payload: { error: { message } } }, params, uid);
    return;
  }

  const metadata = {
    ...getState().metadata,
    markViewed: true,
  };
  const isDr = location.pathname.indexOf('daily-recommendations') > 1;
  !isDr && dispatch({ type: types.PROFILE_REQUEST, payload: { uid } });
  api
    .get(
      '/profiles/:id',
      { params: { id: uid, viewedData: metadata, file_extension } },
      { loggedInUserGender: getState().profiles.self.gender },
    )
    .then(response => onSuccess({ type: types.PROFILE_SUCCESS, payload: response.data }, params, uid))
    .catch(error => onFail({ type: types.PROFILE_FAIL, payload: { uid, ...errors.clean(error) } }, params, uid));
};
