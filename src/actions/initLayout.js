import types from '../action_types';

export default () => (dispatch, getState) => {
  const { ui } = getState();
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const computedLayout = windowWidth < 720 || window.isUCBrowser ? 'mobile' : 'desktop';
  if (ui.layout !== computedLayout) {
    dispatch({
      type: types.TOGGLE_LAYOUT,
      layout: computedLayout,
    });
  }
};
