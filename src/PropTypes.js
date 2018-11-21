import PropTypes from 'prop-types';

const Types = {
  ...PropTypes,
};

Types.connectionStatus = Types.oneOf([
  'unknown',
  'error',
  'hidden',
  'default',
  'shortlisted',
  'contacted',
  'ignored',
  'ignoredJustNow',
  'blocked',
  'accepted',
  'declined',
  'cancelled',
  'misuseReported',
  'hidden',
  'disabled',
  'sameGender',
  // they
  'theyDeclined',
  'theyAccepted',
  'theyCancelled',
  'theyContacted',
  'skip',
  'filteredContacted',
]);
Types.membershipLevel = Types.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']);
Types.membershipTags = Types.oneOf([
  'free',
  'platinum_plus',
  'diamond_plus',
  'gold_plus',
  'silver_plus',
  'select',
  'vip',
  'gold',
  'diamond',
  'platinum',
  'special',
  'special_plus',
  'solitaire',
  'solitaire_plus',
]);

Types.onlineStatus = Types.oneOf(['Online', 'Offline', 'Idle', 'invisible']);
Types.contactStatus = Types.oneOf(['none', 'locked', 'available', 'availableOnRequest', 'availableOnVerification', 'showToFreeAndPremium']);
Types.horoscopeStatus = Types.oneOf(['none', 'locked', 'available', 'availableOnRequest']);

Types.albumStatus = Types.oneOf([
  'default',
  'noPhoto',
  'requestPassword',
  'visibleOnAccept',
  'passwordRequested',
  'photoComingSoon',
  'photoRequestSent',
  'photoUnderScreening',
  'visibleOnUpgrade',
]);
Types.isTwoWayMatch = Types.bool;
Types.isWatermarked = Types.bool;

Types.shortlists = {
  ready: Types.bool.isRequired,
  selected: Types.arrayOf(Types.string).isRequired,
  count: Types.number.isRequired,
};

Types.searchFlags = {
  connectionStatus: Types.connectionStatus.isRequired,
  membershipLevel: Types.membershipLevel.isRequired,
  membershipTags: Types.membershipTags.isRequired,
  contactStatus: Types.contactStatus.isRequired,
  horoscopeStatus: Types.horoscopeStatus.isRequired,
  albumStatus: Types.albumStatus.isRequired,
  isTwoWayMatch: Types.isTwoWayMatch.isRequired,
  isWatermarked: Types.isWatermarked.isRequired,
};

Types.connectMessage = {
  message_id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  fullDate: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['sent', 'received']).isRequired,
  type: PropTypes.string.isRequired,
};

Types.tooltipBody = {
  key: Types.string.isRequired,
  items: Types.arrayOf(
    Types.shape({
      key: Types.string.isRequired,
      type: Types.oneOf(['link', 'text', 'button']).isRequired,
      text: Types.string.isRequired,
      url: Types.string,
    }),
  ).isRequired,
};

Types.tooltip = {
  title: Types.string,
  body: Types.arrayOf(Types.shape(Types.tooltipBody)).isRequired,
  loading: Types.bool,
  position: Types.string.isRequired,
};

Types.loadingStyle = Types.oneOf(['none', 'full', 'partial']);

Types.album = Types.arrayOf(Types.string.isRequired);

Types.baseInfoMapItem = {
  key: Types.string.isRequired,
  value: Types.string.isRequired,
};

Types.profileList = {
  flash: Types.string,
  loading: Types.bool.isRequired,
  items: Types.arrayOf(
    Types.shape({
      uid: Types.string.isRequired,
    }),
  ).isRequired,
};

Types.profilePagination = {
  count: Types.number,
  prevUrl: Types.string,
  backUrl: Types.string,
  nextUrl: Types.string,
};

Types.summaryInfoMapItem = {
  key: Types.string.isRequired,
  label: Types.string.isRequired,
  value: Types.string.isRequired,
};

Types.heShe = Types.oneOf(['He', 'She', '...']);
Types.himHer = Types.oneOf(['Him', 'Her', '...']);
Types.hisHer = Types.oneOf(['His', 'Her', '...']);

