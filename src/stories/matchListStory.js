/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import MatchList from '../components/MatchList';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import store from '../store';
import StoppageHeaderPartial from '../partials/StoppageHeaderPartial';
import StoppageFooterPartial from '../partials/StoppageFooterPartial';
import ProfileVerificationConsent from '../components/ProfileVerificationConsent';
import ProfileVerificationConsentProps from './utils/IdVerificationComponentProps';
import { inboxInvite } from './Inbox';
import { contactDetail } from './ContactDetailsModal';
import { callSmsLog } from './CallSmsLog';
inboxInvite();
contactDetail();
callSmsLog();


const experimentsProps = {
  near_me: {
    bucket: 'A',
  },
  webCTA_Dec2017: {
    bucket: 'A',
  },
};

const matchListProps = {
  wwwBaseUrl: 'https://www.shaadi.com',
  loading: false,
  results: {
    displayed_request_id: undefined,
    evt: 'matches-preferred_unviewed',
    evt_ref: 'bWF0Y2hlcy1wcmVmZXJyZWRfdW52aWV3ZWQ=',
    items: [{ uid: '3SH08279570', justNow: false, eoiLoadingStyle: 'none', photoLoading: false }],
    latest_request_id: undefined,
    permalink: '/search/partner',
    pg_ubt: 'L3NlYXJjaC9wYXJ0bmVy',
    query: {
      format: 'list',
      per_page: '20',
      request_id:
        'eyJzZWFyY2hfdHlwZSI6InBhZ2luYXRpb24iLCJyZXN1bHRzX2lkIjoic2VhcmNoOjk0MTY2MmNhYjVkMTBjOGEwZDBiMjRlY2U4NjE4Mzg3Iiwidmlld2VkIjoiTiIsImZvcm1hdCI6Imxpc3QiLCJwZXJfcGFnZSI6IjIwIiwiX3QiOjE1MTIwNDUxNzY0NTF9',
      results_id: 'search:941662cab5d10c8a0d0b24ece8618387',
      search_type: 'pagination',
      viewed: 'N',
    },
    results_id: 'search:941662cab5d10c8a0d0b24ece8618387',
    tooltip: {
      body: [],
      key: 'none',
      loading: false,
      page: 'none',
      position: 'none',
      title: null,
    },
  },
  pageCount: 0,
  page: 0,
  profiles: {
    '3SH08279570': {
      base: {
        infoMap: [
          { key: 'info-0', label: 'Age / Height', value: '27, 5\' 6"' },
          { key: 'info-1', label: 'Religion/Community', value: 'Sikh, Jat' },
          { key: 'info-2', label: 'Mother Tounge', value: 'Punjabi' },
          { key: 'info-3', label: 'Profession', value: 'Not Specified' },
          { key: 'info-4', label: 'Location', value: 'Other, India' },
        ],
        infoList: [
          { key: 'age-height', value: '27 yrs, 5\' 6", Sikh, Punjabi' },
          { key: 'location', value: 'Lives in Other, India' },
          { key: 'grew up in', value: 'Grew up in India' },
        ],
        detailList: [
          { key: 'age-height', value: '27, 5\' 6"' },
          { key: 'religion-caste', value: 'Sikh, Jat' },
          { key: 'profession', value: 'Not specified' },
          { key: 'location', value: 'Other, India' },
        ],
      },
      detailed: {},
      firstName: 'Shruthi',
      flags: {
        isFree: true,
        isPremium: false,
        membershipLevel: 'Free',
        connectionNote: null,
        connectionError: false,
        connectionStatus: 'default',
        connectionAction: 'not_contacted',
        connectionJustNowText: null,
        contactAction: 'free',
        contactStatus: 'available',
        horoscopeStatus: 'none',
        loading: 'none',
        isDeleted: false,
        isNri: false,
        isWatermarked: true,
        isTwoWayMatch: false,
        isBoldListing: false,
        canUnblock: false,
        unblockMessage: null,
        canUnignore: false,
        canRemind: false,
        canCancelInvite: false,
        isSameGender: false,
        activeStatus: 'default',
        isPreferredMatch: false,
        isConnectLimitExceeded: false,
        showHistory: false,
        membershipTags: 'free',
        isNameLocked: true,
        canCallSendSMS: false,
        canSendEmail: false,
        canSendEmailReminder: false,
        canSendSMS: false,
        canViewPhoneNo: false,
        isPhoneNoViewed: false,
        isSmsAlreadySent: false,
        showChatNow: false,
        showPostOnWall: false,
        isFiltered: false,
        horoscopeStyle: 'l//hs/1',
        albumStatus: 'default',
        isIndianDiaspora: true,
        isHoroscopeApplicable: true,
        isFamilyGamified: false,
        isAstroReady: false,
        isHidden: false,
        isBothPartyPayUser: false,
      },
      fullName: 'Shruthi Chandran',
      fullPhoto: 'https://img1.shaadi.com//2017/11/25/3SH08279570-85f5d6-female.jpg',
      fullPhotoBlur: 'https://img1.shaadi.com//2017/11/25/3SH08279570-85f5d6-female.jpg',
      gender: 'Female',
      heShe: 'She',
      himHer: 'Her',
      hisHer: 'Her',
      horoscopeScore: {},
      lastName: 'Chandran',
      location: 'Bengaluru / Bangalore, India',
      mrMs: 'Ms.',
      name: 'Shruthi C',
      photo: 'https://img1.shaadi.com//2017/11/25/3SH08279570-025264-Female.jpg',
      photoBlur: 'https://img1.shaadi.com//2017/11/25/3SH08279570-025264-Female.jpg',
      presence: {
        onlineStatus: 'away',
        onlineStatusDetails: 'Away',
        onlineAt: 1511836944000,
        device: 'mobile_native-android',
        platform: 'mobile',
        lastOnline: 'Online on Android App',
        lastOnlineDetails: 'Online now',
        ready: false,
      },
      requests: { count: 0, items: [] },
      se: '55a4ddca6cb19ea4e53716ecd91a2054',
      shortlists: { selected: [], ready: true, count: 0 },
      slug: '3SH08279570',
      summary: {
        infoMap: [
          { key: 'age_height', label: 'Age / Height', value: '27, 5\' 6"' },
          { key: 'religion', label: 'Religion', value: 'Sikh' },
          { key: 'mother_tongue', label: 'Mother Tongue', value: 'Punjabi' },
          { key: 'community', label: 'Community', value: 'Jat, Mallhi' },
          { key: 'location', label: 'Location', value: 'Other, India' },
          { key: 'education', label: 'Education', value: 'Masters - Engineering/ Technology' },
          { key: 'profession', label: 'Profession', value: 'Not Specified' },
        ],
        infoMapNonIndian: [
          { key: 'age_height', label: 'Age / Height', value: '27, 5\' 6"' },
          { key: 'religion', label: 'Religion', value: 'Sikh' },
          { key: 'mother_tongue', label: 'Mother Tongue', value: 'Punjabi' },
          { key: 'location', label: 'Location', value: 'Other,Punjab, India' },
          { key: 'info-6', label: 'Grew up in', value: 'India' },
          { key: 'education', label: 'Education', value: 'Masters - Engineering/ Technology' },
          { key: 'profession', label: 'Profession', value: 'Not Specified' },
        ],
        infoMapIndian: [
          { key: 'age_height_new_card', label: 'Age / Height', value: '27 yrs, 5\' 6"' },
          { key: 'marital_status', label: 'Marital Status', value: 'Never Married' },
          { key: 'religion_caste_new_card', label: 'Religion', value: 'Sikh, Jat, Jatt' },
          { key: 'location', label: 'Location', value: 'Other, India' },
          { key: 'mother_tongue', label: 'Mother Tongue', value: 'Punjabi' },
          { key: 'profession', label: 'Profession', value: 'Not Specified' },
        ],
        infoMapNri: [
          { key: 'age_height_new_card', label: 'Age / Height', value: '27 yrs, 5\' 6"' },
          { key: 'profession', label: 'Profession', value: 'Not Specified' },
          { key: 'religion_mother_tongue_new_card', label: 'Religion', value: 'Sikh, Punjabi' },
          { key: 'location', label: 'Location', value: 'Lives in Barcelona,Catalunya, Spain' },
          { key: 'education', label: 'Education', value: 'Masters - Engineering/ Technology' },
          { key: 'info-6', label: 'Grew up in', value: 'Grew up in India' },
        ],
        listAlbum: ['https://img1.shaadi.com//2017/02/06/nSH52553530-46f21a.jpg'],
        gridAlbum: ['https://img1.shaadi.com//2017/02/06/nSH52553530-b74fec.jpg'],
        shortBio:
          'Sat shri akal g, myself Harkaran Singh have done M.Tech in mechanical engineering from Punjabi university. Now am working as a assistant professor in engineering college. I am looking a partner who is similar to me.',
        createdBy: 'Self',
        profileCreatedBy: 'Self',
        shortlistCount: 0,
      },
      thumbnail: 'https://img1.shaadi.com//2017/11/25/3SH08279570-aed71f-female.jpg',
      thumbnailBlur: 'https://img1.shaadi.com//2017/11/25/3SH08279570-aed71f-female.jpg',
      uid: '3SH08279570',
      userHandle: 'SH08279570',
    },
    default: {},
    self: {
      base: {
        detailList: [],
        infoList: [],
        infoMap: [],
      },
      detailed: {
        about: {
          desc: '',
          icon: 'about',
          title: 'About',
        },
        album: [],
        background: {
          icon: 'background',
          items: [],
          title: 'Background',
        },
        commonInterests: [],
        education: {
          hasCollegeOrEmployer: false,
          icon: 'education',
          items: [],
          title: 'Education & Career',
        },
        family: {
          desc: '',
          icon: 'family',
          isGamified: false,
          title: 'Family Details',
        },
        horoscope: {
          icon: 'astro',
          isGamified: false,
          items: [],
          title: 'Horoscope Details',
        },
        infoMap: [],
        interests: {
          icon: 'interests',
          items: [],
          title: 'Interests & More',
        },
        lifestyle: {
          icon: 'lifestyle',
          items: [],
          title: 'Lifestyle & Appearance',
        },
        preferences: {
          icon: 'preferences',
          isGamified: false,
          items: [],
          title: 'Preferences Details',
        },
        trustBadges: [],
      },
      flags: {
        activeStatus: 'none',
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
        connectionStatus: 'unknown',
        contactAction: 'none',
        contactStatus: 'none',
        horoscopeStatus: 'none',
        isBoldListing: false,
        isConnectLimitExceeded: false,
        isDeleted: false,
        isFiltered: false,
        isFree: false,
        isNameLocked: true,
        isNri: false,
        isPhoneNoViewed: false,
        isPreferredMatch: false,
        isPremium: false,
        isSameGender: false,
        isSmsAlreadySent: false,
        isTwoWayMatch: false,
        isWatermarked: false,
        loading: 'none',
        membershipLevel: 'none',
        membershipTags: 'free',
        showChatNow: false,
        showHistory: false,
        showPostOnWall: false,
        unblockMessage: null,
      },
      fullPhoto: '/assets/default-full-photo.png',
      fullPhotoBlur: '/assets/default-full-photo.png',
      gender: null,
      heShe: '...',
      himHer: '...',
      hisHer: '...',
      photo: '/assets/default-photo.png',
      photoBlur: '/assets/default-photo.png',
    },
    presence: {
      device: 'none',
      lastOnline: '...',
      lastOnlineDetails: '...',
      onlineAt: 0,
      onlineStatus: 'invisible',
      onlineStatusDetails: '...',
      platform: 'none',
      ready: false,
    },
    requests: {
      count: 0,
      items: [],
    },
    shortlists: {
      count: 0,
      ready: false,
      selected: [],
    },
    summary: {
      gridAlbum: [],
      infoMap: [],
      infoMapNonIndian: [],
      listAlbum: [],
    },
    thumbnail: {},
    thumbnailBlur: {},
  },
  shortlistItems: [],
  settings: {
    canAccessChat: false,
    canConnectWithMessage: false,
    canInitiateChat: false,
    canSendPasswordOnConnect: false,
    canViewCollegeAndEmployer: false,
    canViewHoroscope: false,
    contactsRemaining: 0,
    contactsTotal: 0,
    defaultSearchFormat: 'list',
    gender: 'none',
    hasUploadedPhoto: true,
    horoscopeStyle: 'l/ENG/hs/1',
    isAstroGamified: false,
    isBothPartyPayUser: false,
    isFamilyGamified: false,
    isHidden: false,
    isMobileVerified: false,
    isPaidUser: false,
    isUnderScreening: false,
    mobileNumber: '',
    showUpgradeBanner: false,
    showUpgradeLinks: true,
    experiments: experimentsProps,
  },
  listStyle: 'list',
  sortOrder: [
    { key: 'score', label: 'Default Order', isSelected: true },
    { key: 'recorddate', label: 'Newest First', isSelected: false },
    { key: 'lastlogindate', label: 'Last Logged In', isSelected: false },
  ],
  onSortChange: () => {},
  onListStyleChange: () => {},
  onMatchSelectionChange: () => {},
  onAction: () => {},
  onBulkConnect: () => {},
  footerMatches: {
    count: 0,
    flash: null,
    items: [],
    loading: false,
    results_id: '',
    uid: null,
  },
  experiments: experimentsProps,
  searchPremiumBanner: {
    isPremiumBannerVisible: false,
    premiumBanner: {},
  },
};


