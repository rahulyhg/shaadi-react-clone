import requestService from '../services/requestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const show = (logger, query, auth, config) => {
  const { uid } = auth;
  const { results_id, page, request_id, file_extension } = query;
  const q = {
    uid,
    results_id,
    page: page || 1,
    request_id,
    file_extension,
  };

  return requestService(
    logger,
    query,
    auth,
    ww4.contactSummary(q),
    requestData => decorators.contactSummary(undefined, requestData, q),
    undefined,
    { cancelToken: config.CancelToken },
  );
};

export default {
  show,
};
