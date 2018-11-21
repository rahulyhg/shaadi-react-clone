import types from '../../../action_types';

const hideLater = (dispatch, key, secs) => {
  window.setTimeout(() => hide(dispatch, [], key), secs * 1000);
};

const hide = (dispatch, [page, positions, params], key) => {
  if (key) {
    dispatch({ type: types.TOAST_HIDE_KEY, payload: { key } });
  } else {
    dispatch({ type: types.TOAST_HIDE, payload: { page, positions, ...(params || {}) } });
  }
  return true;
};

const show = (dispatch, [page, position, params], contentOrMessage, hideInSecs = 0, givenKey) => {
  if (!contentOrMessage || !page || !position) {
    return true;
  }
  const key = givenKey || `${JSON.stringify([page, position, params]).replace(/[^0-9a-zA-Z]+/g, '-')}-${new Date() / 1}`;
  const message = contentOrMessage;

  if (hideInSecs > 0) {
    hideLater(dispatch, key, hideInSecs);
  }

  dispatch({ type: types.TOAST_SHOW, payload: { key, page, position, params: params || {}, message } });

  return true;
};
const alerts = {
  show,
  hide,
  hideLater,
};

export default alerts;