Types.commonProfile = {
  se: Types.string,
  uid: Types.string,
  name: Types.string,
  slug: Types.string,
  userHandle: Types.string,
  heShe: Types.heShe,
  himHer: Types.himHer,
  hisHer: Types.hisHer,
};

Types.summary = {
  infoMap: Types.arrayOf(Types.summaryInfoMapItem).isRequired,
  gridAlbum: Types.album.isRequired,
  listAlbum: Types.album.isRequired,
  shortBio: Types.string.isRequired,
  createdBy: Types.string.isRequired,
};

Types.facetOption = {
  id: Types.string.isRequired,
  label: Types.string.isRequired,
  value: Types.string,
  count: Types.string,
  isSelected: Types.bool.isRequired,
};

Types.facet = {
  id: Types.string.isRequired,
  options: Types.arrayOf(Types.shape(Types.facetOption)),
  isMulti: Types.bool,
  title: Types.string.isRequired,
};

Types.searchProfile = {
  ...Types.commonProfile,
  summary: Types.summary.isRequired,
  flags: Types.searchFlags.isRequired,
};

Types.location = {
  key: Types.string,
  pathname: Types.string.isRequired,
  search: Types.string.isRequired,
};

Types.history = {
  location: Types.shape(Types.location).isRequired,
  push: Types.func.isRequired,
  replace: Types.func.isRequired,
};

Types.sortOrderItem = {
  key: Types.string.isRequired,
  label: Types.string.isRequired,
  isSelected: Types.bool.isRequired,
};

Types.shortlistItem = {
  key: Types.string.isRequired,
  id: Types.string.isRequired,
  label: Types.string.isRequired,
};

Types.searchItem = {
  uid: Types.string.isRequired,
  eoiTooltip: Types.tooltip.isRequired,
  photoTooltip: Types.tooltip.isRequired,
};

Types.results = {
  results_id: Types.string.isRequired,
  permalink: Types.string.isRequired,
  evt_ref: Types.string.isRequired,
  items: Types.arrayOf(Types.shape(Types.searchItem)).isRequired,
};

Types.successStory = {
  id: Types.string.isRequired,
  title: Types.string.isRequired,
  description: Types.string.isRequired,
  photo: Types.string.isRequired,
};

Types.successStories = {
  loading: Types.bool.isRequired,
  flash: Types.string,
  items: Types.arrayOf(Types.shape(Types.successStory)).isRequired,
};

Types.modalTemplate = Types.oneOf([
  'none',
  'watermark',
  'sendRequest',
  'sendDecline',
  'contactDetails',
  'blockMember',
  'reportMisuse',
  'misuseReported',
  'firstStep',
  'dailyRecommendations',
  'pendingExitIntent',
  'history',
  'firstPhotoUpload',
  'uploadPhoto',
  'mostMatchesTour',
  'campaignLayer',
  'inviteDailyLimit',
  'request',
  'viewAlbum',
  'hiddenConnectLayer',
  'callConsultant',
  'saveSearchBox',
  'otherSearch',
  'premiumProposition',
  'profilePhotoUpload',
  'fbPhotoUpload',
  'photoGuidelines',
  'deletePhotoConfirmation',
  'simpleMessage',
  'reportPhoneNo',
  'thankYouPage',
  'accept_match',
  'acceptPremium',
]);

Types.mobileModalTemplate = Types.oneOf([
  'none',
  'upgrade',
  'sendRequest',
  'premiumProposition',
  'commonInterests',
  'viewContactConfirm',
  'blockProfile',
  'viewContact',
  'reportMisuse',
  'album',
  'facetBar',
  'reportMisuseConfirm',
  'filters',
]);

Types.settings = {
  canSendPasswordOnConnect: PropTypes.bool,
  canConnectWithMessage: PropTypes.bool.isRequired,
  hasUploadedPhoto: Types.bool.isRequired,
  showUpgradeBanner: Types.bool.isRequired,
};

Types.hoverCard = {
  uid: Types.string,
  loading: Types.bool.isRequired,
  flash: Types.string,
  tooltip: Types.shape(Types.alert).isRequired,
  photoLoading: Types.bool.isRequred,
  eoiLoadingStyle: Types.loadingStyle.isRequired,
};

