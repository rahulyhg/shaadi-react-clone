import types from '../../action_types';

const initialState = {
  infoMap: [],
  infoMapNonIndian: [],
  infoMapIndian: [],
  infoMapNri: [],
  infoMapPremiumCarousel: [],
  listAlbum: [],
  gridAlbum: [],
  photoAlbum: [],
  smallPhoto: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EOI_SUCCESS: {
      if (action.payload.connectionStatus === 'shortlisted') {
        return {
          ...state,
          shortlistCount: action.payload.list_ids.length,
        };
      }
      return state;
    }
    case types.PREFERRED_PHOTOS_CACHE:
    case types.PREFERRED_PHOTOS_SUCCESS:
    case types.OTHERSEARCH_PHOTOS_CACHE:
    case types.OTHERSEARCH_PHOTOS_SUCCESS: {
      const { photos } = action.payload;
      return {
        ...state,
        listAlbum: photos.map(ph => ph.photoBlur),
        gridAlbum: photos.map(ph => ph.fullPhotoBlur),
        photoAlbum: [state.photoAlbum[0]].concat(photos.map(ph => ph.largePhoto)),
        smallPhoto: [state.smallPhoto[0]].concat(photos.map(ph => ph.smallPhoto)),
      };
    }

    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
    case types.PROFILE_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.MATCHES_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload.summary,
        listAlbum: [action.payload.photoBlur].concat(state.listAlbum.slice(1)),
        gridAlbum: [action.payload.fullPhotoBlur].concat(state.listAlbum.slice(1)),
        photoAlbum: [action.payload.largePhoto].concat(state.photoAlbum.slice(1)),
        smallPhoto: [action.payload.thumbnail].concat(state.smallPhoto.slice(1)),
      };

    default: {
      const { summary } = action.payload || {};
      if (!summary) {
        return state;
      }
      const newState = {
        ...state,
        ...summary,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
  }
};
