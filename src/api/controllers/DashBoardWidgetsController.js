import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';

// type WidgetType = ('discovery_recent_visitors' | 'discovery_premium' | 'recently-joined')

// getAdditionalParams :: WidgetType -> Object
const getAdditionalParams = type => {
  switch (type) {
    case 'recently-joined':
      return { sort: 'recorddate', limit_per_page: 5 };
    case 'discovery_premium':
      return { limit_per_page: 5 };
    default:
      return {};
  }
};

// getCriteria :: WidgetType -> Object
const getCriteria = type => {
  switch (type) {
    case 'discovery_recent_visitors':
      return {
        operator: 'notin',
        operands: {
          [`${type}.remark.messageCode`]: ['visitor_privacy'],
        },
      };
    default:
      return {
        operator: 'eq',
        operands: {
          [`${type}.paginator.total_count`]: 0,
        },
      };
  }
};
const getListCategory = type => (['discovery_recent_visitors', 'discovery_premium', 'recently-joined'].includes(type) ? 'search' : type);

const getApiConfig = (query, auth, config) => type => {
  const { viewed = 'N', file_extension } = query;

  const { uid } = auth;
  const listCategory = getListCategory(type);
  const apiMap = {
    search: {
      params: {
        uid,
        params: { decorator: { name: 'profile_info_widget' }, type, viewed, ...getAdditionalParams(type) },
        file_extension,
      },
      endPoint: ww4.discover.batchRequest,
    },
    invites: {
      params: {
        type: 'connect',
        uid,
        decorator: {
          name: 'profile_info_widget_inbox',
          profile_photo: true,
          img_size: ['small', 'medium', 'semilarge'],
          img_border: '_nb',
        },
        file_extension,
        limit_per_page: 21,
      },
      endPoint: ww4.inbox.batchRequest,
    },
  };
  return apiMap[listCategory];
};

const index = (logger, query, auth, config) => {
  const getConfig = getApiConfig(query, auth, config);
  const widgets = ['discovery_recent_visitors', 'discovery_premium', 'recently-joined', 'invites'];

  const requests = {};
  requests.dependency = {};

  widgets.forEach(type => {
    const apiInfo = getConfig(type) || {};
    requests[type] = apiInfo.endPoint(apiInfo.params);
    if (getListCategory(type) === 'search') {
      requests[`${type}_viewed`] = apiInfo.endPoint({ ...apiInfo.params, viewed: 'Y' });
      requests.dependency[`${type}_viewed`] = {
        [type]: {
          criteria: getCriteria(type),
        },
      };
    }
  });
  return batchRequestService(logger, { ...query, _debug: 'my_shaadi_dashboard' }, auth, requests, data => data, data => null, {
    cancelToken: config.CancelToken,
  });
};

export default {
  index,
};
