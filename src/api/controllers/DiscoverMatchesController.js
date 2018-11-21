import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const index = (logger, query, auth, config) => {
  const { discoverTypes, viewed = 'N', file_extension } = query;

  const { uid } = auth;
  const requests = {};
  requests.dependency = {};
  let criteria = {};
  discoverTypes.forEach(type => {
    const params = { type };
    if (type !== 'discovery_recent_visitors') {
      params.viewed = viewed;
    }
    requests[type] = ww4.discover.batchRequest({ uid, params, file_extension });
    if (type !== 'reverse') {
      requests[`${type}_viewed`] = ww4.discover.batchRequest({ uid, params: { type, viewed: 'Y', file_extension } });
      if (type === 'discovery_recent_visitors') {
        criteria = {
          operator: 'notin',
          operands: {
            [`${type}.remark.messageCode`]: ['visitor_privacy'],
          },
        };
      } else {
        criteria = {
          operator: 'eq',
          operands: {
            [`${type}.paginator.total_count`]: 0,
          },
        };
      }

      requests.dependency[`${type}_viewed`] = {
        [type]: {
          criteria,
        },
      };
    }
  });
  return batchRequestService(
    logger,
    { ...query, _debug: 'Discover landing' },
    auth,
    requests,
    data => decorators.discoverMatchesGroup(undefined, { data, uid, discoverSearchType: discoverTypes }),
    data => null,
    { cancelToken: config.CancelToken },
  );
};
export default {
  index,
};
