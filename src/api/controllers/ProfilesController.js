import find from 'lodash/find';

import batchRequestService from '../services/batchRequestService';
import workerRequestService from '../services/workerRequestService';
import requestService from '../services/requestService';
import beaconService from '../services/beaconService';
import ww4 from '../ww4';
import getProfileRequest from '../ww4/getProfileRequest';
import saveContactDetails from '../ww4/saveContactDetails';
import updateAstroRequest from '../ww4/updateAstro';
import trackRegProfile from '../ww4/trackRegProfile';
import putProfile from '../ww4/putProfile';
import decorators from '../decorators';
import profileDecorator from '../decorators/profileDecorator';
import ProfileViewHelper from '../../helpers/ProfileViewHelper';
import { httpResponse } from '../helpers';
import { reduceObj } from '../../utils';

const show = (logger, query, auth, extras = {}) => {
  const { results_id, page, viewed, sort, format, refined_cluster, refined_values, refine_type, request_id, pg_ubt } = query.q || {};
  const q = {
    uid: auth.uid,
    results_id: results_id || '', // eslint-disable-line camelcase
    page: page || 1,
    viewed: viewed || '',
    sort: sort || 'score',
    format: format || 'list',
    refined_cluster,
    refined_values,
    refine_type,
    request_id,
    pg_ubt,
  };
  const request = ww4.profileQueue(q);
  const preferred = {
    relative_url: request.url,
    method: request.method,
    query: request.params,
    body: request.data,
  };
  const requests = {
    profile: ww4.profile(auth.uid, [query.id], query.file_extension),
    trustBadge: ww4.trustBadge(auth.uid, [query.id]),
    ignoredCount: ww4.ignoredCount(auth.uid, [query.id]),
    preferences: ww4.preferences(auth.uid, [query.id]),
  };

  if (q.pg_ubt) {
    requests.profileQueue = preferred;
  }
  return batchRequestService(logger, query, auth, requests, data => {
    const profileViewHelper = new ProfileViewHelper(data);
    if (!profileViewHelper.canViewProfile) {
      return profileViewHelper.getErrorObj();
    }

    const { profile, trustBadge, ignoredCount, preferences = {}, profileQueue } = data;
    const userProfile = profile.data || {};
    const uid = Object.keys(userProfile)[0];
    const photosPayload = {};
    photosPayload[uid] = reduceObj(['account', 'connect', 'intents', 'other', 'photo_details', 'request_count'], userProfile[uid]);
    const { count, intents } = ignoredCount.data || {};
    const { data: { [uid]: preferencesData = {} } = {} } = preferences;
    const { privacy = {} } = preferencesData;
    const member = decorators.profile(undefined, userProfile[uid], {
      trustBadge: trustBadge.data[0],
      ignoredCount: count,
      ignoredDate: ((intents || {})[Object.keys(intents || {})[0]] || {}).record_date || 0,
      preferences: preferencesData,
      privacy,
    });
    const isSameGender =
      member &&
      String(member.gender)
        .toLowerCase()
        .trim() ===
        String(extras.loggedInUserGender)
          .toLowerCase()
          .trim();
    const markProfileAsViewed = query.viewedData && query.viewedData.markViewed && !isSameGender && !member.flags.isMaskedProfile;
    if (markProfileAsViewed) {
      const requestTrack = {
        method: 'post',
        url: `/track/${auth.uid}/events?_debug=mark_profile_viewed`,
        data: {
          type: 'profile_viewed',
          profile_viewed: {
            profileid: Object.keys(userProfile)[0],
            event_referrer: query.viewedData.event_referrer || '',
            device: 'desktop',
            device_os: '',
            platform: `web-${window.location.hostname}`,
            entry_point: query.viewedData.entry_point || 'direct',
            contact_status:
              (userProfile[Object.keys(userProfile)[0]].connect && userProfile[Object.keys(userProfile)[0]].connect.connect_status) || '',
          },
        },
      };
      requestService(logger, query, auth, requestTrack, d => d);
    }

    return {
      ...member,
      profileQueue: profileQueue ? decorators.profileQueue(profileQueue, query.id, q.pg_ubt) : {},
      otherPhotos: decorators.profilePhotos(undefined, { data: photosPayload }),
    };
  });
};

