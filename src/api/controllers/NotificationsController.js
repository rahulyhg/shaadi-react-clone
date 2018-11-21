import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const index = (logger, query, auth) => {
  const { uid } = auth;
  const { file_extension } = query;
  const requests = {
    notifications: ww4.notifications(uid, query.mark_as_read === 'yes', file_extension),
  };

  return batchRequestService(logger, query, auth, requests, data => ({
    alerts: decorators.alerts(undefined, data.notifications.data),
  }));
};

export default {
  index,
};
