/* eslint camelcase: 0 */
import withAuth from '../withAuth';
import apiAttachmentsUpload from '../apiAttachmentsUpload';
import types from '../../action_types';
import doLayerAction from '../doLayerAction';
import closeFourHour from './closeFourHour';
import fetchFourHourTicker from './fetchFourHourTicker';
import onSuccess from './onSuccess';
import onFail from './onFail';
import { handleFacebookSignIn } from '../../helpers/firebaseAuth';
import { getPhotosByAlbum } from '../../helpers/facebookGraphAPI';
import getPhotos from '../doProfileAction/photoAction/getPhotos';
import doModalAction from '../doModalAction';
import constants from '../../constants/constants';
import apiGetBanners from '../apiGetBanners';

export default (source, action, uid, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const params = { source, self: auth.uid, type: action, dispatch, getState, history };
      const successFn = onSuccess(auth.uid, args, params, history);
      const failFn = onFail(auth.uid, args, params, history);

      switch (action) {
        case 'fetchFourHourTicker':
          return fetchFourHourTicker(auth, dispatch);
        case 'fetchHeaderBadge':
          return doLayerAction(source, uid, action, ...args)(dispatch, getState);
        case 'exitEvent':
          return doLayerAction(source, uid, action, ...args)(dispatch, getState);
        case 'dropdownClick': {
          const activeDropdown = args[0];
          const wasDropdownOpen = args[1];
          if (wasDropdownOpen) {
            dispatch({ type: types.HIDE_ALL_DROPDOWNS });
            return null;
          }
          dispatch({
            type: types.UPDATE_ACTIVE_DROPDOWN,
            payload: {
              activeDropdown,
            },
          });
          return null;
        }
        case 'closeFourHour':
          return closeFourHour(source, auth.uid, action, ...args)(dispatch, getState);
        case 'fbPhotoUpload': {
          return handleFacebookSignIn(successFn, failFn);
        }
        case 'fbPhotoUploadAlbum': {
          const [albumID] = args;
          dispatch({
            type: types.FACEBOOK_ALBUM_PHOTO_REQUEST,
            payload: { ...params, type: action, uid, source },
          });
          getPhotosByAlbum(albumID, 100, successFn, failFn);
          return null;
        }
        case 'fbPhotoUploadSubmit': {
          const [imageURLs] = args;
          const data = { type: 'photo', urls: imageURLs };
          successFn(data);
          return null;
        }
        case 'fbPhotoUploaded': {
          doModalAction('modal/fbPhotoUpload', uid || auth.uid, 'close', args)(dispatch, getState);
          const redirectTo = '/my-shaadi/photo';
          if (history.location.pathname === redirectTo) {
            return getPhotos(uid || auth.uid, args, params);
          }
          history.push(redirectTo);
          return null;
        }
        case 'profilePhotoUpload': {
          const [files] = args;
          const uploadingPhotoCount = files.length;
          const existingPhotoCount = getState().profiles.self.photos.count;
          const canUploadPhotosCount = constants.MAX_PHOTO_COUNTS - existingPhotoCount;
          const hasMoreThanMaxPhotoForUpload = uploadingPhotoCount + existingPhotoCount > constants.MAX_PHOTO_COUNTS;

          if (hasMoreThanMaxPhotoForUpload) {
            alert(`Only ${canUploadPhotosCount} photos will be attempted to upload as you have reached the maximum limit of 20!`); // eslint-disable-line no-alert
          }

          dispatch({
            type: types.MODAL_SHOW,
            payload: { ...params, modal: 'profilePhotoUpload', uid: auth.uid, source, uploadingPhotoCount },
          });

          [...files].map((file, index) => {
            if (index < canUploadPhotosCount) {
              const data = { files: file, type: 'photo', attachmentName: file.name };
              const attachmentSuccessFn = (payload, uploadResponse) => {
                successFn(payload, uploadResponse);
              };
              apiAttachmentsUpload(auth.uid, { dispatch, type: action, source }, data, attachmentSuccessFn);
            }
            return true;
          });

          return null;
        }
        case 'documentUpload': {
          const [files] = args;

          [...files].map((file, index) => {
            const data = { files: file, type: 'id_proof', attachmentName: file.name };
            apiAttachmentsUpload(auth.uid, { dispatch, type: action, source }, data);
            return true;
          });

          return null;
        }
        case 'profilePhotoUploaded': {
          const redirectTo = '/my-shaadi/photo';
          if (history.location.pathname === redirectTo) {
            return getPhotos(uid || auth.uid, args, params);
          }
          history.push(redirectTo);
          return null;
        }
        case 'acceptBanner': {
          apiGetBanners(dispatch, getState);
          return null;
        }
        default:
          console.log('TO DO action', source, action, uid, args);
          return null;
      }
    },
    { caller: 'doHeaderAction', allowCache: true, delay: 1 },
  );
};
