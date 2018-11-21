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
    console.log('Bad pg_ubt in loadSearchMatches', str, err);
    return '';
  }
};

export const fetchSearchMatches = (_onRequest = onRequest, _onSuccess = onSuccess, _onFail = onFail) => (params, uid, pg_ubt, q) => {
  const [path, , per_page] = decode64(pg_ubt || '').split('|');
  const { pg_searchresults_id, navigation, pg_show_from, profileNumber } = q;

  const query = {
    page: navigation || pg_show_from,
    number: profileNumber || 1,
    per_page: parseInt(per_page || '0', 10) || perPage(path),
    results_id: pg_searchresults_id,
  };

  apiBulkQueue(uid, params, query, { urlParams: q }, _onRequest, _onSuccess, _onFail);
};

const loadSearchMatches = fetchSearchMatches();

export default loadSearchMatches;
