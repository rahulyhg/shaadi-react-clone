import requestService from '../services/requestService';

const create = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'post',
    url: `/sms/${uid}/submit?_debug=smsSend`,
    data: {
      se: data.metadata.se,
      profileid: data.id,
      message: data.message,
      chkMobileNumber: data.chkMobileNumber,
      counter: data.counte,
      metadata: data.metadata,
    },
  };
  return requestService(logger, query, auth, request, d => ({
    contacts_total: (d.data.membership || {}).contacts_total,
    contacts_remaining: (d.data.membership || {}).contacts_total - (d.data.membership || {}).contacts_used,
  }));
};

const send = (logger, data, query, auth) => {
  const { uid } = auth;

  const request = {
    method: 'post',
    url: `/sms/${uid}/contact-detail`,
    data: {
      data: {
        profileid: `${data.profile_id}`,
      },
    },
  };

  return requestService(logger, query, auth, request, d => d.data);
};

export default {
  create,
  send,
};
