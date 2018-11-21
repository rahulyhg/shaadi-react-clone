import requestService from '../services/requestService';
import decorators from '../decorators';
import ww4 from '../ww4';

const extract = data => {
  const premiumBannerData = data.data[Object.keys(data.data)[0]] || {};
  return { ...premiumBannerData, total_count: data.paginator.total_count || 0 };
};

const index = (logger, query, auth) => {
  const { uid } = auth;
  const { results_id, page, request_id } = query;
  const q = {
    uid,
    results_id,
    page: page || 1,
    request_id,
  };
  // return { data: decorators.premiumBanner() };
  return requestService(logger, query, auth, ww4.premiumBanner(q), data => decorators.premiumBanner(undefined, extract(data), q));
};

export default {
  index,
};
