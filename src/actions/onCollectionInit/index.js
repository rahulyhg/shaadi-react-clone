/* eslint camelcase: 0 */
import { parse } from 'qs';
import withAuth from '../withAuth';
import loadCollection from './loadCollection';
import doProfileAction from '../doProfileAction';
import apiGetTxtProfile from './apiGetTxtProfile';
import moveToProfile from './loadCollection/moveToProfile';
import updateHeader from './updateHeader';

const fetchCollection = (dispatch, getState, location, selfUid) => uid => {
  if (selfUid === uid) {
    const wwwUrl = getState().config.app.wwwBaseUrl;
    window.location.href = `${wwwUrl}/my-shaadi/profile`;
    return;
  }
  loadCollection(uid, dispatch, getState, location);
  doProfileAction('profile', uid, 'loadShortlist')(dispatch, getState);
};

export { moveToProfile, updateHeader };
export default location => (dispatch, getState) => {
  const { profileid, txtprofileid } = parse(location.search.slice(1));
  withAuth(
    ({ auth }) => {
      const onLoad = fetchCollection(dispatch, getState, location, auth.uid);
      if (!profileid && txtprofileid) {
        apiGetTxtProfile(txtprofileid, dispatch, onLoad);
      } else {
        onLoad(profileid);
      }
    },
    { caller: 'onCollectionInit', allowCache: true },
  );
};
