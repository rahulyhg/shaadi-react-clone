import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (dispatch, getstate) => {
  const searchType = getstate().otherSearch.searchType.name;
  const widget = 'profile-new-matches-broader';
  dispatch({ type: types.WIDGET_MATCHES_REQUEST, payload: { widget } });
  if (['recently-joined', 'recently-joined-viewed'].includes(searchType)) {
    api
      .get('/widgets/:widget/matches', {
        params: { widget },
      })
      .then(response => {
        dispatch({ type: types.WIDGET_MATCHES_SUCCESS, payload: { ...response.data, widget } });
      })
      .catch(error => dispatch({ type: types.WIDGET_MATCHES_FAIL, payload: { ...errors.clean(error), widget } }));
  }
};
