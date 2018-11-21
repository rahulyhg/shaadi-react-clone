/* eslint camelcase: 0 */
import { parse } from 'qs';
import withAuth from '../withAuth';
import loadProfile from './loadProfile';
import loadQueue from './loadQueue';
import loadTopToast from './loadTopToast';
import apiGetWidgetMatches from './apiGetWidgetMatches';
import apiGetTxtProfile from './apiGetTxtProfile';
import doProfileAction from '../doProfileAction';
import doLayerAction from '../doLayerAction';
import apiGetDRProfiles from './apiGetDRProfiles';
import { isExperiment } from '../doProfileAction/utils';

const loadProfileByUid = (dispatch, getState, location, self, source = 'profile') => uid => {
  const { profileid, txtprofileid } = parse(location.search.slice(1));
  if (self && (profileid === self || txtprofileid === self.slice(1))) {
    const wwwUrl = getState().config.app.wwwBaseUrl;
    window.location.href = `${wwwUrl}/my-shaadi/profile`;
    return;
  }
  const file_extension = getState().config.app.webp !== '0' ? 'webp' : '';
  loadProfile(uid, dispatch, getState, location);
  loadQueue(uid, dispatch, getState, location);
  loadTopToast(uid, dispatch, getState, location);
  if (source === 'profile') {
    !isExperiment('similar_profile')(getState) && apiGetWidgetMatches(uid, 'profile-similar-profiles', dispatch, file_extension);
    apiGetWidgetMatches(uid, 'profile-new-matches', dispatch, file_extension);
  }
  doProfileAction('profile', uid, 'loadShortlist')(dispatch, getState);
  doLayerAction('onProfileInit', uid, 'getProfile')(dispatch, getState);
};

export default location => (dispatch, getState) => {
  const { profileid, txtprofileid } = parse(location.search.slice(1));
  const source = location.pathname.indexOf('daily-recommendations') >= 0 ? 'DR' : 'profile';
  withAuth(
    ({ auth }) => {
      const onLoad = loadProfileByUid(dispatch, getState, location, auth.uid, source);
      if (location.pathname.indexOf('daily-recommendations') >= 0) {
        apiGetDRProfiles(profileid, dispatch, onLoad);
      } else if (!profileid && txtprofileid) {
        apiGetTxtProfile(txtprofileid, dispatch, onLoad);
      } else {
        onLoad(profileid);
      }
    },
    { caller: 'onProfileInit', allowCache: true, delay: 1 },
  );
};
