/* eslint camelcase: 0 */

import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const index = (logger, query, auth) => {
  const { discoverTypes, file_extension = '' } = query;
  const { uid } = auth;
  const requests = {};
  discoverTypes.forEach(type => {
    const req = (type === 'full-profile' && ww4.viewed) || ww4.intents;
    requests[type] = req.batchRequest({ uid, params: { type }, file_extension });
  });

  return batchRequestService(
    logger,
    { ...query, _debug: 'Intents landing' },
    auth,
    requests,
    data => decorators.discoverMatchesGroup(undefined, { data, uid, discoverSearchType: discoverTypes }),
    data => null,
  );
};
export default {
  index,
};
