/* global window: true */
import types from '../../action_types';

let scrollPos = -10;
const update = dispatch => {
  const newScrollPos = window.pageYOffset || document.documentElement.scrollTop;

  if (Math.abs(newScrollPos - scrollPos) > 0.1) {
    dispatch({
      type: types.UPDATE_DIMENSIONS_SCROLL,
      payload: {
        isSearchPage: window.location.pathname.indexOf('/search') !== -1,
        facetBottom: (document.getElementById('facetBottom') || {}).offsetTop || 5000,
        scroll: newScrollPos,
      },
    });
  }
  scrollPos = newScrollPos;
};

let running = true;

export default dispatch => {
  const fps = 60;

  const onTick = () => {
    update(dispatch);
    running = false;
  };

  const scrollThrottler = () => {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(onTick);
      } else {
        setTimeout(onTick, 1000 / fps);
      }
    }
  };

  window.addEventListener('scroll', scrollThrottler, false);
  onTick();
};
