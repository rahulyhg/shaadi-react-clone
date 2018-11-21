/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

const initialState = {
  prevScroll: 0,
  scroll: 0,
  prevHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  prevWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  layout: null,
  detection: {},
  topSpace: 0,
  isHeaderBarVisible: true,
  isFacetTitleFixed: false,
  isFacetOffScreen: false,
  chatScrollHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_LAYOUT: {
      return { ...state, layout: action.payload.layout, detection: action.payload };
    }
    case types.FOUR_HOUR_SUCCESS: {
      const topSpace = action.payload.ticker.isVisible ? 75 : 0;
      if (state.topSpace === topSpace) return state;
      return { ...state, topSpace };
    }
    case types.FOUR_HOUR_CLOSE: {
      const topSpace = 0;
      if (state.topSpace === topSpace) return state;
      return { ...state, topSpace };
    }
    case types.UPDATE_DIMENSIONS_SCROLL: {
      if (state.scroll === action.payload.scroll) {
        return state;
      }
      const isHeaderBarVisible = action.payload.scroll <= state.scroll || action.payload.scroll <= 55;
      const chatScrollHeight = state.height - (isHeaderBarVisible ? 154 : 113);
      const newState = {
        ...state,
        prevScroll: state.scroll,
        scroll: action.payload.scroll,
        isFacetOffScreen: action.payload.isSearchPage && action.payload.scroll > action.payload.facetBottom - 75,
        isFacetTitleFixed:
          action.payload.isSearchPage &&
          action.payload.scroll >= 62 &&
          action.payload.scroll < 10000 &&
          action.payload.scroll > state.scroll,
        isHeaderBarVisible,
        chatScrollHeight,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.UPDATE_DIMENSIONS_RESIZE: {
      const chatScrollHeight = action.payload.height - (state.isHeaderBarVisible ? 154 : 113);
      const newState = {
        ...state,
        prevHeight: state.height,
        prevWidth: state.width,
        width: action.payload.width,
        height: action.payload.height,
        layout: action.payload.layout,
        chatScrollHeight,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
