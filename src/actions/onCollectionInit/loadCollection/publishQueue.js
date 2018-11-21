import types from '../../../action_types';
import preloadProfileList from './preloadProfileList';

export default ({ uid }, { getState, dispatch }) => {
  if (!uid || uid.length === 0 || uid === 'default') {
    return;
  }

  dispatch({ type: types.PROFILE_QUEUE_REQUEST, payload: { uid } });

  const { uids, urls, backUrl, count, prefetching } = getState().profilePage.collection;
  const index = uids.indexOf(uid);
  const prevUid = index > 0 ? uids[index - 1] : null;
  const prevUrl = index > 0 ? urls[index - 1] : null;
  const nextUrl = urls[index + 1];
  const nextUid = uids[index + 1];

  const payload = {
    uid,
    count,
    prevText: 'Prev',
    nextText: 'Next',
    backText: 'Back',
    backUrl,
    prevUid,
    prevUrl,
    nextUid,
    nextUrl,
    source: 'profile',
  };
  dispatch({
    type: types.PROFILE_QUEUE_SUCCESS,
    payload,
  });

  if (!prefetching) {
    preloadProfileList(uid, { render: true, dispatch, getState });
  }
};
