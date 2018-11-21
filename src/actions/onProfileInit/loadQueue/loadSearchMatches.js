/* eslint camelcase: 0 */
import apiProfileQueue from '../apiProfileQueue';
import perPage from '../../../constants/perPage';

const decode64 = str => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Bad pg_ubt in loadSearchMatches', str, err);
    return '';
  }
};

export default ({ dispatch, getState }, uid, pg_ubt, q) => {
  const parts = decode64(pg_ubt || '').split('|');
  const [path, , per_page] = parts;
  const { pg_searchresults_id, navigation, pg_show_from, profileNumber } = q;

  apiProfileQueue(
    uid,
    {
      page: navigation || pg_show_from,
      number: profileNumber || 1,
      per_page: parseInt(per_page || '0', 10) || perPage(path),
      results_id: pg_searchresults_id,
    },
    { urlParams: q },
    { dispatch, getState },
  );
};
