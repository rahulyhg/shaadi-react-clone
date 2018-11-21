import requestService from '../services/requestService';

const updateChatPresence = (logger, data, query, auth) => {
  const request = {
    method: 'put',
    url: `/profiles/${auth.uid}/presence`,
    data,
    params: {
      platform: auth.platform,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  updateChatPresence,
};
