import requestService from '../services/requestService';

const sendMessage = (logger, data, query, auth) => {
  const request = {
    method: 'post',
    url: `/messages/${auth.uid}?_debug=send_msg_free`,
    data,
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  sendMessage,
};