const showMultiple = (logger, query, auth, extras = {}) => {
  const { results_id, page, viewed, sort, format, refined_cluster, refined_values, refine_type, request_id, pg_ubt } = query.q || {};
  const q = {
    uid: auth.uid,
    results_id: results_id || '', // eslint-disable-line camelcase
    page: page || 1,
    viewed: viewed || '',
    sort: sort || 'score',
    format: format || 'list',
    refined_cluster,
    refined_values,
    refine_type,
    request_id,
    pg_ubt,
  };

  const requests = {
    profile: ww4.profile(auth.uid, query.profileids, query.file_extension),
    trustBadge: ww4.trustBadge(auth.uid, query.profileids),
    ignoredCount: ww4.ignoredCount(auth.uid, query.profileids),
    preferences: ww4.preferences(auth.uid, query.profileids),
  };

  if (q.pg_ubt) {
    const pqRequest = ww4.profileQueue(q);
    requests.profileQueue = {
      relative_url: pqRequest.url,
      method: pqRequest.method,
      query: pqRequest.params,
      body: pqRequest.data,
    };
  }

  return workerRequestService(logger, query, auth, requests, data => {
    const { profile, trustBadge, ignoredCount, preferences = {}, profileQueue } = data;
    const userProfile = profile.data || {};
    const profileIds = Object.keys(userProfile);

    const unviewableProfiles = profileIds
      .map(uid => new ProfileViewHelper({ profile: { data: userProfile[uid] } }))
      .filter(profileViewHelper => !profileViewHelper.canViewProfile);

    if (unviewableProfiles.length) {
      return unviewableProfiles[0].getErrorObj();
    }

    const photosPayload = profileIds.reduce(
      (photos, uid) => ({
        ...photos,
        [uid]: reduceObj(['account', 'connect', 'intents', 'other', 'photo_details', 'request_count'], userProfile[uid]),
      }),
      {},
    );

    return {
      profileQueue: profileQueue ? decorators.profileQueue(profileQueue, query.id, q.pg_ubt) : {},
      otherPhotos: decorators.profilePhotos(undefined, { data: photosPayload }),
      profiles: profileIds.map(uid => {
        const { count, intents } = ignoredCount.data || {};
        const { data: { [uid]: preferencesData = {} } = {} } = preferences;
        const { privacy = {} } = preferencesData;
        const member = decorators.profile(undefined, userProfile[uid], {
          trustBadge: find(trustBadge.data, { memberlogin: uid }),
          ignoredCount: count,
          ignoredDate: ((intents || {})[Object.keys(intents || {})[0]] || {}).record_date || 0,
          preferences: preferencesData,
          privacy,
        });

        return member;
      }),
    };
  });
};

const showTxt = (logger, query, auth) => {
  const requests = {
    profile: ww4.profileTxt(auth.uid, [query.id]),
  };
  return batchRequestService(logger, query, auth, requests, data => {
    const profileViewHelper = new ProfileViewHelper(data);
    if (!profileViewHelper.canViewProfile) {
      return profileViewHelper.getErrorObj();
    }
    return {
      uid: profileViewHelper.getUid(),
    };
  });
};

