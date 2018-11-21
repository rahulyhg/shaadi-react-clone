const props = {
  onShowPhotoClick() {},
  isHovered: false,
  profileUrl: 'profile_url',
  albumUrl: 'album_url',
  profile: {
    uid: 'uid',
    name: 'Profile Name',
    heShe: 'He',
    himHer: 'Him',
    hisHer: 'His',
    photoMedium: 'photo_medium',
    presence: {
      onlineStatus: 'Offline',
      lastOnlineDetails: 'Online 1w ago',
      chatIcon: 'web_idle',
    },
    requests: {
      count: 0,
      items: [],
    },
    summary: {
      infoMap: [],
      listAlbum: [],
      gridAlbum: [],
      infoMapInboxIndian: [
        {
          key: 'info-0',
          label: 'age_height_mt_caste',
          value: '27 yrs , 5\' 2"',
        },
        {
          key: 'info-1',
          label: 'mt_caste',
          value: 'Hindi , Baghel/Pal/Gaderiya',
        },
        {
          key: 'info-2',
          label: 'city_country',
          value: 'Delhi , India',
        },
        {
          key: 'info-3',
          label: 'education',
          value: 'Undergraduate - Arts',
        },
        {
          key: 'info-5',
          label: 'profession_income',
          value: 'Sales Professional',
        },
      ],
    },
    verification: {
      count: 3,
      shield_state: 'GREEN',
      derived_text: 'Aadhaar, Facebook and Mobile number Verified',
      verified_proofs: ['Aadhaar Verified', 'Facebook Verified', 'Mobile number Verified'],
    },
    flags: {
      connectionStatus: 'theyAccepted',
      membershipLevel: 'Free',
      contactStatus: 'available',
      horoscopeStatus: 'none',
      albumStatus: 'default',
      isTwoWayMatch: false,
      isWatermarked: true,
      isBoldListing: false,
      isHoroscopeApplicable: false,
      isIndianDiaspora: true,
      membershipTags: 'free',
      isDeleted: false,
      connectionError: false,
      canCancelInvite: false,
      canRemind: false,
      canUnblock: false,
      canUnignore: false,
      isHidden: false,
    },
    shortlists: {
      ready: false,
      selected: [],
      count: 0,
    },
  },
  item: {
    justNow: false,
    eoiLoadingStyle: 'none',
    photoLoading: false,
    requests: {
      connect_accepted: {
        type: 'connect',
        action: 'accepted',
        from: 'from',
        to: 'to',
        isNew: false,
        actionDate: '07 Jan',
        requestKey: 'request_key',
        message_id: 'connect-ISH79311668-kSH85654205-3657-6515-1539672595',
        message: 'Hi, We have liked your profile and believe it to be a good Match. If you like our ..., Riya R',
        hide_message: false,
        viewed_date: '07 Jan 2018',
        direction: 'out',
      },
    },
    contact: {
      mask_contact_no: '9876XXXXXX',
      country_code: '+91',
    },
  },
  settings: {
    defaultSearchFormat: 'list',
    isPaidUser: false,
    showUpgradeBanner: true,
    canAccessChat: true,
    canInitiateChat: false,
    hasUploadedPhoto: true,
    canConnectWithMessage: false,
    showUpgradeLinks: true,
    canSendPasswordOnConnect: false,
    contactsTotal: null,
    contactsRemaining: null,
    isUnderScreening: false,
    isAstroGamified: true,
    gender: 'Male',
    canViewCollegeAndEmployer: false,
    canViewHoroscope: true,
    horoscopeStyle: 'l/ENG/hs/1',
    isFamilyGamified: false,
    isHidden: false,
    isBothPartyPayUser: false,
    isMobileVerified: true,
    mobileNumber: '611252423',
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
      cartpage: {
        bucket: 'A',
      },
      accept_success: {
        bucket: 'B',
      },
    },
  },
  tooltip: {
    title: null,
    body: [],
    loading: false,
    position: 'none',
  },
  shortlistItems: [],
  wwwBaseUrl: 'base_url',
  requestType: {
    type: 'connect',
    action: 'accepted',
  },
  membershipLevel: 'Free',
  membershipTags: 'free',
};

const factory = { props };
it('should export props', () => {
  expect(factory.props).not.toBeFalsy();
});
export default factory;
