/* eslint camelcase: 0 */

import apiBulkQueue from '../apiBulkQueue';
import perPage from '../../../constants/perPage';
import onRequest from './onRequest';
import onSuccess from './onSuccess';
import onFail from './onFail';

const decode64 = str => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Bad ubt in loadOtherMatches', str, err);
    return '';
  }
};

export default (params, uid, ubt, q) => {
  const [path] = decode64(ubt || '').split('|');
  apiBulkQueue(uid, params, { ubt, per_page: perPage(path) }, { urlParams: q }, onRequest, onSuccess, onFail);
};
