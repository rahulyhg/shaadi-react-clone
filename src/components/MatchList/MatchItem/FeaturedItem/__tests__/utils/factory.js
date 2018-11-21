const props = {
  onShowPhotoClick() {},
  isHovered: false,
  profileUrl: 'profile_url',
  albumUrl: 'album_url',
  photos: [],
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
      infoMapFeatured: [
        {
          key: 'info-6',
          label: 'age_height_mt_caste',
          value: '27 yrs , 5\' 2" ,Pune',
        },
        {
          key: 'info-1',
          label: 'mt_caste',
          value: 'Hindi , Baghel/Pal/Gaderiya',
        },
        {
          key: 'info-3',
          label: 'education',
          value: 'Undergraduate - Arts',
        },
      ],
      infoMapFeaturedNri: [
        {
          key: 'info-6',
          label: 'age_height_mt_caste',
          value: '27 yrs , 5\' 2" ,Pune',
        },
        {
          key: 'info-1',
          label: 'mt_religion',
          value: 'Marathi , Hindu',
        },
        {
          key: 'info-3',
          label: 'education',
          value: 'Undergraduate - Arts',
        },
      ],
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
      connect_pending: {
        type: 'connect',
        action: 'pending',
        from: 'from',
        to: 'to',
        isNew: false,
        actionDate: '07 Jan',
        requestKey: 'request_key',
        message_id: '',
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
    action: 'pending',
  },
  membershipLevel: 'Free',
  membershipTags: 'free',
};

const factory = { props };
it('should export props', () => {
  expect(factory.props).not.toBeFalsy();
});
export default factory;
