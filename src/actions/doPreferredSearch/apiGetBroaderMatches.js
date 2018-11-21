import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (dispatch, getState) => {
  const widget = 'partner-search-broader';

  dispatch({ type: types.WIDGET_MATCHES_REQUEST, payload: { widget } });
  api
    .get('/widgets/:widget/matches', {
      params: { widget, file_extension: `${getState().config.app.webp !== '0' ? 'webp' : ''}` },
    })
    .then(response => {
      dispatch({ type: types.WIDGET_MATCHES_SUCCESS, payload: { ...response.data, widget } });
    })
    .catch(error => dispatch({ type: types.WIDGET_MATCHES_FAIL, payload: { ...errors.clean(error), widget } }));
};
