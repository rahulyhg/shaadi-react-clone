import types from '../../../action_types';

const initialState = {
  img: {
    src: '',
    alt: '',
    height: 0,
    width: 0,
  },
  url: '',
  target: '',
  isExternal: true,
  isVisible: false,
  layerId: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS: {
      if (action.payload.layerId !== 'profilePageOverlayBanner') {
        return state;
      }
      const { image: src, alt_text: alt, height, width, link: url, target } = action.payload.badge;
      return {
        ...state,
        img: {
          src,
          alt,
          height,
          width,
        },
        url,
        target,
        isVisible: true,
        isExternal: true,
        layerId: action.payload.layerId,
      };
    }
    default:
      return state;
  }
}
