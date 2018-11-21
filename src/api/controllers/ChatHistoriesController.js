import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const show = (logger, query, auth) => {
  const { uid } = auth;
  const memberlogin = query.uid;
  const type = query.type || 'unified';
  const requests = { chatHistory: ww4.chatHistory(uid, [memberlogin], type) };
  return batchRequestService(logger, query, auth, requests, data => {
    const history = data.chatHistory.data[memberlogin];
    return decorators.chatHistory(history, uid, memberlogin);
  });
};

export default {
  show,
};
