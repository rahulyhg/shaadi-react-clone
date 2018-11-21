import api from '../../api';
import localCache from '../../localCache';
import errors from '../lib/errors';
// import types from '../../action_types';

const cacheKey = (pageName, uid, query) => `${uid}::${pageName}?`;

export default (uid, dispatch) => {
  const data = {
    data: {
      matches: {
        most_preference: 'Y', // eslint-disable-line camelcase
      },
    },
  };

  api
    .put('/matches-tour-shown', data)
    .then(response => {
      const cKey = cacheKey('mostMatchesTourShown', uid, {});
      localCache.write(cKey, 'shown', 3600 * 24 * 7);
      console.log('most matches marked as shown on server');
    })
    .catch(error => {
      const message = errors.clean(error);
      console.log('apiChangeMatchesSwitch error ', message);
    });
};
