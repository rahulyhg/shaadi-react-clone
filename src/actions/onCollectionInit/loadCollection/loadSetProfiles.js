/* eslint camelcase: 0 */
import { stringify } from 'qs';
import onRequest from './onRequest';
import onSuccess from './onSuccess';

const decode = str => {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    console.log('Bad set_profiles in loadSetProfiles', str, err);
    return '';
  }
};

const urlFor = (params, id) => {
  if (!id) return null;
  // atact is base64encoded value of actions eg eio, accept
  return `/profile?${stringify({ ...params, profileid: id, atact: '' })}`;
};

// isValidUid :: String -> Boolean
const isValidUid = uid => !!(uid && uid.length);

export default (params, uid, q) => {
  let uids = decode(q.set_profiles || '')
    .split('|')
    .filter(isValidUid);

  if (!uids.includes(uid)) uids = [uid];
  onRequest({ uid }, params);
  const payload = {
    uid,
    uids,
    urls: uids.map(p => urlFor(q, p)),
    count: uids.length - uids.indexOf(uid),
    backUrl: null,
  };

  onSuccess(payload, params);
};
