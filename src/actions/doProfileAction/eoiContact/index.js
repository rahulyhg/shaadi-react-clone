import types from '../../../action_types';
import contactModal from './contactModal';
import apiGetDefaultDraft from '../apiGetDefaultDraft';
import apiContactLookup from './apiContactLookup';
import apiSendSms from './apiSendSms';
import apiEoiRefreshProfile from './apiEoiRefreshProfile';
import onFail from '../eoiConnect/onFail';
import { profile as tProfile } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params) => {
  const { source, type, dispatch, getState, history } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', flags: { contactAction: 'none' } };
  const template = getState().modal.template;
  const settings = getState().session.settings;
  console.log('%c contactAction', 'color: green; font-size: 20px', profile.flags.contactAction);

  if (!['contact', 'sendSms', 'getSmsProfileContactDetail'].includes(type)) {
    console.log('%c TO DO contactAction', 'font-size: 18px', type, source);
    return null;
  }

  if (type === 'getSmsProfileContactDetail') {
    if (!settings.isMobileVerified) {
      return contactModal(uid, params, { status: 'logger_mobile_unverified' });
    }
  }

  if (type === 'sendSms') {
    const { charactersLeft, includeMobileNo, message } = args[0] || {};
    const data = {
      counter: charactersLeft,
      chkMobileNumber: includeMobileNo ? 'on' : 'off',
      message,
    };
    const onSuccess = () => {
      apiEoiRefreshProfile(uid, type, source, dispatch, onFail);
      setTimeout(() => dispatch({ type: types.MODAL_HIDE }), 750);

      if (template === 'contactDetails' && ['profile', 'daily-recommendations'].includes(source)) {
        const { eoiSent, acceptSent } = getState().modal.contactDetails;
        const accountType = getState().session.accountType;

        let nextUrl = getState().profilePage.pagination.nextUrl || null;
        const currentProfile = nextUrl && `/profile${history.location.search}`;

        if (source === 'daily-recommendations') {
          const nextDefaultProfileId = getState().dailyRecommendationPage.recommendations.nextDefaultProfileId;
          nextUrl =
            nextDefaultProfileId !== ''
              ? `/profile/daily-recommendations?profileid=${nextDefaultProfileId}`
              : `/profile/daily-recommendations?from=lastprofile`;
        }

        nextUrl = nextProfileUrl(history, source, { nextUrl });
        let alertMessage = '';
        if (nextUrl && acceptSent) {
          alertMessage = tProfile.accept(
            profile.name,
            profile.himHer,
            currentProfile,
            uid,
            settings.showUpgradeLinks,
            accountType,
            profile.heShe,
          );
        }
        if (nextUrl && eoiSent) {
          alertMessage = tProfile.connect(
            profile.name,
            profile.himHer,
            currentProfile,
            uid,
            settings.showUpgradeLinks,
            accountType,
            profile.heShe,
          );
        }
        gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
        return null;
      }

      return null;
    };

    return apiSendSms(uid, params, data, onSuccess);
  }
  switch (profile.flags.contactAction) {
    case 'tobescreened_member_status':
      return contactModal(uid, params, {
        status: 'showFlash',
        flash:
          'Your profile on Shaadi.com is currently under screening. You will be able to View/Request phone numbers of other Members once your profile is activated.',
      });
    case 'free':
    case 'available':
    case 'availableOnVerification':
    case 'availableOnVerificationRequested':
    case 'availableOnRequest':
    case 'filtered':
    case 'lockedMemberAccepted':
    case 'locked':
    case 'showToFreeAndPremium': {
      if (!profile.flags.canCommunicate && profile.flags.contactAction === 'free') {
        return contactModal(uid, params, { status: 'free' });
      }
      contactModal(uid, params, { loading: true, disabled: true });

      const onSuccess = ({ eoiSent, acceptSent }) => {
        if (!eoiSent && !acceptSent) return null;
        apiEoiRefreshProfile(uid, type, source, dispatch, onFail, 'available');
        return null;
      };

      const onLookupFail = payload => {
        if (['filtered'].includes(payload.error.message)) {
          contactModal(uid, params, { status: 'filtered' });
        } else {
          payload.self = params.self;
          payload.profile = profile;
          dispatch({ type: types.CONTACT_EOI_FAIL, payload });
        }
      };

      apiGetDefaultDraft('contact', uid, params);
      apiContactLookup(uid, params, onSuccess, onLookupFail);
      return null;
    }
    case 'member_blocked':
      return contactModal(uid, params, { status: 'member_blocked' });
    case 'profile_declined':
      return contactModal(uid, params, { status: 'profile_declined' });
    case 'profileCancelled':
      return contactModal(uid, params, { status: 'profileCancelled' });
    case 'none':
    default:
      return null;
  }
};
