import withAuth from '../withAuth';
import types from '../../action_types';
import apiLayerAction from './apiLayerAction';
import apiChangeMatchesSwitch from './apiChangeMatchesSwitch';
import apiViewHistoryAction from './apiViewHistoryAction';
import apiVerificationRequestAction from './apiVerificationRequestAction';
import apiGetSavedSearchListAction from './apiGetSavedSearchListAction';
import viewRequestAction from './viewRequestAction';
import { GA } from '../lib/utils';
import { profile as tProfile } from '../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../doProfileAction/utils';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const drUrl = wwwBaseUrl => `${wwwBaseUrl}/profile/daily-recommendations?evt_ref=${encode64('daily5_layer')}`;
const pendingUrl = (wwwBaseUrl, uid) => `${wwwBaseUrl}/profile?profileid=${uid}&evt_ref=${encode64('pending_interest_layer')}`;

export default (source, uid, type, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      switch (type) {
        case 'close': {
          const autoMoveParam =
            (getState().profilePage.autoMove.pending && getState().profilePage.autoMove) ||
            (getState().dailyRecommendationPage.autoMove.pending && getState().dailyRecommendationPage.autoMove) ||
            {};

          const { pending: isAutoMovePostPone, nextUrl: nextHref, history: historyObj, profileid } = autoMoveParam;
          if (isAutoMovePostPone) {
            dispatch({ type: types.PROFILE_PREPARE_NEXT, payload: { nextUrl: nextHref, profileid } });
            setTimeout(() => {
              historyObj.push(nextHref);
            }, 1000);
          }
          const modalData = getState().modal;
          const template = source.split('/')[1];
          if (['firstStep'].includes(template)) {
            dispatch({ type: types.MODAL_HIDE });
            const data = { channel: template, connectionType: modalData.firstStep.connectionType || '' };
            return apiLayerAction(uid, template, source, dispatch, getState, data);
          }

          if (['firstPhotoUpload'].includes(template)) {
            dispatch({ type: types.MODAL_HIDE });
            const data = { channel: template };
            return apiLayerAction(uid, template, source, dispatch, getState, data);
          }

          if (['accept_match'].includes(template)) {
            dispatch({ type: types.MODAL_HIDE, payload: { uid } });

            if (!getState().modal.acceptMatch.automove) {
              return null;
            }

            const history = getState().modal.acceptMatch.history;
            const acceptMatch = getState().modal.acceptMatch.source;
            const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them' };
            const settings = getState().session.settings;
            const accountType = getState().session.accountType;
            let nextUrl = getState().profilePage.pagination.nextUrl || null;
            const currentProfile = nextUrl && `/profile${history.location.search}`;
            nextUrl = nextProfileUrl(history, acceptMatch, { nextUrl });
            if (nextUrl) {
              const alertMessage = tProfile.accept(
                profile.name,
                profile.himHer,
                currentProfile,
                uid,
                settings.showUpgradeLinks,
                accountType,
                profile.heShe,
              );
              gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
            }
          }

          if (['contactDetails', 'reportPhoneNo', 'thankYouPage'].includes(template)) {
            dispatch({ type: types.MODAL_HIDE });
            const flash = getState().modal.contactDetails.flash;
            const eoiSent = getState().modal.contactDetails.eoiSent;
            const acceptSent = getState().modal.contactDetails.acceptSent;
            if (flash !== null || (eoiSent !== true && acceptSent !== true)) return null;
            const history = getState().modal.contactDetails.history;
            const contactModalsource = getState().modal.contactDetails.source;
            const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', flags: { contactAction: 'none' } };
            const settings = getState().session.settings;
            const accountType = getState().session.accountType;
            let nextUrl = getState().profilePage.pagination.nextUrl || null;
            const currentProfile = nextUrl && `/profile${history.location.search}`;
            if (contactModalsource === 'daily-recommendations') {
              const nextDefaultProfileId = getState().dailyRecommendationPage.recommendations.nextDefaultProfileId;
              nextUrl =
                nextDefaultProfileId !== ''
                  ? `/profile/daily-recommendations?profileid=${nextDefaultProfileId}`
                  : `/profile/daily-recommendations?from=lastprofile`;
            }

            nextUrl = nextProfileUrl(history, contactModalsource, { nextUrl });
            if (nextUrl && acceptSent) {
              const alertMessage = tProfile.accept(
                profile.name,
                profile.himHer,
                currentProfile,
                uid,
                settings.showUpgradeLinks,
                accountType,
                profile.heShe,
              );
              gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
            }
            if (nextUrl && eoiSent) {
              const alertMessage = tProfile.connect(
                profile.name,
                profile.himHer,
                currentProfile,
                uid,
                settings.showUpgradeLinks,
                accountType,
                profile.heShe,
              );
              gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
            }
            return null;
          }

          if (modalData.template === 'reportMisuse' && modalData.reportMisuse.isUploaderVisible) {
            dispatch({ type: types.REPORT_MODAL_CLOSE, payload: { uid, type, source, dispatch, getState } });
          }

          if (modalData.template === 'profilePhotoUpload') {
            dispatch({ type: types.PROFILE_PHOTO_UPLOAD_MODAL_CLOSE, payload: { uid, type, source, dispatch, getState } });
          }

          return dispatch({ type: types.MODAL_HIDE });
        }
        case 'mostMatchesTourInit': {
          return apiChangeMatchesSwitch(auth.uid, dispatch, getState);
        }
        case 'showWatermarkInfo':
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'watermark' } });
        case 'showInterestModal': {
          const state = getState();
          const interestsAndMore = state.profilePage.item.interestsAndMore;
          return dispatch({
            type: types.MODAL_SHOW,
            payload: { modal: 'interests', items: interestsAndMore },
          });
        }
        case 'viewDailyRecommendationsProfile':
        case 'viewDailyRecommendations': {
          setTimeout(() => {
            window.location = drUrl(getState().config.app.wwwBaseUrl);
          }, 120);
          setTimeout(() => {
            dispatch({ type: types.MODAL_HIDE });
          }, 240);
          GA.trackDailyClick();
          return null;
        }
        case 'dontViewDailyRecommendations': {
          dispatch({ type: types.MODAL_HIDE });
          GA.trackNotDailyClick();
          return null;
        }
        case 'pendingInterestRespondNowName':
        case 'pendingInterestRespondNowPhoto':
        case 'pendingInterestRespondNow': {
          setTimeout(() => {
            window.location = pendingUrl(getState().config.app.wwwBaseUrl, uid);
          }, 120);
          setTimeout(() => {
            dispatch({ type: types.MODAL_HIDE });
          }, 240);
          GA.trackPendingClick();
          return null;
        }
        case 'PendingInterestCancel': {
          dispatch({ type: types.MODAL_HIDE });
          GA.trackNotPendingClick();
          return null;
        }
        case 'view_history': {
          dispatch({ type: types.MODAL_SHOW, payload: { modal: 'history', display_name: getState().profiles[uid].name } });
          apiViewHistoryAction(source, uid, type, args, dispatch, getState);
          return null;
        }
        case 'saveSearch': {
          apiGetSavedSearchListAction(uid, args, dispatch, getState);
          return null;
        }
        case 'view_request': {
          dispatch({ type: types.MODAL_SHOW, payload: { modal: 'request', display_name: getState().profiles[uid].name } });
          viewRequestAction(uid, dispatch, getState);
          return null;
        }
        case 'sendVerificationRequest': {
          apiVerificationRequestAction(uid, args, dispatch, getState);
          return null;
        }
        case 'photoGuidelines': {
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'photoGuidelines', source } });
        }
        case 'deletePhotoConfirmation': {
          const { photo, index, onDelete } = args[0];
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'deletePhotoConfirmation', source, photo, index, onDelete } });
        }
        case 'simpleMessage': {
          const { title, content } = args[0];
          return dispatch({ type: types.MODAL_SHOW, payload: { ...args[0], modal: 'simpleMessage', source, title, content } });
        }
        case 'chatNow': {
          const stateData = getState();
          dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'premiumProposition',
              display_uid: uid,
              display_name: stateData.profiles[uid].name,
              display_photo: stateData.profiles[uid].thumbnail,
              offer_details: stateData.session.settings.offer_details,
            },
          });
          return null;
        }
        case 'contactReportPhoneNo':
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'reportPhoneNo', source, uid, args } });
        case 'aboutMeSuggestion':
          return dispatch({ type: types.MODAL_SHOW, payload: { modal: 'aboutMeSuggestion', source, uid, args } });
        default:
          console.log('TO DO doModalAction', type, { source, uid, args, self: auth.uid });
          return null;
      }
    },
    { caller: 'doModalAction', allowCache: true, delay: 1 },
  );
};
