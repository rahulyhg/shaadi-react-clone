import types from '../../action_types';

const initialState = {
  defaultSearchFormat: 'list',
  isPaidUser: false,
  showUpgradeBanner: false,
  canAccessChat: false,
  canInitiateChat: false,
  hasUploadedPhoto: true,
  canConnectWithMessage: false,
  showUpgradeLinks: true,
  canSendPasswordOnConnect: false,
  contactsTotal: 0,
  contactsRemaining: 0,
  isUnderScreening: false,
  isAstroGamified: false,
  gender: 'none',
  canViewCollegeAndEmployer: false,
  canViewHoroscope: false,
  horoscopeStyle: 'l/ENG/hs/1',
  isFamilyGamified: false,
  isHidden: false,
  isBothPartyPayUser: false,
  isMobileVerified: false,
  mobileNumber: '',
  mobileCountry: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UNAUTH:
      return {
        ...initialState,
      };
    case types.CONTACT_EOI_SUCCESS: {
      return {
        ...state,
        contactsTotal: action.payload.contacts_total || state.contactsTotal,
        contactsRemaining:
          action.payload.contacts_remaining ||
          (action.payload.contactDeduction === true ? state.contactsRemaining - 1 : state.contactsRemaining),
      };
    }
    case types.SESSION_CACHE: {
      const { experiments } = action.payload;
      return {
        ...state,
        experiments: experiments.experiments || experiments,
      };
    }
    case types.EDIT_PROFILE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        isFamilyGamified: !(data && data.family && data.family.mother_profession.length > 0 && data.family.father_profession.length > 0),
      };
    }
    case types.SESSION_SUCCESS: {
      const { auth, self, settings, experiments, offers } = action.payload;
      return {
        ...state,
        defaultSearchFormat: self.flags.isNri ? 'grid' : 'list',
        canAccessChat: self.flags.activeStatus === 'default',
        wasPaidUser: auth.membership.indexOf('was') !== -1,
        expiryDate: auth.expiryDate || '',
        isPaidUser: self.flags.membershipLevel !== 'Free',
        hasUploadedPhoto: self.flags.albumStatus !== 'noPhoto',
        canConnectWithMessage: self.flags.membershipLevel !== 'Free',
        canInitiateChat: self.flags.membershipLevel !== 'Free',
        showUpgradeBanner: self.flags.membershipLevel === 'Free',
        showUpgradeLinks: self.flags.membershipLevel === 'Free',
        isUnderScreening: self.flags.activeStatus === 'toBeScreened',
        contactsTotal: auth.sms.balance + auth.sms.viewed,
        contactsRemaining: auth.sms.balance,
        canSendPasswordOnConnect: self.flags.albumStatus === 'requestPassword',
        horoscopeStyle: self.flags.horoscopeStyle,
        gender: self.gender,
        canViewHoroscope: self.flags.isHoroscopeApplicable,
        isNri: self.flags.isNri,
        isHidden: self.flags.isHidden,
        isIndianDiaspora: self.flags.isIndianDiaspora,
        canViewCollegeAndEmployer: self.flags.membershipLevel !== 'Free',
        isFamilyGamified: self.flags.isFamilyGamified,
        isAstroGamified: self.flags.isHoroscopeApplicable && !self.flags.isAstroReady,
        isBothPartyPayUser: self.flags.isBothPartyPayUser,
        isMobileVerified: settings.isMobileVerified,
        experiments: experiments.experiments || experiments,
        membershipTags: self.flags.membershipTags || 'free',
        mobileNumber: settings.mobileNumber,
        mobileCountry: settings.mobileCountry,
        offerCode: offers.offer_code || '',
        offer_details: offers.offer_details && offers.offer_details.length > 0 ? offers.offer_details : '',
      };
    }
    default:
      return state;
  }
}
