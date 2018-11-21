/* eslint camelcase: 0 */

import types from '../../action_types';
import api from '../../api';
import errors from '../lib/errors';
import { urlFor, backFor, extractIcon, prepareNextdata } from '../../helpers/urls';

export default (uid, { ubt, per_page, results_id, page, number }, { urlParams, backUrl }, { dispatch, getState }) => {
  if (!uid || uid.length === 0 || uid === 'default') {
    return;
  }

  const { evt_ref, source, tempId = '', featured } = urlParams;
  const q = { ubt, per_page, results_id, page, number, evt_ref, source, tempId, featured };

  dispatch({ type: types.PROFILE_QUEUE_REQUEST, payload: { uid, q } });
  api
    .get('/profile-queues/me', {
      params: { id: uid, q },
    })
    .then(response => {
      const { count, prev, next, back } = response.data;
      const { details: prevProfileDetail } = prev;
      const { details: nextProfileDetail } = next;
      const nextData = !next.profileid
        ? prepareNextdata(evt_ref, getState)
        : { nextText: 'Next', nextUrl: urlFor({ ...urlParams, np: 'via-next' }, next) };
      const { nextText, nextUrl } = nextData;
      const payload = {
        uid,
        count,
        prevText: 'Prev',
        nextText,
        backText: 'Back',
        prevUrl: urlFor({ ...urlParams, np: 'via-prev' }, prev),
        nextUrl,
        backUrl: backFor(urlParams, back),
        nextUid: next.profileid,
        source,
        prevSectionInfo: {
          icon: prevProfileDetail && extractIcon(prevProfileDetail.photos[0], prevProfileDetail.gender),
          iconStatus: prevProfileDetail && prevProfileDetail.status,
        },
        nextSectionInfo: {
          icon: nextProfileDetail && extractIcon(nextProfileDetail.photos[0], nextProfileDetail.gender),
          iconStatus: nextProfileDetail && nextProfileDetail.status,
        },
      };
      dispatch({
        type: types.PROFILE_QUEUE_SUCCESS,
        payload,
      });
    })
    .catch(error => {
      const payload = { ...errors.clean(error), uid, q };
      console.log('ERROR. Failing silently. >>>>>>>>>> PROFILE_QUEUE_FAIL', JSON.stringify(payload.error), uid, q);
      dispatch({ type: types.PROFILE_QUEUE_FAIL, payload });
    });
};
