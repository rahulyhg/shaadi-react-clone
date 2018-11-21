import requestService from '../services/requestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const show = (logger, query, auth) => {
  const { uid } = auth;
  return requestService(logger, query, auth, ww4.csatSurvey(uid), requestData => decorators.csatSurvey(undefined, requestData));
};

const save = (logger, data, query, auth) => {
  const { uid } = auth;

  const request = {
    method: 'post',
    url: `/surveys/csat/${uid}`,
    data: {
      data,
    },
  };
  return requestService(logger, query, auth, request, d => d.data);
};

export default {
  show,
  save,
};
