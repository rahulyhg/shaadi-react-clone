import ww4 from '../ww4';
import decorators from '../decorators';
import batchRequestService from '../services/batchRequestService';
import requestService from '../services/requestService';
import { GA } from '../../actions/lib/utils';

const show = (logger, query, auth) => {
  const { uid } = auth;
  const { file_extension } = query;
  const selfPhotosReq = {
    method: 'get',
    relative_url: `/photo/${uid}`,
    query: {
      photo_options: {
        fieldset: ['count', 'photos'],
        profile_photo: true,
        size: ['small', 'medium', 'semilarge', '120X120', '450X600', '250X310'],
        blur: true,
        thumb_param: '_nb',
        file_extension,
      },
    },
  };
  const batchRequests = {
    self: ww4.profile(uid, [uid]),
    selfPhotos: selfPhotosReq,
    membership: ww4.membership(uid),
    shortlists: ww4.shortlists(uid),
    privacy: ww4.privacy(uid),
    offers: ww4.userDiscount(uid),
  };

  batchRequests.contactDetails = {
    method: 'get',
    relative_url: `/contacts/${uid}`,
    query: {
      profileids: uid,
      fieldset: 'details',
    },
  };

  batchRequests.experiments = {
    method: 'get',
    relative_url: `/config/user/${uid}`,
    query: {
      fieldset: 'experiment',
    },
  };

  batchRequests.appLanguage = {
    method: 'get',
    relative_url: `/preferences/${uid}`,
    query: {
      profileids: uid,
      fieldset: 'display_settings',
    },
  };

  return batchRequestService(
    logger,
    query,
    auth,
    batchRequests,
    data => {
      const { self, membership, shortlists, privacy, selfPhotos, contactDetails, experiments, offers, appLanguage } = data;

      const selfPhotoDetails = {};
      selfPhotoDetails.count = selfPhotos.data[uid].count;
      selfPhotoDetails.photos = selfPhotos.data[uid].photos;
      selfPhotoDetails.status = selfPhotos.data[uid].status;

      const profileData = (self.data && self.data[Object.keys(self.data)[0]]) || {};
      profileData.photo_details = selfPhotoDetails;
      profileData.contact_details = contactDetails;

      const privacyData = privacy.data[Object.keys(privacy.data)[0]];
      GA.setLoggerVar(profileData);
      const contactDetailsData = contactDetails.data[Object.keys(contactDetails.data)[0]];

      const appLanguageData = appLanguage.data[Object.keys(appLanguage.data)[0]];

      const shortListCount = (shortlists.data && shortlists.data.count) || 0;

      const returnArr = {
        auth: decorators.auth(auth, membership.data),
        settings: decorators.me(undefined, profileData, contactDetailsData),
        self: decorators.profile(undefined, profileData, privacyData),
        shortlists: decorators.shortlists(undefined, shortlists.data),
        experiments: decorators.experiments(undefined, experiments.data),
        offers: decorators.offers(undefined, offers.data),
        multilingual: decorators.multilingual(undefined, appLanguageData),
      };
      if (shortListCount === 0) {
        const createReq = {
          method: 'post',
          url: `/shortlists/${uid}`,
          data: {
            data: {
              list_name: 'My 1st List',
            },
          },
        };
        requestService(logger, query, auth, createReq, d => {
          if (d.data && d.data.id) {
            const shortlistResult = {
              count: 1,
              lists: [
                {
                  listid: d.data.id,
                  list_name: 'My 1st List',
                },
              ],
            };
            returnArr.shortlists = decorators.shortlists(undefined, shortlistResult);
          }
        });
      }
      return returnArr;
    },
    data => {
      const { self, membership, shortlists } = data;
      const profileData = self.data && self.data[Object.keys(self.data)[0]];
      if (profileData && membership.data && shortlists.data) {
        return null;
      }
      return {
        code: 'no_self_profile',
        message: 'Could not load settings.',
      };
    },
  );
};

const getExperiment = (logger, query, auth) => requestService(logger, query, auth, ww4.getExperiment(auth.uid));

export default {
  show,
  getExperiment,
};
