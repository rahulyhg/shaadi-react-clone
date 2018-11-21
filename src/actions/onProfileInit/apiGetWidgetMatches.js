import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (uid, widget, dispatch, fileExtension) => {
  if (!uid || uid.length === 0 || uid === 'default') {
    return;
  }

  dispatch({ type: types.WIDGET_MATCHES_REQUEST, payload: { uid, widget } });
  api
    .get('/widgets/:widget/matches', {
      params: { id: uid, widget, file_extension: fileExtension },
    })
    .then(response => {
      dispatch({
        type: types.WIDGET_MATCHES_SUCCESS,
        payload: { ...response.data, profiles: (response.data.profiles || []).filter(aa => aa.uid !== uid).slice(0, 3), widget },
      });
    })
    .catch(error => dispatch({ type: types.WIDGET_MATCHES_FAIL, payload: { ...errors.clean(error), widget } }));
};
