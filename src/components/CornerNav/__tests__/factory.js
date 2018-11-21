const factory = {
  userThumbnail: {
    img: {
      src: 'https://img1.shaadi.com/2018/09/20/WSH72625225-e041a2-male.jpg',
      alt: 'User menu',
    },
  },
  membership: {
    accountType: 'PAID',
    plan: 'Gold',
    planExpiryDate: '09-Oct-18',
    planDaysToExpiry: 5,
    headerUpgradeLink: '/payment?source=top_navbar_upgrade',
    callSmsViewed: 32,
    callSmsBalance: 43,
    services: [],
    wasPaidUser: false,
    upgradeType: 'renew',
  },
  membershipLevel: 'Premium',
  isChatOpen: false,
  windowWidth: 1301,
  activeDropdown: 'none',
  settings: {
    defaultSearchFormat: 'list',
    isPaidUser: true,
    showUpgradeBanner: false,
    canAccessChat: true,
    canInitiateChat: true,
    hasUploadedPhoto: true,
    canConnectWithMessage: true,
    showUpgradeLinks: false,
    canSendPasswordOnConnect: false,
    contactsTotal: 75,
    contactsRemaining: 43,
    isUnderScreening: false,
    isAstroGamified: true,
    gender: 'Male',
    canViewCollegeAndEmployer: true,
    canViewHoroscope: true,
    horoscopeStyle: 'l/ENG/hs/1',
    isFamilyGamified: false,
    isHidden: false,
    isBothPartyPayUser: false,
    isMobileVerified: true,
    mobileNumber: '+91-8286571162',
    mobileCountry: 'India',
    wasPaidUser: false,
    expiryDate: '09-Oct-18',
    isNri: false,
    isIndianDiaspora: true,
    experiments: {
      premium_tag: {
        bucket: 'A',
      },
      near_me: {
        bucket: 'A',
      },
      webCTA_Dec2017: {
        bucket: 'B',
      },
      premium_carousel: {
        bucket: 'A',
      },
      cartpage: {
        bucket: 'A',
      },
      cartpagenew: {
        bucket: 'B',
      },
      profile_verification: {
        bucket: 'B',
      },
      inbox_revamp: {
        bucket: 'A',
      },
      track_events: {
        bucket: 'B',
      },
      profilepage_revamp_abc: {
        bucket: 'C',
      },
      profilebooster_ab: {
        bucket: 'A',
      },
      featured_invite: {
        bucket: 'B',
      },
      album_revamped: {
        bucket: 'A',
      },
      accept_success: {
        bucket: 'B',
      },
      grid_view: {
        bucket: 'B',
      },
      whatsapp_contact: {
        bucket: 'B',
      },
      premium_message: {
        bucket: 'A',
      },
      cta_ab: {
        bucket: 'B',
      },
      similar_profile: {
        bucket: 'A',
      },
      profile_contact_card: {
        bucket: 'B',
      },
      msite_inbox_revamp: {
        bucket: 'A',
      },
      juspay_express_card_payment: {
        bucket: 'A',
      },
      juspay_netbanking_upi_payment: {
        bucket: 'A',
      },
      payment_page: {
        bucket: 'A',
      },
      upgrade_plan_ui: {
        bucket: 'C',
      },
    },
    membershipTags: 'gold',
    offerCode: 'j4u3may1750b',
    offer_details: [
      {
        type: 'perc',
        value: 55,
      },
    ],
  },
  isBottomBarVisible: true,
  isLoggedIn: true,
  onAction() {},
};

it('should export props for Help dropdown', () => {
  expect(factory).not.toBeFalsy();
});

export default factory;
