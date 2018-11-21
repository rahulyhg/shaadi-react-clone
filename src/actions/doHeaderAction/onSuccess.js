/* eslint camelcase: 0 */
import types from '../../action_types';
import apiFacebookPhotoUpload from '../apiFacebookPhotoUpload';
import { getFacebookAccessToken } from '../../helpers/firebaseAuth';
import {
  setFacebookAccessToken,
  getFacebookAlbums,
  getProfilePhotosAlbum,
  getAlbumImageURLs,
  getAlbums,
} from '../../helpers/facebookGraphAPI';
import onProfilePhotoUpload from './onProfilePhotoUpload';

export default (uid, args, params, history) => payload => {
  const { source, type, dispatch } = params;
  const profilePhotoUploadFn = onProfilePhotoUpload(uid, args, params, history);

  switch (type) {
    case 'fbPhotoUpload': {
      dispatch({
        type: types.MODAL_SHOW,
        payload: { ...params, modal: type, uid, source },
      });
      const accessToken = getFacebookAccessToken(payload);
      if (accessToken) {
        setFacebookAccessToken(accessToken);

        getFacebookAlbums(
          response => {
            const albums = getAlbums(response.data);
            dispatch({
              type: types.FACEBOOK_ALBUM_PHOTO_REQUEST,
              payload: { ...params, type, uid, source, albums },
            });
            getProfilePhotosAlbum(
              response.data,
              res => {
                const imageURLs = getAlbumImageURLs(res.data);
                dispatch({
                  type: types.FACEBOOK_ALBUM_PHOTO_SUCCESS,
                  payload: { ...params, type, uid, source, imageURLs },
                });
              },
              err => {
                dispatch({
                  type: types.FACEBOOK_ALBUM_PHOTO_FAIL,
                  payload: { ...params, type, uid, source, err },
                });
              },
            );
          },
          error => {
            dispatch({
              type: types.FACEBOOK_ALBUM_PHOTO_FAIL,
              payload: { ...params, type, uid, source, error },
            });
          },
        );
      }

      break;
    }
    case 'fbPhotoUploadAlbum': {
      const imageURLs = getAlbumImageURLs(payload.data);
      dispatch({
        type: types.FACEBOOK_ALBUM_PHOTO_SUCCESS,
        payload: { ...params, type, uid, source, imageURLs },
      });
      break;
    }
    case 'fbPhotoUploadSubmit': {
      const pageURL = window.location.href;
      // hard-coding tpe in meta after having discussion with Karan Author: shivamsupr
      const metadata = {
        tpe: {
          tpe_photo_track: 'Y',
          tpe_photo_bucket: '',
          tpe_photo_entry_point_referrer: '',
          tpe_photo_previous_page_url: '',
          tpe_photo_landing_page_url: pageURL,
          tpe_photo_landing_page_name: source,
          tpe_photo_platform: '0',
          memberlogin: uid,
          posted_url: '',
          photo_track: 'Y',
          bucket: 'B',
          entry_point_referrer: '',
          previous_page_url: '',
          landing_page_url: pageURL,
          landing_page_name: source,
          medium: 'facebook',
        },
      };
      const successData = { ...payload, metadata };
      const uploadSuccessFn = response => {
        const attachmentPaths = response.data.map(attachment => attachment.path);
        profilePhotoUploadFn({ photos: attachmentPaths });
      };
      apiFacebookPhotoUpload(params, successData, uploadSuccessFn);
      break;
    }
    case 'profilePhotoUpload': {
      profilePhotoUploadFn({ photos: [payload.attachmentPath] });
      break;
    }
    default:
      console.log('%c TO DO onSuccess in doHeaderAction', 'font-size: 18px', type, source);
  }
  return null;
};
