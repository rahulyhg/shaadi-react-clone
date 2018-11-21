const props = {
  accountType: 'FREE',
  plan: 'Free',
  expiryDate: '',
  thumbnail: {
    img: {
      src: 'https://img2.shaadi.com//imgs/my-shaadi/ver2/60-add-ph-female-v2.gif',
      alt: 'User menu',
    },
  },
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
    contactsTotal: null,
    contactsRemaining: null,
    isUnderScreening: false,
    isAstroGamified: true,
    gender: 'Female',
    canViewCollegeAndEmployer: false,
    canViewHoroscope: true,
    horoscopeStyle: 'l/ENG/hs/1',
    isFamilyGamified: true,
    isHidden: false,
    isBothPartyPayUser: false,
    isMobileVerified: false,
    mobileNumber: '9379732670',
    wasPaidUser: false,
    expiryDate: '',
    isNri: false,
    isIndianDiaspora: true,
    experiments: {
      premium_tag: {
        bucket: 'A',
      },
      near_me: {
        bucket: 'B',
      },
      webCTA_Dec2017: {
        bucket: 'B',
      },
      premium_carousel: {
        bucket: 'A',
      },
    },
    membershipTags: 'free',
    offerCode: 'octbd60b',
    offer_details: [
      {
        type: 'perc',
        value: 60,
      },
    ],
  },
  isOpen: false,
  daysToExpiry: 0,
  upgradeType: 'upgrade',
  onVisibilityChange() {},
  onAction() {},
  onContextMenu() {},
  onDragStart() {},
  onDragEnter() {},
  onDragOver() {},
  onDrop() {},
};

const factory = { props };

it('should export profiles and props', () => {
  // expect(factory.profiles).not.toBeFalsy();
  expect(factory.props).not.toBeFalsy();
});

export default factory;
