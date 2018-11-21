/* eslint camelcase: 0 */
import decorators from '../decorators';
import ww4 from '../ww4';
import requestService from '../services/requestService';

const types = {
  'profile-new-matches': 'recently-joined',
  'profile-similar-profiles': 'similar_profile',
  'partner-search-broader': 'broader',
  'profile-new-matches-broader': 'discovery_newly_joined',
};

const index = (logger, query, auth) => {
  const { uid } = auth;
  const { id, widget, file_extension = '' } = query;

  return requestService(logger, query, auth, ww4.widgets(uid, types[widget] || 'none', id, file_extension), data =>
    decorators.widgetMatches(undefined, data, query),
  );
};

export default {
  index,
};
