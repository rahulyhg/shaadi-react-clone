/* global window */
import types from '../../action_types';
import api from '../../api';
import { clearProfileCaches } from '../lib/utils';
import { encode64 } from './utils';
import errors from '../lib/errors';
import getOtherProfilePhotos from './photoAction/getOtherProfilePhotos';

export default (uid, eoiType, resultType, { dispatch, getState, type, source, self, status, typePrefix }, data = {}, onSuccess, onFail) => {
  if (resultType !== 'dr_ignore') {
    dispatch({ type: types[`${typePrefix || ''}EOI_REQUEST`], payload: { uid, type, source } });
  }
  const profile = getState().profiles[uid] || { uid };
  const stateMetaData = getState().metadata;
  const isPremiumCarousel = ['connect_premium_carousel', 'accept_premium_carousel'].includes(type) || false;
  let premiumCarouselTracking = {};
  if (isPremiumCarousel) {
    premiumCarouselTracking = {
      event_loc: `${stateMetaData.event_loc}_carousel_click`,
      event_loc_ref: encode64(`${stateMetaData.event_loc}_carousel_click`),
      event_referrer: `${stateMetaData.event_referrer}_premiumplus_carousel`,
      event_referrer_ref: encode64(`${stateMetaData.event_referrer}_premiumplus_carousel`),
    };
  }
  const metadata = {
    ...stateMetaData,
    se: profile.se,
    action_source: (source === 'daily-recommendations' && source) || 'profile',
    source,
    event_loc_url: window.location.href,
    ...data.metadata,
    ...premiumCarouselTracking,
    ...data.trackInfo,
    ...premiumCarouselTracking,
  };

  if (eoiType === 'misuse_reported' || eoiType === 'misuse_upload') {
    dispatch({ type: types.REPORT_MODAL_REQUEST, payload: { uid, type, source } });
  }

  data.loadSimilarProfile && dispatch({ type: types.SIMILAR_PROFILE_REQUEST, payload: { similarProfiles: { uid } } });

  return api
    .post('/profile-actions', { uid, type: eoiType, source, ...data, metadata })
    .then(response => {
      clearProfileCaches(uid, self);

      let nextUrl = '';
      if (source !== 'chat') {
        nextUrl = getState().profilePage.pagination.nextUrl || null;
      }

      if (source === 'daily-recommendations') {
        const nextDefaultProfileId = getState().dailyRecommendationPage.recommendations.nextDefaultProfileId;
        nextUrl =
          nextDefaultProfileId !== ''
            ? `/profile/daily-recommendations?profileid=${nextDefaultProfileId}`
            : `/profile/daily-recommendations?from=lastprofile`;
      }

      const misuseReportedData = (response.data.misuse_reported || {}).data || {};
      const helpdeskid = misuseReportedData.helpdeskid || '';
      const payload = { ...data, uid, source, type, [status || 'connectionStatus']: resultType, nextUrl, helpdeskid };

      // get photos of profile being viewed starts here
      if (['accept', 'decline'].includes(eoiType)) {
        const { flags: { canViewPhotosOnConnectOnly, canPremiumMemberViewPhoto } = {} } = profile;
        const needToGetPhotos = canViewPhotosOnConnectOnly || (canPremiumMemberViewPhoto && getState().profiles.self.flags.isFree);
        if (needToGetPhotos) {
          const size = ['medium', 'semilarge', '450X600', '250X310'];
          const queryParams = { profileids: uid, size };
          getOtherProfilePhotos(uid, { dispatch, getState, type, source, params: queryParams });
        }
      }
      // get photos of profile being viewed ends here

      if (onSuccess) {
        onSuccess(payload, response.data);
      } else {
        dispatch({ type: types[`${typePrefix || ''}EOI_SUCCESS`], payload });
      }

      data.loadSimilarProfile && dispatch({ type: types.SIMILAR_PROFILE_SUCCESS, payload: response.data.similarProfile });
      return Promise.resolve(true);
    })
    .catch(error => {
      const message = errors.clean(error);
      const payload = { ...data, uid, source, type, ...message };
      if (onFail) {
        onFail(payload, message);
      } else {
        dispatch({ type: types[`${typePrefix || ''}EOI_FAIL`], payload });
      }
      data.loadSimilarProfile && dispatch({ type: types.SIMILAR_PROFILE_FAIL, payload });
    });
};
