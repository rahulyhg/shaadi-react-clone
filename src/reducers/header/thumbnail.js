import types from '../../action_types';

const initialState = {
  img: {
    src: '/assets/default-thumbnail.png',
    alt: 'User menu',
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS: {
      return {
        ...state,
        img: {
          src: action.payload.self.thumbnailBlur || action.payload.self.thumbnail || state.img.src,
          alt: state.img.alt,
        },
      };
    }
    case types.GET_PROFILE_PHOTOS_SUCCESS: {
      const photo =
        action.payload && action.payload.data && action.payload.data.photos && action.payload.data.photos[0]
          ? action.payload.data.photos[0]
          : null;
      if (!photo) {
        return state;
      }
      return {
        ...state,
        img: {
          ...state.img,
          ...{
            src: photo.domain_name + photo.small,
          },
        },
      };
    }
    default:
      return state;
  }
}
