import requestService from '../services/requestService';
import decorators from '../decorators';

const index = (logger, query, auth) => {
  const { uid } = auth;

  const request = {
    method: 'get',
    url: `/searches/${uid}/saved-search`,
    params: {
      fieldset: 'list',
      list_options: '{"fieldset":["details"]}',
    },
  };

  return requestService(logger, query, auth, request, d => decorators.savedSearch(d.data.list));
};

const save = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'post',
    url: `/searches/${uid}/criteria`,
    data: {
      key: data.key,
      savedsearch_name: data.searchname,
      frequency: data.email_frequency,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  index,
  save,
};
