import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, args, { dispatch, getState, type, source, data, history }) => {
  dispatch({ type: types.CONSENT_ACTION_REQUEST, payload: { uid, source, data } });
  const { view: { layout }, device: { os, browser: { name }, deviceid }, session: { nextUrl } } = getState();
  const tracking = {
    platform: layout,
    app: 'web',
    os,
    device: name,
    deviceid,
    url: history.location.href,
    source,
  };
  api
    .post('/consent/:id', { ...data, tracking, source })
    .then(response => {
      dispatch({ type: types.CONSENT_ACTION_SUCCESS, payload: { source, type } });
      if (/^https?:\/\//i.test(nextUrl)) {
        window.location.href = nextUrl;
      } else {
        window.location.href = getState().config.app.wwwBaseUrl + nextUrl;
        // history.push(nextUrl);
      }
    })
    .catch(error => {
      const errorCleaned = errors.clean(error);
      dispatch({ type: types.CONSENT_ACTION_FAIL, payload: { source, type, errorCleaned, error } });
      dispatch({
        type: types.MODAL_SHOW,
        payload: { modal: 'simpleMessage', source, title: 'Message', content: 'Whoops, something went wrong, please try again!' },
      });
    });
};
