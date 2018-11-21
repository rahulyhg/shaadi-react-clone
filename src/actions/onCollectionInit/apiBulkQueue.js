/* eslint camelcase: 0 */

import { stringify } from 'qs';
import api from '../../api';
import errors from '../lib/errors';

const decode64 = str => {
  if (!str) return '';
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Bad ubt', str, err);
    return '';
  }
};

const urlFor = (urlParams = {}, { profileid, ubt, profileNumber, page }) => {
  if (!profileid) return null;
  const q = ubt ? { ...urlParams, profileid, ubt } : { ...urlParams, profileid, profileNumber, navigation: page, pg_show_from: page };
  return `/profile?${stringify(q)}`;
};
const backFor = ({ evt_ref, pg_searchresults_id, pg_ubt }, { page, ubt }) => {
  const [path, results_id] = decode64(ubt).split('|');
  const [pg_path] = decode64(pg_ubt).split('|');
  const q = path && results_id ? { pg_searchresults_id: results_id, page, evt_ref } : { pg_searchresults_id, page, evt_ref };
  if (!path && !pg_path) return null;
  return `${path || pg_path}?${stringify(q)}`;
};

export default (uid, params, { ubt, per_page, results_id, page, number }, { urlParams, backUrl }, onRequest, onSuccess, onFail) => {
  if (!uid || uid.length === 0 || uid === 'default') {
    return;
  }

  const { evt_ref, source, tempId = '', featured } = urlParams;
  const q = { ubt, per_page, results_id, page, number, evt_ref, source, tempId, featured };

  onRequest({ uid, q }, params);
  api
    .get('/profile-queues/bulk', {
      params: { id: uid, q, limit: 10 },
    })
    .then(response => {
      const { count, list, back, leftWall, rightWall } = response.data;
      const payload = {
        uid,
        uids: list.map(p => p.profileid),
        urls: list.map(p => urlFor(urlParams, p)),
        count,
        backUrl: backFor(urlParams, back),
        leftWall,
        rightWall,
        source,
      };
      onSuccess(payload, params);
    })
    .catch(error => {
      const payload = { ...errors.clean(error), uid, q };
      onFail(payload, params);
    });
};
