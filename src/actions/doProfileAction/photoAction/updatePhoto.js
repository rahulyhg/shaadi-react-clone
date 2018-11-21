import types from '../../../action_types';
import api from '../../../api';
import errors from '../../lib/errors';
import getPhotos from './getPhotos';

export default (uid, args, { dispatch, getState, type, source, self, key }, data = {}, queryParams = {}) => {
  const metadata = {
    ...getState().metadata,
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
  };
  const requestBody = { ...data, metadata };
  const photoOrder = requestBody.data.photo_order;
  dispatch({ type: types.UPDATE_PHOTO_REQUEST, payload: { uid, queryParams, source, data } });
  const apiParams = { source, self: uid, type, dispatch, getState };
  api
    .put('/:id/photo', requestBody, { params: queryParams })
    .then(response => {
      dispatch({ type: types.UPDATE_PHOTO_SUCCESS, payload: { source, type, photo_order: photoOrder, uid: 'self' } });
      return getPhotos(uid, args, apiParams);
    })
    .catch(error => {
      const errorCleaned = errors.clean(error);
      dispatch({ type: types.UPDATE_PHOTO_FAIL, payload: { source, type, errorCleaned, error, photo_order: photoOrder, uid: 'self' } });
      // @toDo in future show precise message
      dispatch({
        type: types.MODAL_SHOW,
        payload: { modal: 'simpleMessage', source, title: 'Message', content: 'Whoops, something went wrong! Please try again.' },
      });
      return getPhotos(uid, args, apiParams);
    });
};
