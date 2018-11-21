import withAuth from '../withAuth';
import types from '../../action_types';
import doModalAction from '../doModalAction';
import eoiBlock from './eoiBlock';
import eoiConnect from './eoiConnect';
import autoMove from './autoMove';
import eoiContact from './eoiContact';
import eoiDraft from './eoiDraft';
import eoiShortlist from './eoiShortlist';
import eoiInterface from './eoiInterface';
import eoiDecline from './eoiDecline';
import photoAction from './photoAction';
import horoscopeAction from './horoscopeAction';
import doChatWindowAction from '../doChatAction/doChatWindowAction';
import doGamificationAction from './gamificationAction';
import benefitAction from './benefitAction';
import sendPremiumMessage from './sendPremiumMessage';
import sendConsultation from './sendConsultation';
import consultationAction from './consultationAction';
import trackGetFreeConsultation from './trackGetFreeConsultation';
import apiPostSavedSearch from './apiPostSavedSearch';
import alerts from '../lib/alerts';
import searchAction from './searchAction';
import getPhotos from './photoAction/getPhotos';
import getRejectedAlbumPhotos from './photoAction/getRejectedAlbumPhotos';
import updatePhoto from './photoAction/updatePhoto';
import deletePhoto from './photoAction/deletePhoto';
import getAstro from './astroAction/getAstro';
import changeSettings from '../doChatAction/changeSettings';
import getProfilePreferencePrivacy from './getProfilePreferencePrivacy';
import updateProfilePreferencePrivacyPhoto from './updateProfilePreferencePrivacyPhoto';
import resetProfile from './resetProfile';
import apiPostReportPhoneMisuse from './apiPostReportPhoneMisuse';
import contactSummaryViewSms from './contactSummaryViewSms';
import sendConsent from './sendConsent';
import getExperiment from './getExperiment';
import getSmsProfileContactDetail from './getSmsProfileContactDetail';
import doDaTracking from '../doDaTracking';
import getProfilePhoto from './getProfilePhoto';
import getRegPhotoProfile from './getRegPhotoProfile';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  const { app: { wwwBaseUrl } } = getState().config;
  withAuth(
    ({ auth }, history) => {
      const isSelf = auth.uid === uid;
      const params = { source, self: auth.uid, type, dispatch, getState, history };
      switch (type) {
        case 'showWatermarkInfo':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'showInterestModal':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'view_history':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'saveSearch':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'view_request':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'sendVerificationRequest':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        default:
      }

      const { session } = getState();

      console.log(`%c Profile action: ${type}`, 'color: blue; font-size: 24px;', { source, uid, type }, args);

      switch (type) {
        case 'showHoroscope':
          return horoscopeAction(uid, args, params);
        case 'requestPhoto':
        case 'requestPassword': {
          doDaTracking(source, 'photo_request', uid)(dispatch, getState);
          return photoAction(uid, args, params);
        }
        case 'sendSms':
          return eoiContact(uid, args, params);
        case 'contact': {
          doDaTracking(source, 'view_contact', uid)(dispatch, getState);
          return eoiContact(uid, args, params);
        }
        case 'ignore':
        case 'connect':
        case 'connect_with_password':
        case 'connect_confirm':
        case 'bulkConnect':
        case 'bulkConnect_confirm':
        case 'accept':
        case 'accept_premium_carousel':
        case 'accept_confirm':
        case 'remind':
        case 'remind_confirm':
        case 'cancel_invitation':
        case 'connect_premium_carousel':
        case 'skip':
        case 'dr_ignore':
          return eoiConnect(uid, args, params);
        case 'block':
        case 'block_confirm':
        case 'reportMisuse':
        case 'reportMisuse_confirm':
        case 'reportMisuse_upload':
        case 'reportMisuse_uploadAttachment':
        case 'reportMisuse_uploadReset':
        case 'reportMisuse_close':
        case 'unblock':
          return eoiBlock(uid, args, params);
        case 'createShortlist':
        case 'loadShortlist':
        case 'addToShortlist':
          return eoiShortlist(uid, args, params);
        case 'newDraft':
        case 'modifyDraft':
        case 'reloadDrafts':
        case 'loadDrafts':
          return eoiDraft(uid, args, params);
        case 'freezeSearch':
        case 'freezeInboxSearch':
        case 'freezeOtherSearch':
        case 'hideNotificationsToast':
        case 'closeAllTooltips':
        case 'closeProfileTooltip':
        case 'closeEoiTooltip':
        case 'closePhotoTooltip':
          return eoiInterface(uid, args, params);
        case 'sendEmail': {
          doDaTracking(source, 'write_message', uid)(dispatch, getState);
          let isPremiunFlagNConnectMsg = false;
          const getStateInfo = getState();
          const { settings } = session;
          const freeProfile = source === 'profile' && !settings.isPaidUser;
          let openChat = settings.isPaidUser;

          if (freeProfile) {
            const connectionStatus = getStateInfo.profiles[uid].flags.connectionAction;
            const connectMsg = getStateInfo.profilePage.item.connectMessages;
            const chats = getStateInfo.chat.sidebar.chats.filter(i => i.uid === uid)[0];
            isPremiunFlagNConnectMsg =
              getStateInfo.profiles[uid].flags.isPremium &&
              (connectMsg[0] && connectMsg[0].message && connectMsg[0].message.length > 0) &&
              connectionStatus === 'member_accepted';

            openChat = chats !== undefined || isPremiunFlagNConnectMsg;
          }

          if (openChat) {
            const chatStatus = (getStateInfo.chat.settings && getStateInfo.chat.settings.status) || '';
            if (chatStatus === 'offline') {
              const out = window.confirm('Are you sure you want to go online?'); // eslint-disable-line no-alert
              if (!out) {
                return false;
              }
              changeSettings(auth, ['status', 'online'], params);
            }
            return benefitAction(uid, args, params);
          }
          return window.open(
            `${wwwBaseUrl}/payment?loc=profile&profileid=${uid}&source=acceptedprofile_sendemail&profile_type=profile_accepted`,
          );
        }
        case 'chatNow': {
          doDaTracking(source, 'chat', uid)(dispatch, getState);
          const getStateInfo = getState();
          const { settings } = session;
          const chatStatus = (getStateInfo.chat.settings && getStateInfo.chat.settings.status) || '';

          if (chatStatus === 'offline') {
            const out = window.confirm('Are you sure you want to go online?'); // eslint-disable-line no-alert
            if (!out) {
              return false;
            }
            changeSettings(auth, ['status', 'online'], params);
          }

          let openToChat = settings.isPaidUser;
          let isPremiunFlagNConnectMsg = false;
          const freeProfile = source === 'profile' && !settings.isPaidUser;
          const profilePageBucket = settings.experiments.profilepage_revamp_abc.bucket || 'A';
          if (!['B', 'C'].includes(profilePageBucket)) {
            if (freeProfile) {
              const connectionStatus = getStateInfo.profiles[uid].flags.connectionAction;
              const connectMsg = getStateInfo.profilePage.item.connectMessages;
              const chats = getStateInfo.chat.sidebar.chats.filter(i => i.uid === uid)[0];
              isPremiunFlagNConnectMsg =
                getStateInfo.profiles[uid].flags.isPremium &&
                (connectMsg[0] && connectMsg[0].message && connectMsg[0].message.length > 0) &&
                connectionStatus === 'member_accepted';

              openToChat = chats !== undefined && isPremiunFlagNConnectMsg;
            }
          }
          if (!settings.isPaidUser) {
            openToChat =
              !openToChat && getStateInfo.profiles[uid].flags.canCommunicate && !getStateInfo.session.settings.isBothPartyPayUser;
          }

          if (openToChat) {
            return doChatWindowAction(uid, ['open'], params);
          }
          /* return window.open(`${wwwBaseUrl}/payment?loc=profile&profileid=${uid}&source=profile_chatnow`); */

          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        }
        case 'delete':
        case 'decline_confirm':
        case 'decline_with_message':
        case 'decline_with_delete':
        case 'decline':
          return eoiDecline(uid, args, params);
        case 'onFamilyGamificationSubmit':
          return doGamificationAction('onFamilyGamificationSubmit', uid, args, params);
        case 'onAstroGamificationSubmit':
          return doGamificationAction('onAstroGamificationSubmit', uid, args, params);
        case 'onTopToastClose':
          return alerts.hide(dispatch, ['profile', ['topToast']]);
        case 'onToastClose':
          return alerts.hide(dispatch, ['profile', ['toast']]);
        case 'send_message':
          return sendPremiumMessage(uid, args, params);
        case 'auto_move': {
          return autoMove(uid, args, params);
        }
        case 'callConsultant':
        case 'callConsultantInvited':
          return consultationAction(uid, args, params);
        case 'send_consultation':
          return sendConsultation(uid, args, params);
        case 'trackGetFreeConsultation':
          return trackGetFreeConsultation(uid, args, params);
        case 'viewAlbum':
          return photoAction(uid, args, params);
        case 'submitSavedSearch':
          params.key = getState().otherSearch.results.results_id;
          return apiPostSavedSearch(uid, args, params);
        case 'drThankyouRedirection':
          if (args[0] && args[0].nexturl) {
            history.push(args[0].nexturl);
            dispatch({ type: types.UPDATE_NAV, payload: { url: args[0].nexturl } });
          }
          break;
        case 'search_action':
          return searchAction(uid, args, params);
        case 'getAstro':
          return getAstro(uid, args, params, args[0] || {});
        case 'getUserPhotos': {
          const size = params.size || ['small', 'medium', '150X200', '250X310'];
          const queryParams = { size };
          return getPhotos(uid, args, params, queryParams);
        }
        case 'getRejectedAlbumPhotos': {
          return getRejectedAlbumPhotos(uid, args, params);
        }
        case 'updateUserPhoto':
          return updatePhoto(uid, args, params, args[0] || {}, args[1] || {});
        case 'deleteUserPhoto':
          return deletePhoto(uid, args, params, args[0] || {});
        case 'getProfilePreferencePrivacy':
          return getProfilePreferencePrivacy(uid, args, params, args[0] || {});
        case 'updateProfilePreferencePrivacyPhoto':
          return updateProfilePreferencePrivacyPhoto(uid, args, params, args[0] || {}, args[1] || {});
        case 'resetProfile':
          return resetProfile(uid, args, params);
        case 'reportPhoneMisuse':
          return apiPostReportPhoneMisuse(uid, args, params);
        case 'contactReportPhoneNo':
          return doModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'contactSummaryViewSms':
          return contactSummaryViewSms(uid, args, params);
        case 'sendConsent':
          return sendConsent(uid, args, { ...params, data: args[0] || {} });
        case 'getExperiment':
          return getExperiment(uid, args, params);
        case 'getSmsProfileContactDetail': {
          const settings = getState().session.settings;
          if (!settings.isMobileVerified) {
            return eoiContact(uid, args, params);
          }
          return getSmsProfileContactDetail(uid, args, params);
        }
        case 'getProfilePhoto':
          return getProfilePhoto(uid, undefined, { ...params, isSelf });
        case 'getRegPhotoProfile':
          return getRegPhotoProfile(uid, undefined, { ...params, isSelf });
        default:
          return null;
      }
      return false;
    },
    { caller: 'doProfileAction', allowCache: true, delay: 1 },
  );
};
