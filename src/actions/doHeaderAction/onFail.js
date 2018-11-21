/* eslint camelcase: 0 */
import types from '../../action_types';

export default (uid, args, params, history) => payload => {
  const { source, type, dispatch } = params;

  switch (type) {
    case 'fbPhotoUpload': {
      dispatch({ type: types.FACEBOOK_ALBUM_PHOTO_FAIL, payload });
      console.log('DEBUG: FB sign-in', 'error', payload);
      break;
    }
    default:
      console.log('%c TO DO onFail in doHeaderAction', 'font-size: 18px', type, source);
  }
  return null;
};
