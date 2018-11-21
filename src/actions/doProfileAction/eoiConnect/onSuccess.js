/* eslint camelcase: 0 */
import requestModal from './requestModal';
import types from '../../../action_types';
import alerts from '../../lib/alerts';
import { search as tSearch, profile as tProfile } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';
import localCache from '../../../localCache';

export default (uid, args, params, history) => (payload, response) => {
  const { source, type, self, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };
  const settings = getState().session.settings;
  const accountType = getState().session.accountType;
  if (source === 'profile' || source === 'daily-recommendations') {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'remind':
      case 'remind_confirm': {
        payload.justNowText = 'Reminder sent';
        payload.justNowIcon = 'reminder_sent';
        break;
      }
      case 'cancel_invitation': {
        payload.justNowText = 'Cancelled Invitation';
        payload.justNowIcon = 'invitation_cancelled';
        break;
      }

      case 'skip': {
        payload.justNowText = 'Removed from your recommendations';
        payload.justNowIcon = 'invitation_cancelled';
        break;
      }
    }
  }
  if (type !== 'dr_ignore') {
    localCache.write('eoi', JSON.stringify({ type: types.EOI_SUCCESS, payload }));
    dispatch({ type: types.EOI_SUCCESS, payload });
  }
  const nextUrl = nextProfileUrl(history, source, payload);

  const driveLayerData = response.driveLayer ? response.driveLayer.data[0] || {} : {};
  let moveToNxtProfile = true;

  if (driveLayerData.show === 'Y' && driveLayerData.type === 'payment' && ['accept', 'connect', 'bulkConnect'].includes(type)) {
    const driveLayerDiscount = response.layerDiscount.data.offer_code
      ? ((response.layerDiscount.data.offer_details || [])[0] || {}).value || 0
      : 0;
    const driverLayerOfferDetails = response.layerDiscount.data.offer_details || '';
    if (driveLayerDiscount > 0) {
      const payloadData = {
        ...payload,
        modal: 'firstStep',
        name: profile.name,
        himHer: profile.himHer,
        nextProfileLink: nextUrl,
        connectionType: type,
        discount: driveLayerDiscount ? driveLayerDiscount || 10 : 10,
        offerDetails: driverLayerOfferDetails || '',
      };
      dispatch({ type: types.MODAL_SHOW, payload: payloadData });
      moveToNxtProfile = source === 'daily-recommendations';
    }
  }

  const currentProfile = nextUrl && `/profile${history.location.search}`;
  switch (type) {
    case 'remind':
    case 'remind_confirm': {
      const passwordSent = payload.sendPassword;
      if (nextUrl && moveToNxtProfile) {
        const alertMessage = tProfile.reminder(
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

      const tooltip = tSearch.connect(profile.name, profile.himHer, 'search', self, passwordSent, settings.showUpgradeLinks);
      return !['inbox', 'profile'].includes(source) && alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 8);
    }
    case 'connect':
    case 'connect_premium_carousel':
    case 'connect_with_password':
    case 'connect_confirm': {
      const passwordSent = payload.sendPassword;
      if (nextUrl && moveToNxtProfile) {
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
      const tooltip = tSearch.connect(
        profile.name,
        profile.himHer,
        'search',
        self,
        passwordSent,
        settings.showUpgradeLinks,
        profile.flags.isFiltered,
      );

      const hidePopup = history.location.search.indexOf('vtype=list') !== -1;
      return source !== 'profile' && alerts.show(dispatch, [source, 'eoi', { uid, hidePopup }], tooltip, 8);
    }
    case 'ignore': {
      if (nextUrl) {
        const alertMessage = tProfile.ignored(profile.name, profile.heShe, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
      }
      const tooltip = tSearch.ignored(profile.name, profile.hisHer);
      return source !== 'profile' && alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 8);
    }
    case 'dr_ignore':
    case 'skip': {
      if (nextUrl) {
        const alertMessage = tProfile.ignored(profile.name, profile.heShe, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState, type, source });
      }
      const tooltip = tSearch.ignored(profile.name, profile.hisHer);
      return source !== 'profile' && alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 8);
    }
    case 'accept_premium_carousel':
    case 'accept':
    case 'accept_confirm': {
      const showAcceptMatch =
        getState().session.settings.experiments.accept_success &&
        getState().session.settings.experiments.accept_success.bucket === 'B' &&
        !getState().profiles.self.flags.isPremium &&
        getState().modal.acceptMatch.todayFirstAccept;
      if (getState().profiles[uid].flags.isPremium && params.showMessageLayer && !settings.isBothPartyPayUser) {
        return requestModal(uid, args, { ...params, type: 'accept', showMessageLayer: params.showMessageLayer, nextUrl });
      } else if (nextUrl) {
        const alertMessage = tProfile.accept(
          profile.name,
          profile.himHer,
          currentProfile,
          uid,
          settings.showUpgradeLinks,
          accountType,
          profile.heShe,
        );
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState, source });
      }

      if (showAcceptMatch) {
        const payloadData = {
          modal: 'accept_match',
          uid,
          name: profile.name,
          himHer: profile.himHer,
          hisHer: profile.hisHer,
          profilePhoto: source === 'inbox' || source === 'featured' ? profile.photoMedium : profile.photo,
          history,
          automove: true,
          type: 'sent',
        };
        const cacheKey = 'firstLoad';
        const firstLoad = localCache.read(cacheKey);
        if (firstLoad) {
          const profiles = firstLoad.profiles;
          profiles.push(uid);
          localCache.write(cacheKey, { ...firstLoad, profiles }, 3600 * 24 * 7);
        }
        dispatch({ type: types.MODAL_SHOW, payload: payloadData });
      } else {
        dispatch({ type: types.MODAL_HIDE, payload: { uid } });
      }
      break;
    }
    case 'cancel_invitation':
      if (nextUrl) {
        const alertMessage = tProfile.cancel(profile.name, profile.heShe, currentProfile);
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState, source });
      }
      break;
    default:
      console.log('%c TO DO onSuccess in eoiConnect', 'font-size: 18px', type, source);
  }
  return null;
};
