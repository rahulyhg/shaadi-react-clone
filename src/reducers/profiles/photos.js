import types from '../../action_types';

const initialState = {
  count: 0,
  items: [],
  status: '',
  hasPhotos: false,
  canAddPhotos: false,
  isDefault: true,
  isRejectedPhotosFetched: false,
};

export default (state = initialState, { payload = {}, type } = {}) => {
  switch (type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS:
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
    case types.GET_PROFILE_PHOTOS_SUCCESS: {
      if (type === types.SESSION_SUCCESS && !state.isDefault) {
        return state;
      }

      const data = payload.data || payload.photos || payload.photo_details;

      if (!data) {
        return state;
      }

      const { photos, count, nonRejectedPhotosCnt } = data;
      const status = data.status && data.status.toLowerCase();
      const hasPhotos = status !== 'add_photo';
      const canAddPhotos = count < 20;
      const items = photos instanceof Array ? photos : [];
      if (items.length && !hasPhotos) {
        items.shift();
      }
      const isRejectedPhotosFetched = type === types.GET_PROFILE_PHOTOS_SUCCESS;
      const isAlbumPhotosFetched = !hasPhotos || count === nonRejectedPhotosCnt;
      const newState = {
        ...state,
        count,
        items,
        hasPhotos,
        canAddPhotos,
        isDefault: !isAlbumPhotosFetched,
        isRejectedPhotosFetched,
        status,
      };

      return newState;
    }
    /* case types.DELETE_PHOTO_SUCCESS: {
      const count = state.count - 1;
      const hasPhotos = state.count > 0 && state.status.toLowerCase() !== "add_photo";
      const items = newState.items;
      const photo_order = payload.photo_order;
      items.splice(photo_order, 1);
      items.map((value, key) => {
        if(photo_order > key) {
          items[key].photo_order = value.photo_order - 1;
        }
      });
      newState = {
        ...state,
        count,
        items,
        hasPhotos
      };
    }
    break; */
    case types.GET_REJECTED_ALBUM_PHOTOS_SUCCESS: {
      const hasRejectedPhotos = payload.data instanceof Array;
      const isRejectedPhotosFetched = true;
      if (!hasRejectedPhotos) {
        return {
          ...state,
          isRejectedPhotosFetched,
        };
      }
      const items = [...state.items, ...payload.data];
      const newState = {
        ...state,
        items,
        isRejectedPhotosFetched,
      };
      return newState;
    }
    case types.GET_REJECTED_ALBUM_PHOTOS_FAIL: {
      const newState = {
        ...state,
        isRejectedPhotosFetched: true,
      };
      return newState;
    }
    case types.DELETE_PHOTO_SUCCESS:
    case types.UPDATE_PHOTO_SUCCESS:
    case types.GET_REJECTED_ALBUM_PHOTOS_REQUEST:
    case types.GET_PROFILE_PHOTOS_REQUEST:
    case types.DELETE_PHOTO_REQUEST:
    case types.UPDATE_PHOTO_REQUEST:
    case types.GET_PROFILE_PHOTOS_FAIL:
    case types.DELETE_PHOTO_FAIL:
    case types.UPDATE_PHOTO_FAIL: {
      const isDefault = false;
      return {
        ...state,
        ...{
          isDefault,
        },
      };
    }
    default:
      return state;
  }
};
