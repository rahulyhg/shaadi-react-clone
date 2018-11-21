import { encode64 } from './utils';

import types from '../../action_types';
import api from '../../api';
import withAuth from '../withAuth';
import errors from '../lib/errors';

export default ({ results_id, page, type }) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      const q = { results_id, page, type };
      q.t = new Date() / 1;
      q.request_id = encode64(q);
      getState().config.app.webp !== '0' && (q.file_extension = 'webp');
      dispatch({ type: types.OTHERSEARCH_PHOTOS_REQUEST, payload: q });

      api
        .get('/search/photos', { params: q })
        .then(response => {
          const { data } = response;
          dispatch({ type: types.OTHERSEARCH_PHOTOS_SUCCESS, payload: data });
        })
        .catch(error => dispatch({ type: types.OTHERSEARCH_PHOTOS_FAIL, payload: errors.clean(error) }));
    },
    { caller: 'doPhotoSearch', allowCache: true, delay: 33 },
  );
};
