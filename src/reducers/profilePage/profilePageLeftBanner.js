import types from '../../action_types';

const initialState = {
  img: {
    src: '',
    alt: '',
    title: '',
    height: 0,
    width: 0,
  },
  url: '',
  isExternal: true,
  isVisible: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS:
      if (action.payload.layerId !== 'profilePageLeftBanner') {
        return state;
      }
      return {
        ...state,
        img: {
          src: action.payload.badge.image,
          alt: action.payload.badge.alt_text,
          height: action.payload.badge.height,
          width: action.payload.badge.width,
        },
        url: action.payload.badge.link,
        target: action.payload.badge.target,
        isVisible: true,
        isExternal: true,
      };

    default:
      return state;
  }
}
