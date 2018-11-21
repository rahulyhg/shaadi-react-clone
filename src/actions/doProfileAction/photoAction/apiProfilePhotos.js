import types from '../../../action_types';
import api from '../../../api';
import { shouldShowAlbum } from '../../../utils';

export default (pid, sourceinfo, fileExtension, dispatch, getState) => {
  const { source } = sourceinfo;
  let { modal } = sourceinfo;
  const { metadata } = getState();
  api
    .get('/profiles/photos:id', {
      params: { pid, fileExtension, metadata },
    })
    .then(response => {
      const settings = getState().session.settings;
      if (!shouldShowAlbum(settings, response.data.profileData.flags.connectionStatus)) {
        modal = 'uploadPhoto';
        dispatch({ type: types.MODAL_SHOW, payload: { modal } });
      } else {
        const payload = {
          modal,
          meta: {
            modal,
            source,
          },
          data: response.data.photosData,
          profileInfo: {
            pid,
            fullName: modal === 'viewAlbum' ? response.data.profileData.name : response.data.profileData.fullName,
            settings: { isPaidUser: settings.isPaidUser, hasUploadedPhoto: settings.hasUploadedPhoto },
          },
        };
        dispatch({ type: types.MODAL_SHOW, payload });
      }
    })
    .catch(error => {});
};
