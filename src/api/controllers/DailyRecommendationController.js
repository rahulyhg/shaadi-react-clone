import requestService from '../services/requestService';
import decorators from '../decorators';
import ww4 from '../ww4';

const index = (logger, query, auth) => {
  const { uid } = auth;
  const profileId = query.uid || '';
  return requestService(logger, query, auth, ww4.dailyRecommendations({ uid }), d =>
    decorators.dailyRecommendations(undefined, d, profileId),
  );
};
export default {
  index,
};