storiesOf('Matchlist Component', module)
  .addDecorator(story =>
    <Provider store={store}>
      <Router>
        <Switch>
          {story()}
        </Switch>
      </Router>
    </Provider>,
  )
  .add('Default', () =>
    <div>
      <MatchList {...{ ...matchListProps }} />
      <MatchList
        {...{
          ...matchListProps,
          settings: {
            ...matchListProps.settings,
            experiments: {
              ...matchListProps.settings.experiments,
              webCTA_Dec2017: {
                ...matchListProps.settings.experiments.webCTA_Dec2017,
                bucket: 'B',
              },
            },
          },
        }}
      />
    </div>,
  );

storiesOf("Stopppage", module)
   .addDecorator(story =>
    <Provider store={store}>
      <Router>
        <Switch>
          {story()}
        </Switch>
      </Router>
    </Provider>,
  )
  .add('Profile verification Consent', () =>
    <ProfileVerificationConsent areExperimentsFetched={true} {...ProfileVerificationConsentProps} />
  );

storiesOf("Header",module)
  .addDecorator(story =>
    <Provider store={store}>
      <Router>
        <Switch>
          {story()}
        </Switch>
      </Router>
    </Provider>,)
    .add('Stoppage header', () =>
    <StoppageHeaderPartial layout="desktop" />
  ).add('Stoppage footer', () =>
    <StoppageFooterPartial layout="desktop" />
  );
