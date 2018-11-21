import types from '../../action_types';

const initialState = {
  uid: null,
  source: 'PhotoDocking',
  imageURLs: [],
  albums: [],
  showLoader: true,
  redirectToAlbums: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, source, modal } = action.payload;
      if (modal !== 'fbPhotoUpload') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
      };
    }

    case types.FACEBOOK_ALBUM_PHOTO_REQUEST: {
      const { uid, source, type, albums } = action.payload;
      if (type === 'fbPhotoUpload') {
        return {
          ...state,
          uid,
          source,
          albums,
          showLoader: true,
        };
      }

      if (type === 'fbPhotoUploadAlbum' || type === 'fbPhotoUploadSubmit') {
        return {
          ...state,
          uid,
          source,
          showLoader: true,
        };
      }

      return state;
    }

    case types.FACEBOOK_ALBUM_PHOTO_SUCCESS: {
      const { uid, source, type, imageURLs } = action.payload;
      if (type !== 'fbPhotoUpload' && type !== 'fbPhotoUploadAlbum') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
        imageURLs,
        showLoader: false,
      };
    }

    case types.PROFILE_PHOTO_UPLOAD_SUCCESS: {
      const { source, type } = action.payload;
      if (type !== 'fbPhotoUploadSubmit') {
        return state;
      }
      return {
        ...state,
        source,
        redirectToAlbums: true,
      };
    }

    case types.MODAL_HIDE: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
