/* eslint no-underscore-dangle: 0 */
import requestService from '../services/requestService';

const tickerTypes = {
  fourHourTicker: 'ticker',
};

const show = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/profiles/${uid}/views?_debug=${query.type}&_t=${new Date() / 1}`,
    params: {
      type: tickerTypes[query.type],
    },
  };

  return requestService(logger, query, auth, request, d => d.data);
};

export default {
  show,
};
