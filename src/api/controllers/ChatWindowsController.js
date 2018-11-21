import batchRequestService from '../services/batchRequestService';

const update = (logger, data, query, auth) => {
  const { uid } = auth;
  const requests = {};

  data.forEach(d => {
    requests[d.profileid] = {
      method: 'put',
      relative_url: `/prompt/${uid}/chat-window`,
      body: {
        data: {
          profileid: d.profileid,
          state: d.state,
        },
      },
    };
    return null;
  });

  return batchRequestService(logger, query, auth, requests, response => response);
};

export default {
  update,
};