Types.preview = {
  name: Types.string.isRequired,
  flags: PropTypes.shape({
    membershipLevel: Types.membershipLevel.isRequired,
  }).isRequired,
  summary: PropTypes.shape({
    infoMap: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

Types.t = Types.object;

Types.fourHourTicker = {
  family_details: PropTypes.bool.isRequired,
  astro: PropTypes.bool.isRequired,
  photo: PropTypes.bool.isRequired,
  career: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  target_time: PropTypes.number.isRequired,
};

Types.children = Types.element;

Types.skew = {
  socket: PropTypes.number.isRequired,
  api: PropTypes.number.isRequired,
};

Types.basicProfile = {
  ...Types.commonProfile,
};

Types.chatItem = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastMessageDate: PropTypes.string.isRequired,
  lastMessageT: PropTypes.number.isRequired,
  source: PropTypes.oneOf(['api', 'socket']),
  status: PropTypes.oneOf(['delivered', 'read', 'sent', 'none']),
  unreadCount: PropTypes.number,
};
Types.onlineItem = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

Types.chatHistoryMessageItem = {
  messageId: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['none', 'read', 'sent', 'delivered']),
};

Types.image = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

Types.match = {
  params: Types.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isExact: PropTypes.bool.isRequired,
};

Types.location = {
  hash: Types.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

Types.history = {
  action: PropTypes.string.isRequired,
  block: Types.func.isRequired,
  createHref: Types.func.isRequired,
  go: Types.func.isRequired,
  goBack: Types.func.isRequired,
  goForward: Types.func.isRequired,
  length: Types.number.isRequired,
  listen: Types.func.isRequired,
  location: Types.shape(Types.location).isRequired,
  push: Types.func.isRequired,
  replace: Types.func.isRequired,
};

Types.connectContactStatus = Types.oneOf([
  'disabled',
  'sameGender',
  'hidden',
  'contacted',
  'filteredContacted',
  'theyAccepted',
  'theyDeclined',
  'cancelled',
  'blocked',
  'theyContacted',
  'accepted',
  'declined',
  'theyCancelled',
  'theyBlocked',
  'availableOnRequest',
  'none',
]);

Types.contactDetailStatus = Types.oneOf([
  'sameGender',
  'currentlyUnderScreening',
  'hidden',
  'theyCancelled',
  'theyDeclined',
  'theyFiltered',
  'notVerified',
  'availableOnRequest',
  'numberHiddenByMember',
  'available',
  'contactDetailNotVerifiedRequested',
  'contactDetailNotVerifiedRequest',
  'membershipContactLimitExceeded',
  'maxContactLimitExceeded',
  'theyCurrentlyUnderScreening',
  'blocked',
  'cancelled',
  'declined',
  'theyCancelled',
  'theyBlocked',
  'theyHidden',
  'disabled',
  'theyAccepted',
  'theyContacted',
  'accepted',
  'contacted',
  'filteredContacted',
  'theyAccepted',
  'none',
]);

Types.contactDetailsTitleStatus = Types.oneOf([
  'selfHidden',
  'systemHidden',
  'selfDeleted',
  'systemDeleted',
  'defaultDeleted',
  'available',
  'visibleOnUpgrade',
  'locked',
  'contactDetailNotVerifiedRequested',
  'sameGender',
  'currentlyUnderScreening',
  'hidden',
  'theyCancelled',
  'theyDeclined',
  'theyFiltered',
  'notVerified',
  'numberHiddenByMember',
  'contactDetailNotVerifiedRequest',
  'membershipContactLimitExceeded',
  'maxContactLimitExceeded',
  'theyCurrentlyUnderScreening',
  'blocked',
  'cancelled',
  'declined',
  'theyCancelled',
  'theyBlocked',
  'theyHidden',
  'none',
  'theyAccepted',
  'theyContacted',
  'accepted',
  'contacted',
  'filteredContacted',
  'theyAccepted',
  'unknown',
]);
Types.contactSummary = {
  contact: PropTypes.objectOf(
    PropTypes.shape({
      contact_details_status: Types.contactDetailStatus.isRequired,
      contact_details_title_status: Types.contactDetailsTitleStatus.isRequired,
    }),
  ).isRequired,
  profileContactStatus: Types.connectContactStatus.isRequired,
  contactDetailsStatusString: Types.contactDetailStatus.isRequired,
  contactDetailsTitleStatusString: Types.contactDetailsTitleStatus.isRequired,
  actionDate: PropTypes.string.isRequired,
  sms: PropTypes.string.isRequired,
};
Types.contactSummaryProfile = {
  ...Types.commonProfile,
  contactSummary: Types.contactSummary.isRequired,
};

Types.contactSummaryMeta = {
  loading: PropTypes.bool.isRequired,
};
Types.contactSummaryItem = {
  uid: PropTypes.string.isRequired,
  photoLoading: PropTypes.bool.isRequired,
  changeCursorStatus: PropTypes.bool.isRequired,
  viewSmsShowStatus: PropTypes.bool.isRequired,
};
Types.contactSummaryMembership = {
  plan: PropTypes.string.isRequired,
  wasPaidUser: PropTypes.bool.isRequired,
};

Types.chatOnlineItem = {
  chatDetails: PropTypes.shape({
    device: PropTypes.string.isRequired,
    lastOnline: PropTypes.string.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    lastOnlineText: PropTypes.string.isRequired,
    lastOnlineStatus: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

Types.muiClasses = Types.object;

Types.shaadiUser = {
  uid: PropTypes.string.isRequired,
  gender: Types.string.isRequired,
  errusr: Types.string,
};

Types.muiOption = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Types.option = PropTypes.arrayOf(Types.muiOption);

Types.configApp = {
  appKey: PropTypes.string.isRequired,
  chatAppKey: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  domainName: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  autologinToken: PropTypes.string.isRequired,
  authHistoryToken: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  webp: PropTypes.string.isRequired,
  hasWebpSupport: PropTypes.bool.isRequired,
};

Types.reducerSessionUser = {
  // photos: {},
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  complexion: PropTypes.string.isRequired,
  built: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  drink: PropTypes.string.isRequired,
  smoke: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  hasProfilePhoto: false,
  heShe: PropTypes.string.isRequired,
  himHer: PropTypes.string.isRequired,
  hisHer: PropTypes.string.isRequired,
  mrMs: PropTypes.string.isRequired,
  heSheOrYou: PropTypes.string.isRequired,
  himHerOrYou: PropTypes.string.isRequired,
  hisHerOrYou: PropTypes.string.isRequired,
  mrMsOrYou: PropTypes.string.isRequired,
  heSheOrYour: PropTypes.string.isRequired,
  himHerOrYour: PropTypes.string.isRequired,
  hisHerOrYour: PropTypes.string.isRequired,
  mrMsOrYour: PropTypes.string.isRequired,
};

Types.reducerSession = {
  areExperimentsFetched: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  nextUrl: PropTypes.string.isRequired,
  isNative: PropTypes.bool.isRequired,
  isStoppage: PropTypes.bool.isRequired,
  canShowSkip: PropTypes.bool.isRequired,
  user: Types.reducerSessionUser.isRequired,
};

Types.cartSettings = {
  price: PropTypes.number.isRequired,
  yourPrice: PropTypes.number.isRequired,
  offerDiscountPerc: PropTypes.number.isRequired,
  offerDiscountAmount: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
  profileBoosterAmount: PropTypes.number.isRequired,
  shaadiCareAmount: PropTypes.number.isRequired,
  isProfileBooster: PropTypes.bool.isRequired,
  isShaadiCare: PropTypes.bool.isRequired,
  isCreditCardMop: PropTypes.bool.isRequired,
  isDebitCardMop: PropTypes.bool.isRequired,
  isPaypalMop: PropTypes.bool.isRequired,
  isNetBankingMop: PropTypes.bool.isRequired,
  isPayAtDoorStepMop: PropTypes.bool.isRequired,
  isPaymentAtBankMop: PropTypes.bool.isRequired,
  isShaadiCentreMop: PropTypes.bool.isRequired,
  isCashPaymentMop: PropTypes.bool.isRequired,
  ccConvertedAmount: PropTypes.object.isRequired,
  dcConvertedAmount: PropTypes.object.isRequired,
  paypalConvertedAmount: PropTypes.object.isRequired,
  netBankingConvertedAmount: PropTypes.object.isRequired,
  payAtDoorConvertedAmount: PropTypes.object.isRequired,
  paymentAtBankConvertedAmount: PropTypes.object.isRequired,
  shaadiCenterConvertedAmount: PropTypes.object.isRequired,
  cashPaymentConvertedAmount: PropTypes.object.isRequired,
  mopIds: PropTypes.shape({
    creditCardId: PropTypes.number.isRequired,
    debitCardId: PropTypes.number.isRequired,
    paypalId: PropTypes.number.isRequired,
    netBankingId: PropTypes.number.isRequired,
    payAtDoorStepId: PropTypes.number.isRequired,
    paymentAtBankId: PropTypes.number.isRequired,
    shaadiCenterId: PropTypes.number.isRequired,
    cashPaymentId: PropTypes.number.isRequired,
  }).isRequired,
};

Types.cartBankList = {
  topBanks: PropTypes.array.isRequired,
  otherBanks: PropTypes.array.isRequired,
};

Types.cartDoorStepCityList = {
  frequentlyUsedCities: PropTypes.array.isRequired,
  moreCities: PropTypes.array.isRequired,
};

Types.cartCentersCityList = {
  cities: PropTypes.array.isRequired,
  centers: PropTypes.array.isRequired,
};

Types.cartOtpGenerationData = {
  attempt: PropTypes.number.isRequired,
  errorMsg: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Types.cartOtpVerificationData = {
  success: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Types.cartCustomerDetails = {
  mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Types.cartVerifiedMobile = {
  isVerifiedMobile: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
};

Types.cartOrderId = {
  id: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Types.jusPayCCFormErrors = {
  cardNum: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  cvv: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  cardHolderName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  cardMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  cardYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  trySubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

Types.jusPayCreditCardCommon = {
  innerRef: PropTypes.func.isRequired,
  formErrors: PropTypes.shape({ ...Types.jusPayCCFormErrors }).isRequired,
};

Types.cartTotalPayable = {
  buttonText: PropTypes.string.isRequired,
  isSymbolCodeCurrency: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  approxAmount: PropTypes.number.isRequired,
  approxCurrency: PropTypes.string.isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
  shaadiCare: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spotlight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isTextVisible: PropTypes.bool,
  isPayAtDoor: PropTypes.bool,
  isCallAssistant: PropTypes.bool,
  isPosCenter: PropTypes.bool,
};

Types.cartCommonProps = {
  finalAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  settings: PropTypes.shape(PropTypes.cartSettings).isRequired,
  isSymbolCodeCurrency: PropTypes.bool.isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
};

Types.cartSubmitProps = {
  cartId: PropTypes.number.isRequired,
  accessToken: PropTypes.string.isRequired,
  mopId: PropTypes.number.isRequired,
  mopName: PropTypes.string.isRequired,
};

Types.cartListProps = Types.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  PropTypes.arrayOf(
    PropTypes.shape({
      bank_code: PropTypes.string.isRequired,
      bank_name: PropTypes.string.isRequired,
      vendor: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  PropTypes.arrayOf(
    PropTypes.shape({
      city_name: PropTypes.string.isRequired,
      display_name: PropTypes.string.isRequired,
      frequently_use: PropTypes.number.isRequired,
      new: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
]);

Types.cartDropDownProps = {
  formErrors: PropTypes.oneOfType([
    PropTypes.shape({
      cardNum: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      cvv: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      cardHolderName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      cardMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      cardYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }),
    PropTypes.shape({
      bankName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }),
    PropTypes.shape({
      address: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      contactPersonName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      personPhoneNo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }),
    PropTypes.shape({
      contactPersonName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      personPhoneNo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }),
    PropTypes.shape({
      city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
      centre: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }),
  ]),
  list: Types.cartListProps.isRequired,
  otherList: Types.cartListProps.isRequired,
};
Types.otpHiddenProps = {
  formFields: PropTypes.oneOfType([
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      contactPersonName: PropTypes.string.isRequired,
      personPhoneNo: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      contactPersonName: PropTypes.string.isRequired,
      personPhoneNo: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      shaadiCentre: PropTypes.string.isRequired,
    }),
  ]),
};

Types.orderSuccess = {
  amount: PropTypes.string.isRequired,
  contact_details: PropTypes.string.isRequired,
  crm_no: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  mode_of_payment: PropTypes.string.isRequired,
  order_details: PropTypes.arrayOf(
    Types.shape({
      label: Types.string.isRequired,
      text: Types.string.isRequired,
    }),
  ).isRequired,
  order_id: PropTypes.string.isRequired,
  order_status: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  shaadi_care_amount: PropTypes.string,
  sub_sections: PropTypes.arrayOf(
    Types.shape({
      details: PropTypes.arrayOf(
        Types.shape({
          label: PropTypes.string,
          text: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

Types.paymentDetails = {
  currency: PropTypes.string.isRequired,
  showVip: PropTypes.bool.isRequired,
  currentTime: PropTypes.string.isRequired,
  offerType: PropTypes.string.isRequired,
  showSkipLink: PropTypes.bool.isRequired,
  skipProfileId: PropTypes.string.isRequired,
  products: PropTypes.shape({
    personalisedProducts: PropTypes.arrayOf(
      PropTypes.shape({
        best_value: PropTypes.bool.isRequired,
        topseller: PropTypes.bool.isRequired,
        your_plan: PropTypes.bool.isRequired,
        benefits: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            applicable: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
        name: PropTypes.string.isRequired,
        discount_text: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        saleprice: PropTypes.string.isRequired,
        pricepermonth: PropTypes.string.isRequired,
        error_msg: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    premiumProducts: PropTypes.arrayOf(
      PropTypes.shape({
        best_value: PropTypes.bool.isRequired,
        topseller: PropTypes.bool.isRequired,
        your_plan: PropTypes.bool.isRequired,
        benefits: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            applicable: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
        name: PropTypes.string.isRequired,
        discount_text: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        saleprice: PropTypes.string.isRequired,
        pricepermonth: PropTypes.string.isRequired,
        error_msg: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  defaultProduct: PropTypes.string.isRequired,
};

Types.paymentData = {
  payment: PropTypes.shape({
    products: PropTypes.shape({
      paymentData: PropTypes.shape({
        topBand: PropTypes.shape({
          isOfferDetail: PropTypes.bool.isRequired,
          isScentTrail: PropTypes.bool.isRequired,
          type: PropTypes.string.isRequired,
          maxDiscount: PropTypes.number.isRequired,
          discountType: PropTypes.string.isRequired,
          showTicker: PropTypes.bool.isRequired,
          validTill: PropTypes.string.isRequired,
          isOldPrice: PropTypes.bool.isRequired,
          profileId: PropTypes.string.isRequired,
          profileName: PropTypes.string.isRequired,
          photo: PropTypes.string.isRequired,
          subText: PropTypes.string.isRequired,
          currency: PropTypes.string.isRequired,
        }).isRequired,
        productDetails: PropTypes.shape(PropTypes.paymentDetails).isRequired,
        userDetails: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

Types.paymentTabsProps = {
  productDetails: PropTypes.shape(PropTypes.productDetails).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  addToCart: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  cartResult: PropTypes.shape({
    cartErrorMsg: PropTypes.string.isRequired,
    btnloading: PropTypes.bool.isRequired,
  }).isRequired,
};

Types.successStoriesProps = {
  stories: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    flash: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['profile', 'search', 'payment']).isRequired,
  isPayment: PropTypes.bool,
  profilePageBucket: PropTypes.string,
};

Types.topBandProps = {
  isOfferDetail: PropTypes.bool.isRequired,
  isScentTrail: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  maxDiscount: PropTypes.number.isRequired,
  discountType: PropTypes.string.isRequired,
  showTicker: PropTypes.bool.isRequired,
  validTill: PropTypes.string.isRequired,
  isOldPrice: PropTypes.bool.isRequired,
  html: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female', 'none']).isRequired,
  urlParams: PropTypes.shape({
    acceptCount: PropTypes.number.isRequired,
    profileId: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

Types.productProps = {
  name: PropTypes.string.isRequired,
  productCode: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  offerType: PropTypes.string.isRequired,
  discountText: PropTypes.string.isRequired,
  discountDetails: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  saleprice: PropTypes.number.isRequired,
  duration: PropTypes.element.isRequired,
  topAmountProps: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  perMonthAmtProps: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  isPremiumProduct: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  placeCart: PropTypes.func.isRequired,
  btnloading: PropTypes.bool.isRequired,
};

export default Types;
