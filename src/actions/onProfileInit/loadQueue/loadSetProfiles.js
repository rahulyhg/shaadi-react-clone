/* eslint camelcase: 0 */
import { stringify } from 'qs';
import types from '../../../action_types';
import { prepareNextdata } from '../../../helpers/urls';

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
  return `/profile?${stringify({ ...params, profileid: id })}`;
};

export default ({ dispatch, getState }, uid, q) => {
  const profiles = decode(q.set_profiles || '').split('|');
  const i = profiles.indexOf(uid);
  const nextData = !profiles[i + 1]
    ? prepareNextdata(q.evt_ref, getState)
    : { nextText: 'Next', nextUrl: urlFor({ ...q, np: 'via-next' }, profiles[i + 1]) };
  const { nextText, nextUrl } = nextData;

  const payload = {
    uid,
    count: profiles.length - i - 1,
    prevText: 'Prev',
    nextText,
    backText: null,
    prevUrl: urlFor({ ...q, np: 'via-prev' }, i >= 1 ? profiles[i - 1] : null),
    nextUrl,
    backUrl: null,
    nextUid: profiles[i + 1],
  };
  dispatch({
    type: types.PROFILE_QUEUE_SUCCESS,
    payload,
  });
};
