import types from '../../action_types';

const initialState = {
  img: {
    src: '',
    alt: '',
    title: '',
  },
  url: '',
  isExternal: true,
  isVisible: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS:
      if (action.payload.layerId !== 'headerBadge') {
        return state;
      }
      return {
        ...state,
        img: {
          src: action.payload.badge.image,
          alt: action.payload.badge.alt_text,
        },
        url: action.payload.badge.link,
        isVisible: true,
        isExternal: true,
      };
    case types.UPDATE_DIMENSIONS_SCROLL: {
      if (state.scroll === action.payload.scroll) {
        return state;
      }
      const newState = {
        ...state,
        isVisible:
          state.img.src !== '' && action.payload.isSearchPage && action.payload.scroll < 62 && action.payload.scroll !== state.scroll,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
