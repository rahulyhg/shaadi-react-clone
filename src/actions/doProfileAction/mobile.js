import { parse } from 'qs';
import withAuth from '../withAuth';
import types from '../../action_types';
import doMobileModalAction from '../doModalAction/mobile';
import doPreferredSearch from '../doPreferredSearch';
import eoiContact from './eoiContact';
import photoAction from './photoAction';
import eoiConnect from './eoiConnect';
import eoiShortlist from './eoiShortlist';
import eoiDecline from './eoiDecline';
import eoiBlock from './eoiBlock';
import eoiInterface from './eoiInterface';
import changeSettings from '../doChatAction/changeSettings';
import { gotoNextProfile, nextProfileUrl, delayPushHistory } from './utils';
import trackProfileView from './trackProfileView';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  // const { wwwBaseUrl } = getState().config.app;
  withAuth(
    ({ auth }, history) => {
      const params = { source, self: auth.uid, type, dispatch, getState, history };
      const currentUID = args[0];

      // push history only when user has not moved on to the next profile
      const pushHistory = () => {
        if (getState().profilePage.collection.uid === currentUID) {
          const prevUrl = nextProfileUrl(history, 'profile', {
            nextUid: currentUID,
          });
          prevUrl && history.push(prevUrl);
        }
      };

      const dispatchMoveCollection = () => {
        dispatch({
          type: types.COLLECTION_MOVE,
          payload: { uid: currentUID },
        });
      };

      switch (type) {
        case 'showCommonInterests':
          return doMobileModalAction(source, uid, 'commonInterests', ...args)(dispatch, getState);
        default:
      }

      const { session } = getState();

      console.log(`%c Profile action: ${type}`, 'color: blue; font-size: 24px;', { source, uid, type }, args);

      switch (type) {
        case 'destroy_collection': {
          return dispatch({ type: types.COLLECTION_DESTROY, payload: {} });
        }
        case 'onFacetChange': {
          const updatedFacet = currentUID;
          const cluster = updatedFacet.id;
          const values = updatedFacet.options.filter(i => i.isSelected).map(i => i.value);
          if (!values.length) {
            return false;
          }

          return doPreferredSearch(window.location.pathname, parse(window.location.search.slice(1)), false, { cluster, values })(
            dispatch,
            getState,
          );
        }
        case 'closeProfileTooltip':
        case 'closeEoiTooltip':
        case 'closeAllTooltips':
        case 'closePhotoTooltip':
          return eoiInterface(uid, args, params);
        case 'request_photo_mobile':
        case 'request_password_mobile':
          return photoAction(uid, args, params);
        case 'report_misuse_confirm_mobile': {
          const stateData = getState();
          return dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'reportMisuse',
              uid,
              name: stateData.profiles[uid].name,
              fullScreen: true,
            },
          });
        }
        case 'show_album_mobile': {
          const stateData = getState();
          const profile = stateData.profiles[uid];
          const selfProfile = stateData.profiles.self;
          const isPhotoGamified = selfProfile.photos.status === 'add_photo' && !selfProfile.flags.isPremium;
          if (!profile) return console.log('ERROR, profile not found', uid);
          const album =
            profile.detailed.album.length >= profile.summary.gridAlbum.length ? profile.detailed.album : profile.summary.gridAlbum;
          const isConnectBtnVisible = profile.flags.connectionStatus === 'default';
          return dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'album',
              uid,
              album,
              fullScreen: true,
              isConnectBtnVisible,
              isPhotoGamified,
            },
          });
        }
        case 'blockConfirm_mobile':
          return dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'blockProfile',
              uid,
              himHer: getState().profiles[uid].himHer,
            },
          });
        case 'report_misuse_mobile_confirm':
          return doMobileModalAction(source, uid, 'reportMisuseConfirm', ...args)(dispatch, getState);
        case 'report_misuse_mobile':
          return eoiBlock(uid, args, params);
        case 'unblock_mobile':
        case 'block_mobile':
          return eoiBlock(uid, args, params);
        case 'removeFromShortlist_mobile':
        case 'addToShortlist_mobile':
          return eoiShortlist(uid, args, params);
        case 'connect_mobile':
        case 'accept_mobile':
        case 'connect_confirm':
        case 'ignore_mobile':
        case 'remind_mobile':
        case 'cancel_mobile':
          return eoiConnect(uid, args, params);
        case 'delete_mobile':
        case 'decline_mobile':
          return eoiDecline(uid, args, params);
        case 'contact_mobile_confirm': {
          const { settings: { isPaidUser } } = session;
          const stateData = getState();
          const profile = stateData.profiles[uid];
          if (!profile) return console.log('ERROR, profile not found', uid);
          if (!isPaidUser) {
            return dispatch({
              type: types.MODAL_SHOW,
              payload: {
                modal: 'premiumProposition',
                display_uid: uid,
                display_name: profile.name,
                display_photo: profile.thumbnail,
                offer_details: stateData.session.settings.offer_details,
              },
            });
          }
          return dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'viewContactConfirm',
              display_name: profile.name,
              uid,
            },
          });
        }
        case 'refineSearchClick': {
          const stateData = getState();
          const { preferredSearch: { facetBar } } = stateData;
          return dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'facetBar',
              facetBar,
              fullScreen: true,
              uid,
            },
          });
        }
        case 'sendVerificationRequest':
          return doMobileModalAction(source, uid, type, ...args)(dispatch, getState);
        case 'sendSms':
        case 'contactDetails':
          return eoiContact(uid, args, params);
        case 'chatNow': {
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

          if (openToChat) {
            history.push(`/inbox/chats/history/pid/${uid}`);
            return null;
          }
          /* return window.open(`${wwwBaseUrl}/payment?loc=profile&profileid=${uid}&source=profile_chatnow`); */

          return doMobileModalAction(source, uid, type, ...args)(dispatch, getState);
        }
        case 'view_contact_ok_mobile': {
          dispatch({ type: types.MODAL_HIDE });
          const { profilePage: { pagination: { nextUrl } } } = getState();
          if (nextUrl) {
            return gotoNextProfile({ history, dispatch, getState, nextUrl, toastMessage: 'Invitation Sent!' });
          }
          return null;
        }
        case 'loadNextSwipe': {
          dispatch({ type: types.PROFILE_QUEUE_PREDICT, payload: { direction: 'next', uid } });
          return null;
        }
        case 'loadPrevSwipe': {
          dispatch({ type: types.PROFILE_QUEUE_PREDICT, payload: { direction: 'prev', uid } });
          return null;
        }
        case 'clear_JustNow': {
          dispatch({ type: types.EOI_JUSTNOW_RESET, payload: { uid, source } });
          return null;
        }
        case 'trackView': {
          if (source === 'daily-recommendations') {
            const metadata = getState().metadata;
            return trackProfileView(uid, args, { ...params, source, metadata });
          }
          return null;
        }
        case 'moveNextProfile': {
          dispatchMoveCollection();

          const { uid: prevUID } = getState().profilePage.collection;
          delayPushHistory(prevUID, currentUID, () => pushHistory());

          const profiles = Object.keys(getState().profiles);
          if (!profiles.includes(currentUID)) pushHistory();

          return null;
        }
        case 'movePrevProfile': {
          return dispatchMoveCollection();
        }
        case 'unhide_profile':
          history.push('/my-shaadi/my-account/hide-delete-account');
          return null;
        default:
          console.log('TO DO doProfileAction/mobile', type, { source, uid, args, self: auth.uid });
          return null;
      }
    },
    { caller: 'doProfileAction/mobile', allowCache: true, delay: 1 },
  );
};
