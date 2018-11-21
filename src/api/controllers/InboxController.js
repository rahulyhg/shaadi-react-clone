import requestService from '../services/requestService';
import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const index = (logger, query, auth, config) => {
  const { uid } = auth;
  let request = ww4.inbox.getRequest({ uid, ...query });
  let batchReq = false;
  const { type, action } = query;
  const reqType = `${type}_${action}`;
  if (['connect_pending', 'connect_filtered'].includes(reqType)) {
    batchReq = true;
    request = {
      listItem: ww4.inbox.batchRequest({ uid, ...query }),
      featuredItem: ww4.featuredInvites.batchRequest({ uid, type: 'connect_pending' }),
    };
  }

  if (batchReq) {
    return batchRequestService(
      logger,
      query,
      auth,
      request,
      responseData => {
        const { listItem, featuredItem = { data: [], paginator: {} } } = responseData;
        const BatchResponse = { listItem, featuredItem };
        return decorators.inbox(uid, BatchResponse, type, action);
      },
      undefined,
      { cancelToken: config.CancelToken },
    );
  }

  return requestService(
    logger,
    query,
    auth,
    request,
    responseData => {
      const [inboxType, actionType] = responseData.search.search_type.split('_');
      return decorators.inbox(uid, { listItem: responseData }, inboxType, actionType);
    },
    undefined,
    { cancelToken: config.CancelToken },
  );
};
const send = (logger, data, query, auth, config) => {
  const { uid } = auth;
  const requests = {};
  requests.listItem = ww4.inbox.postRequest({ uid, ...query }, data);
  return batchRequestService(
    logger,
    { ...query, _debug: 'Inbox' },
    auth,
    requests,
    successResponse => {
      const { search_type = config.listType } = successResponse.listItem.search;
      const [inboxType, actionType] = search_type.split('_');
      return decorators.inbox(uid, successResponse, inboxType, actionType);
    },
    errorResponse => null,
    { CancelToken: config.CancelToken },
  );
};
const getRequestSummary = (logger, query, auth, config) => {
  const { uid } = auth;
  const type = 'request';

  const request = {
    requestAccepted: ww4.inbox.batchRequest({ uid, action: 'accepted', type, limit_per_page: 2 }),
    requestSent: ww4.inbox.batchRequest({ uid, action: 'awaiting', type, limit_per_page: 2 }),
  };
  return batchRequestService(
    logger,
    query,
    auth,
    request,
    successResponse => {
      const response = { detail: {} };
      Object.keys(successResponse).forEach(key => {
        if (successResponse[key].data.length) {
          response.detail[key] = { count: successResponse[key].paginator.total_count };
          response.detail[key].data = successResponse[key].data.map(profileInfo => ({
            type: key,
            profileId: profileInfo.account.memberlogin,
            profilePic: `${profileInfo.photo_details.photos[0].domain_name}${profileInfo.photo_details.photos[0].small}`,
          }));
        }
      });
      return response;
    },
    errorResponse => null,
    { CancelToken: config.CancelToken },
  );
};
export default {
  index,
  send,
  getRequestSummary,
};
