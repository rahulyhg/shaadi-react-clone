/* global window: true */
import types from '../../action_types';
import logger from '../../logger';
import detectLayout from './detectLayout';

let width = 0;
const update = dispatch => {
  const newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  if (Math.abs(newWidth - width) > 1) {
    logger.debug('%c RESIZE', 'color: purple; font-weight: bold;', newWidth);
    dispatch({
      type: types.UPDATE_DIMENSIONS_RESIZE,
      payload: {
        width: newWidth,
        height: newHeight,
        layout: detectLayout(null, newWidth).layout,
      },
    });
  }
  width = newWidth;
};

let running = true;

export default (dispatch, getState) => {
  const fps = 10;

  const onTick = () => {
    update(dispatch);
    running = false;
  };

  const resizeThrottler = () => {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(onTick);
      } else {
        setTimeout(onTick, 1000 / fps);
      }
    }
  };

  window.addEventListener('resize', resizeThrottler, false);
  onTick();
};
