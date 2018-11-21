import batchRequestService from '../services/batchRequestService';
import requestService from '../services/requestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const index = (logger, query, auth) => {
  const { uid } = auth;
  const { pid, fileExtension, metadata } = query;
  const request = {};
  request.profile = ww4.profile(uid, [pid], fileExtension);
  return batchRequestService(logger, query, auth, request, response => {
    const profileData = decorators.profile(undefined, response.profile.data[pid]);
    const photosData = decorators.photosAlbum(pid, response.profile.data[pid].photo_details, '_nb');
    const requestTrack = {
      method: 'post',
      url: `/track/${auth.uid}/events?_debug=mark_profile_viewed`,
      data: {
        type: 'profile_viewed',
        profile_viewed: {
          profileid: pid,
          event_referrer: metadata.event_referrer || '',
          device: 'desktop',
          device_os: '',
          platform: `web-${window.location.hostname}`,
          entry_point: 'direct',
          contact_status: (profileData.connect && profileData.connect.connect_status) || '',
        },
      },
    };
    requestService(logger, query, auth, requestTrack, d => d);

    return {
      photosData,
      profileData,
    };
  });
};

export default {
  index,
};
