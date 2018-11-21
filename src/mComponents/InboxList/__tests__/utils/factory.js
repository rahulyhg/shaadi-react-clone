import { formInboxFactory } from '../../../../pages/InboxPage/__tests__/utils/inboxFactory';

const selector = listType => {
  const InboxProps = formInboxFactory(listType).props;
  const { wwwBaseUrl, loading, results, profiles, settings, requestType } = InboxProps;
  return { wwwBaseUrl, loading, results, profiles, settings, requestType };
};
const settings = {
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
  isMobileVerified: true,
  mobileNumber: '6393917163',
  wasPaidUser: false,
  expiryDate: '',
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
      bucket: 'A',
    },
    profile_verification: {
      bucket: 'B',
    },
    inbox_revamp: {
      bucket: 'A',
    },
    track_events: {
      bucket: 'A',
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
      bucket: 'A',
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
  },
  membershipTags: 'free',
  offerCode: '',
  offer_details: '',
};
const CardItems = {
  listType: {
    connect_pending: selector('connect_pending'),
    connect_accepted: selector('connect_accepted'),
    connect_awaiting: selector('connect_awaiting'),
    connect_deleted: selector('connect_deleted'),
    connect_filtered: selector('connect_filtered'),
    request_pending: selector('request_pending'),
    request_accepted: selector('request_accepted'),
    request_awaiting: selector('request_awaiting'),
  },
  settings,
};
it('should export pages props', () => {
  expect(Object.keys(CardItems).length).toEqual(2);
});
export default CardItems;
