import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';

export default (requestedLayers, { dispatch, getState, type, source }, onSuccess) => {
  dispatch({ type: types.LAYER_REQUEST, payload: { type, source } });

  api
    .get('/layers/me', { params: { types: requestedLayers } })
    .then(response => {
      Object.keys(response.data).forEach(requestedLayer =>
        onSuccess({ source, type, requestedLayer, layer: response.data[requestedLayer], dispatch, getState }),
      );
    })
    .catch(error => {
      dispatch({ type: types.LAYER_FAIL, payload: errors.clean(error) });
    });
};
