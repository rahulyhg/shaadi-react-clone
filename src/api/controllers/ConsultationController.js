import requestServiceWww from '../services/requestServiceWww';

const index = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `/serve/index/get-vip-consulant-detail`,
    params: {
      profileid: query.id,
      memberlogin: auth.uid,
    },
  };
  return requestServiceWww(logger, query, auth, request, data => ({ consultantDetails: data.data }));
};
const send = (logger, data, query, auth) => {
  const request = {
    method: 'post',
    url: `/serve/index/enquirynew?_debug=send_vip`,
    params: {
      memberlogin: data.memberlogin,
      firstname: data.firstname,
      phoneNo: data.phoneNo,
    },
  };
  return requestServiceWww(logger, query, auth, request, d => d);
};
const track = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `/serve/index/get-vip-consulant-detail`,
    params: {
      memberlogin: auth.uid,
      eventType: 'getfreeconsult',
      profileid: query.uid,
    },
  };
  return requestServiceWww(logger, query, auth, request, data => ({ returndata: data.data }));
};
export default {
  index,
  send,
  track,
};
