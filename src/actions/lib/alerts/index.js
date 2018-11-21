import types from '../../../action_types';

const messageFor = content => ({
  title: content[0],
  body: content
    .slice(1)
    .filter(s => s)
    .map((para, i) => ({
      key: `para-${i}`,
      items: para.filter(s => s).map((sentence, j) => ({
        key: `s-${i}.${j}`,
        type: sentence.type ? `${sentence.type}` : 'text',
        text: sentence.text ? `${sentence.text}` : sentence ? `${sentence}` : null,
        url: sentence.url ? `${sentence.url}` : null,
      })),
    })),
  loading: false,
});

const hideLater = (dispatch, key, secs) => {
  window.setTimeout(() => hide(dispatch, [], key), secs * 1000);
};

const hide = (dispatch, [page, positions, params], key) => {
  if (key) {
    dispatch({ type: types.ALERT_HIDE_KEY, payload: { key } });
  } else {
    dispatch({ type: types.ALERT_HIDE, payload: { page, positions, ...(params || {}) } });
  }
  return true;
};

const defaultMessage = messageFor([]);

const show = (dispatch, [page, position, params], contentOrMessage, hideInSecs = 0, givenKey) => {
  if (!contentOrMessage || !page || !position) {
    return true;
  }
  const key = givenKey || `${JSON.stringify([page, position, params]).replace(/[^0-9a-zA-Z]+/g, '-')}-${new Date() / 1}`;
  const message = contentOrMessage.length ? messageFor(contentOrMessage) : { ...defaultMessage, ...contentOrMessage };

  if (hideInSecs > 0) {
    hideLater(dispatch, key, hideInSecs);
  }
  dispatch({ type: types.ALERT_SHOW, payload: { key, page, position, params: params || {}, ...message } });

  return true;
};
const alerts = {
  show,
  hide,
  hideLater,
  messageFor,
};

export default alerts;