const getBlockedCount = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/intents/${uid}`,
    params: {
      type: query.type,
      fieldset: query.fieldset,
      record_date: query.record_date,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const update = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'put',
    url: `/profiles/${uid}/?_debug=familyGamification`,
    data: {
      data,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const updateAstro = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'put',
    url: `/astro/${uid}/?_debug=astroGamification`,
    data: {
      data,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const getAstro = (logger, params, auth) => {
  const { uid } = auth;
  params.profileids = params.profileids ? params.profileids : uid;
  const url = `/astro/${uid}`;
  const method = 'get';
  const request = {
    method,
    params,
    url,
  };
  return requestService(logger, params, auth, request, d => d);
};

const getConsentStoppageData = (logger, params, auth, extras = {}) => {
  const { uid } = auth;
  const options = { profileFieldSet: ['basic'], photo: { getOnlyPhotos: true, photoSizes: ['120X120'] } };
  return requestService(logger, params, auth, getProfileRequest(uid, uid, options, extras.source, extras), profileDecorator);
};

const getDraftProfileReqObj = ({ uid, method, params = {}, data = {} }) => ({
  method,
  url: `/profiles/${uid}/draft`,
  params,
  data,
});

const getDraftProfile = (logger, params, auth, { xDomain, disableDecorate } = {}) =>
  requestService(
    logger,
    params,
    auth,
    { ...getDraftProfileReqObj({ uid: auth.uid, method: 'get', params }), headers: { 'x-domain': xDomain } },
    disableDecorate ? undefined : decorators.draftProfile,
  );

const updateDraftProfile = (logger, data, query, auth, extras) =>
  requestService(logger, query, auth, getDraftProfileReqObj({ uid: auth.uid, method: 'put', data }));

const getAboutMeTemplate = (logger, params, auth) => {
  const url = `/template/${auth.uid}`;
  const method = 'get';
  const request = {
    method,
    params,
    url,
  };
  return requestService(logger, params, auth, request, d => d.data.about_me);
};

const createProfile = (logger, data, query, auth) => {
  const requests = {};
  requests.phone = saveContactDetails(auth.uid, data.contactData);
  requests.profile = ['phone', putProfile(auth.uid, data.profileData, data.metaData)];
  requests.astro = ['profile', 'phone', updateAstroRequest(auth.uid, data.astroData)];
  const request = {
    method: 'post',
    url: `/batch/auto/${auth.uid}`,
    data: {
      ...requests,
    },
  };
  return requestService(logger, query, auth, request, responseData => responseData)
    .then(responseSuccess => {
      let allRequestsSuccess = true;
      let partialRequestsSuccess = false;
      let allRequestsFailed = false;
      let resolvePromise = false;
      const errors = [];
      Object.keys(responseSuccess.data).every(k => {
        const isSuccess = responseSuccess.data[k].code === 200;
        allRequestsSuccess = allRequestsSuccess && isSuccess;
        partialRequestsSuccess = partialRequestsSuccess || isSuccess;
        allRequestsFailed = allRequestsFailed && !isSuccess;
        if (!isSuccess) {
          const error = responseSuccess.data[k].error;
          try {
            error.jsonMessage = JSON.parse(error.message);
          } catch (e) {} // eslint-disable-line no-empty
          errors.push(error);
        }
        // letting user continue if astro fails
        if (k === 'profile' && isSuccess) {
          resolvePromise = true;
        }
        return true;
      });
      if (resolvePromise) {
        return Promise.resolve(httpResponse(200, responseSuccess));
      }
      return Promise.reject(httpResponse(400, errors));
    })
    .catch(error => Promise.reject(httpResponse(400, error)));
};

const trackProfile = (logger, data, query, auth) => {
  const { putData = {} } = data;
  const { errors = [] } = putData;
  const { uid } = auth;
  const q = {
    uid,
    user: '',
    trackType: (errors.length > 0 && 'txn-user-faced-errors-multiple') || 'form-efficiency',
    ptnr: putData.ptnr || '',
    session_id: putData.sessionId || '',
    field_name: putData.fieldName || '',
    event_name: putData.eventName || '',
    field_value: putData.fieldValue || '',
    errors,
  };
  const request = trackRegProfile(q);
  return requestService(logger, query, auth, request, d => d);
};

const track = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'post',
    url: `/track/${uid}/events?_debug=mark_profile_viewed_dr`,
    data: {
      type: 'profile_viewed',
      profile_viewed: {
        profileid: data.uid,
        event_referrer: data.event_referrer,
        device: 'mobile',
        device_os: '',
        platform: `wap-${window.location.hostname}`,
        entry_point: data.entry_point || 'direct',
      },
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const trackProfileView = (logger, data, query, auth) => {
  if (data.markViewed && data.markViewed !== 'false' && !data.isSameGender) {
    beaconService(auth, {
      method: 'post',
      url: `/track/${auth.uid}/events?_debug=mark_profile_viewed`,
      body: {
        type: 'profile_viewed',
        profile_viewed: {
          profileid: data.uid,
          event_referrer: data.event_referrer,
          device: 'mobile',
          device_os: '',
          platform: `wap-${window.location.hostname}`,
          entry_point: data.entry_point || 'direct',
          contact_status: data.contact_status,
        },
      },
    });
  }
  return Promise.resolve();
};

const getTrustBadgeData = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/profiles/${uid}/badge?profileids=${uid}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const updateTrustBadge = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'put',
    url: `/profiles/${uid}/badge`,
    data,
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  show,
  showMultiple,
  showTxt,
  getBlockedCount,
  update,
  updateAstro,
  getAstro,
  track,
  trackProfileView,
  getConsentStoppageData,
  getDraftProfile,
  updateDraftProfile,
  getAboutMeTemplate,
  createProfile,
  trackProfile,
  updateTrustBadge,
  getTrustBadgeData,
};
