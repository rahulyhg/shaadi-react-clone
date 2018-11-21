/* eslint camelcase: 0 */

import apiProfileQueue from '../apiProfileQueue';
import perPage from '../../../constants/perPage';

const decode64 = str => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Bad ubt in loadOtherMatches', str, err);
    return '';
  }
};

export default ({ dispatch, getState }, uid, ubt, q) => {
  const [path] = decode64(ubt || '').split('|');
  apiProfileQueue(uid, { ubt, per_page: perPage(path) }, { urlParams: q }, { dispatch, getState });
};
