/* eslint camelcase: 0 */
import apiAction from '../apiAction';
import apiProfilePhotos from './apiProfilePhotos';

import onSuccess from './onSuccess';
import onFail from './onFail';

export default (uid, args, givenParams) => {
  const params = { ...givenParams, typePrefix: 'PHOTO_', status: 'albumStatus' };
  const { source, self, type, getState, dispatch } = params;
  const settings = getState().session.settings;
  const successFn = onSuccess(uid, args, params);
  const failFn = onFail(uid, args, params);

  switch (type) {
    case 'requestPhoto': {
      return apiAction(uid, 'photo', 'photoRequestSent', params, {}, successFn, failFn);
    }
    case 'requestPassword': {
      return apiAction(uid, 'photoaccess', 'passwordRequested', params, {}, successFn, failFn);
    }
    case 'viewAlbum': {
      const fileExtension = getState().config.app.webp !== '0' ? 'webp' : '';

      const sourceInfo = {
        modal: type,
        source,
      };
      apiProfilePhotos(uid, sourceInfo, fileExtension, dispatch, getState);
      return null;
    }
    default:
      console.log('TO DO eoiConnect', type, { source, uid, args, self }, settings);
      return null;
  }
};
