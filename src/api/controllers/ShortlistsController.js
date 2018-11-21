import requestService from '../services/requestService';

const create = (logger, data, query, auth) => {
  const { uid } = auth;

  const request = {
    method: 'post',
    url: `/shortlists/${uid}`,
    data: {
      data: {
        list_name: data.name,
      },
    },
  };

  return requestService(logger, query, auth, request, d => d.data);
};

const show = (logger, query, auth) => {
  const { uid } = auth;

  const request = {
    method: 'get',
    url: `/intents/${uid}`,
    params: {
      type: 'shortlisted',
      profileids: `${query.profile_id}`,
      fieldset: 'intents',
    },
  };

  return requestService(logger, query, auth, request, d => {
    const { intents } = d.data;
    const { lists } = (intents || {})[query.profile_id] || {};
    return (lists || []).map(l => l.id);
  });
};

export default {
  create,
  show,
};
