const allData = {
  heShe: 'He',
  isHovered: false,
  isCarousel: false,
  isSearchLinkVisible: false,
  justNow: true,
  justNowIcon: null,
  justNowText: null,
  note: null,
  settings: {
    defaultSearchFormat: 'list',
    isPaidUser: false,
    showUpgradeBanner: true,
    canAccessChat: true,
    canInitiateChat: false,
    hasUploadedPhoto: false,
    canConnectWithMessage: false,
    showUpgradeLinks: true,
    canSendPasswordOnConnect: false,
    contactsTotal: 15,
    contactsRemaining: 0,
    isUnderScreening: false,
    isAstroGamified: true,
    gender: 'Female',
    canViewCollegeAndEmployer: false,
    canViewHoroscope: true,
    horoscopeStyle: 'l/ENG/hs/1',
    isFamilyGamified: false,
    isHidden: false,
    isBothPartyPayUser: false,
    isMobileVerified: false,
    mobileNumber: '8169275580',
    wasPaidUser: false,
    expiryDate: '',
    isNri: false,
    isIndianDiaspora: true,
    experiments: {
      premium_tag: { bucket: 'A' },
      near_me: { bucket: 'B' },
      webCTA_Dec2017: { bucket: 'D' },
      premium_carousel: { bucket: 'A' },
    },
    offerCode: '',
    offer_details: '',
  },
  membershipTags: 'free',
  status: 'ignored',
  type: 'profile',
};

const factory = { allData };

it('should export profiles and props', () => {
  expect(factory.allData).not.toBeFalsy();
});

export default factory;
