import requestService from '../services/requestService';

const save = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'post',
    url: `/misuse/${uid}/phone`,
    data: {
      ...data,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  save,
};
