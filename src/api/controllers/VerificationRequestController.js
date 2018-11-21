import requestService from '../services/requestService';

const send = (logger, data, query, auth) => {
  const request = {
    method: 'post',
    url: `/requests/${auth.uid}?_debug=send_verification_request`,
    data: { data },
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  send,
};
