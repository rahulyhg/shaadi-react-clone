import requestService from '../services/requestService';
import batchRequestService from '../services/batchRequestService';
import photosRejectedRequest from '../ww4/photosRejected';
import getProfilePhotoRequest from '../ww4/getProfilePhoto';
import getOtherProfilePhotosRequest from '../ww4/getOtherProfilePhotos';
import getProfileAndAlbumPhotosRequest from '../ww4/getProfileAndAlbumPhotos';
import albumPhotosWithRejectedPhotosDecorator from '../decorators/albumPhotosWithRejectedPhotos';
import rejectedAlbumPhotosDecorator from '../decorators/rejectedAlbumPhotos';
import albumPhotosDecorator from '../decorators/albumPhotos';

const uploadFiles = (logger, data, query, auth, config) => {
  const request = {
    method: 'post',
    url: `/files/${auth.uid}/uploads?_debug=profileFileUpload`,
    data,
  };
  return requestService(logger, query, auth, request, d => d, undefined, {
    onUploadProgress: config.onUploadProgress,
  });
};

const savePhotos = (logger, data, query, auth, config) => {
  const request = {
    method: 'post',
    url: `/photo/${auth.uid}?_debug=profilePhotoUpload`,
    data,
  };
  return requestService(logger, query, auth, request, d => d, undefined, {
    onUploadProgress: config.onUploadProgress,
  });
};

// @author: Shivam Rustog
const update = (logger, data, query, auth, config) => {
  const request = {
    method: 'post',
    url: `/photo/${auth.uid}?_debug=profilePhotoUpload`,
    data,
  };
  return requestService(logger, query, auth, request, d => d, undefined, {
    onUploadProgress: config.onUploadProgress,
  });
};

// @author: Shivam Rustogi
const facebookUpdate = (logger, data, query, auth, config) => {
  const request = {
    method: 'post',
    url: `/files/${auth.uid}/import?_debug=fbPhotoUpload`,
    data,
  };
  return requestService(logger, query, auth, request, d => d, undefined, {
    onUploadProgress: config.onUploadProgress,
  });
};

// @author: Anush Shukla
const getProfilePhoto = (logger, query, auth = {}, extras = {}) =>
  requestService(logger, query, auth, getProfilePhotoRequest(auth.uid, query, extras), albumPhotosDecorator);

// @author: Anush Shukla
const getProfileAndAlbumPhotos = (logger, query, auth = {}, extras = {}) =>
  requestService(logger, query, auth, getProfileAndAlbumPhotosRequest(auth.uid, query, extras));

const getOtherProfilePhotos = (logger, query, auth = {}, extras = {}) =>
  requestService(logger, query, auth, getOtherProfilePhotosRequest(auth.uid, query, extras));

// @author: Anush Shukla
const getAllAlbumPhotos = (logger, query, auth = {}, extras = {}) => {
  const requests = {};
  requests.photosRequest = getProfileAndAlbumPhotosRequest(auth.uid, query, extras);
  requests.photosRejectedRequest = photosRejectedRequest(auth.uid);
  return batchRequestService(logger, query, auth, requests, albumPhotosWithRejectedPhotosDecorator, undefined, {
    allowPartialSuccess: true,
  });
};

// @author: Anush Shukla
const getRejectedPhotos = (logger, query, auth = {}, extras = {}) => {
  const { uid } = auth;
  return requestService(logger, query, auth, photosRejectedRequest(uid), responseData => {
    const rejectedAlbumPhotosMutated = rejectedAlbumPhotosDecorator(responseData.data);
    const albumPhotos = {
      data: {
        [uid]: {
          photos: [],
        },
      },
    };
    albumPhotos.data[uid].photos = (rejectedAlbumPhotosMutated.data && rejectedAlbumPhotosMutated.data.mutatedRejectedAlbumPhotos) || [];
    const response = albumPhotosDecorator(albumPhotos);
    return response && response.data && response.data[uid] && { data: response.data[uid].photos };
  });
};

// @author: Anush Shukla
const updatePhoto = (logger, data, params, auth) => {
  const request = {
    method: 'put',
    url: `/photo/${auth.uid}?_debug=updatePhoto`,
    data,
    params,
  };
  return requestService(logger, params, auth, request, d => d);
};

// @author: Anush Shukla
const deletePhoto = (logger, data, query, auth) => {
  const request = {
    method: 'delete',
    url: `/photo/${auth.uid}?_debug=deletePhoto`,
    data,
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  getProfilePhoto,
  getProfileAndAlbumPhotos,
  getAllAlbumPhotos,
  getRejectedPhotos,
  getOtherProfilePhotos,
  updatePhoto,
  deletePhoto,
  update,
  uploadFiles,
  savePhotos,
  facebookUpdate,
};
