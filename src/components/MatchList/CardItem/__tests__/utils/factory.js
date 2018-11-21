const cardItemProps = {
  profile: {
    uid: 'xSH85140123',
    name: 'Xyz',
    gender: 'Female',
    summary: {
      createdBy: 'Self',
      shortBio:
        'I hope you are doing well.\r\nI have completed my MBA from Bangalore and presently reside with my parents in Mumbai where I am working as an HR professional in the Hospitality industry. I enjoy playing guitar and listening to soulful music.',
      infoMapIndian: [
        {
          key: 'age_height_list',
          label: 'Age / Height',
          value: "28 yrs, 5' 6",
        },
        {
          key: 'marital_status',
          label: 'Marital Status',
          value: 'Never Married',
        },
      ],
      infoMap: [
        {
          key: 'location',
          label: 'Location',
          value: 'Vadodara, India',
        },
      ],
      infoMapNri: [
        { key: 'age_height_list', label: 'Age / Height', value: '24 yrs, 5\' 0"' },
        { key: 'profession', label: 'Profession', value: 'Training Professional (Others)' },
        { key: 'religion_mother_tongue_list', label: 'Mother Tongue', value: 'Hindu, Tamil' },
        { key: 'location_nri_info_list', label: 'Location', value: 'Lives in Chennai,Tamil Nadu, India' },
        { key: 'education', label: 'Education', value: 'Bachelors - Engineering/ Technology' },
        { key: 'grew_up_in_info', label: 'Grew up in', value: 'Grew up in India' },
      ],
      infoMapPremiumCarousel: [],
    },
    flags: {
      activeStatus: 'default',
      albumStatus: 'default',

      canCallSendSMS: false,

      canCancelInvite: false,

      canRemind: false,

      canSendEmail: false,

      canSendEmailReminder: false,

      canSendSMS: false,

      canUnblock: false,

      canUnignore: false,

      canViewPhoneNo: false,
      connectionAction: 'not_contacted',

      connectionError: false,
      connectionJustNowText: null,
      connectionNote: null,
      connectionStatus: 'default',
      contactAction: 'free',
      contactStatus: 'available',
      horoscopeStatus: 'none',
      horoscopeStyle: 'l//hs/1',

      isAstroReady: false,

      isBoldListing: true,

      isBothPartyPayUser: false,

      isConnectLimitExceeded: false,

      isDeleted: false,

      isFamilyGamified: false,

      isFiltered: false,

      isFree: false,

      isHidden: false,

      isHoroscopeApplicable: true,

      isIndianDiaspora: true,

      isNameLocked: true,
      isMaskedProfile: false,

      isNri: false,

      isPhoneNoViewed: false,

      isPreferredMatch: false,
      isPremium: true,

      isSameGender: false,

      isSmsAlreadySent: false,

      isTwoWayMatch: false,

      isWatermarked: true,
      loading: 'none',
      membershipLevel: 'PremiumPlus',
      membershipTags: 'gold_plus',

      showChatNow: false,

      showHistory: false,

      showPostOnWall: false,
      unblockMessage: null,
      canCommunicate: false,
    },
  },
  isExtended: false,
};

const factory = { cardItemProps };
it('should export cardItemProps', () => {
  expect(factory.cardItemProps).not.toBeFalsy();
});
export default factory;
