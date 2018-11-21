import requestService from '../services/requestService';

const index = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/messages/${uid}/drafts/`,
    params: {
      fieldset: 'message',
    },
  };
  return requestService(logger, query, auth, request, data => ({ drafts: data.data.message }));
};

const show = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/messages/${uid}/drafts/`,
    params: {
      fieldset: 'default',
      fq: {
        default: {
          type: query.action === 'contact' ? 'contact' : 'connect',
          action: query.action === 'contact' ? 'viewed' : query.action,
          profileid: query.id,
        },
      },
    },
  };
  return requestService(logger, query, auth, request, data => ({
    draft: data.data.default || data.data.message_text,
    isSent: !!data.data.message_text,
  }));
};
const create = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'post',
    url: `/messages/${uid}/drafts?_debug=create`,
    data: {
      data: {
        message: {
          message: data.text,
        },
      },
    },
  };
  return requestService(logger, query, auth, request, d => ({ draft: { message: data.text } }));
};

const update = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'put',
    url: `/messages/${uid}/drafts?_debug=update`,
    data: {
      data: {
        message: {
          message: data.text,
        },
      },
    },
    params: {
      fq: {
        message: {
          draft_id: data.id,
        },
      },
    },
  };
  return requestService(logger, query, auth, request, d => ({
    draft: { id: data.id, message: data.text },
  }));
};
export default {
  index,
  show,
  create,
  update,
};
