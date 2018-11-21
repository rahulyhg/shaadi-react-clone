/* eslint camelcase: 0 */

import requestService from '../services/requestService';
import decorators from '../decorators';
import ww4 from '../ww4';

const index = (logger, query, auth) => {
  const { uid } = auth;
  const { results_id, page, request_id, file_extension = undefined } = query;

  const q = {
    uid,
    results_id,
    page: page || 1,
    request_id,
  };
  file_extension && (q.file_extension = file_extension);
  return requestService(logger, query, auth, ww4.photos(q), data => decorators.searchPhotos(undefined, data, q));
};

export default {
  index,
};
