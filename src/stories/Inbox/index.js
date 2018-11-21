import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import initializeStore from '../../store';
import InboxList from '../../components/MatchList/InboxList';
import NoResult from '../../components/Common/NoResult';

const store = initializeStore();

const inboxInvite = () => {
  storiesOf('Inbox Invite ', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('Inbox Cards', () => {
      const experimentsProps = {
        near_me: {
          bucket: 'A',
        },
        webCTA_Dec2017: {
          bucket: 'B',
        },
      };
      const isViewed = boolean('New Request', false);
      const isPremium = boolean('Paid User', false);
      const isMemberPaid = boolean('Paid Member', false);
      const isBothPartyPay = !isMemberPaid ? boolean('Both Part Pay', false) : false;
      const noResult = boolean('Zero result', false);
      const justNow = boolean('Just Now', false);
      const actionType = select(
        'Action Type',
        {
          accepted: 'accepted',
          pending: 'pending',
          awaiting: 'awaiting',
          deleted: 'deleted',
          filtered: 'filtered',
        },
        'pending',
      );
      const eoiReqType = select(
        'EOI Request Type',
        {
          accept: 'accept',
          accept_confirm: 'accept_confirm',
          connect_confirm: 'connect_confirm',
          connect: 'connect',
          none: '',
        },
        'none',
      );
      const defaultVal = {
        accepted: 'profile_accepted',
        pending: 'profile_contacted',
        awaiting: 'member_contacted',
        filtered: 'profile_contacted',
        deleted: 'member_declined',
      };
      const connectionStatusMap = {
        accepted: {
          profile_accepted: 'profile_accepted',
          member_accepted: 'member_accepted',
          member_hidden: 'member_hidden',
        },
        pending: {
          profile_contacted: 'profile_contacted',
          member_hidden: 'member_hidden',
        },
        awaiting: {
          member_contacted: 'member_contacted',
          member_hidden: 'member_hidden',
        },

        deleted: {
          member_declined: 'member_declined',
          member_cancelled: 'member_cancelled',
          profile_declined: 'profile_declined',
          profile_cancelled: 'profile_cancelled',
          member_hidden: 'member_hidden',
        },
        filtered: {
          profile_contacted: 'profile_contacted',
          member_hidden: 'member_hidden',
        },
      };
      const connectStatus = select('connect Status', connectionStatusMap[actionType], defaultVal[actionType]);
      const connectionAction = {
        member_hidden: 'hidden',
        member_contacted_today: 'contacted',
        member_contacted: 'contacted',
        member_filtered_contacted: 'filteredContacted',
        profile_accepted: 'theyAccepted',
        profile_declined: 'theyDeclined',
        member_cancelled: 'cancelled',
        member_blocked: 'blocked',
        profile_filtered_contacted: 'theyContacted',
        profile_contacted: 'theyContacted',
        member_accepted: 'accepted',
        member_declined: 'declined',
        profile_cancelled: 'theyCancelled',
        profile_blocked: 'blocked',
      };
      const requestDirection = actionType === 'pending' ? 'in' : select('Request Direction', { in: 'in', out: 'out' }, 'in');

      const memberHidden = connectStatus === 'member_hidden';
      const profileDeleted = boolean('request Deleted', false);
      const hideProfile = boolean('User Hidden', false);
      const profileHiddenReason = hideProfile
        ? select(
            'Hidden Reason',
            {
              selfHidden: 'selfHidden',
              systemHidden: 'systemHidden',
              selfDeleted: 'selfDeleted',
              systemDeleted: 'systemDeleted',
            },
            'selfHidden',
          )
        : null;
      const profilePhotostatus = select(
        'Profile Photo Status',
        {
          noPhoto: 'noPhoto',
          visibleOnAccept: 'visibleOnAccept',
          visibleOnUpgrade: 'visibleOnUpgrade',
          default: 'default',
        },
        'default',
      );
      const photoPath =
        profilePhotostatus !== 'default'
          ? profilePhotostatus === 'noPhoto'
            ? 'https://img2.shaadi.com//imgs/profiles/150-no-border-female.gif'
            : 'https://img1.shaadi.com//2017/12/15/LSH68719273-eeaa5b-male.jpg'
          : 'https://img1.shaadi.com//2017/11/25/3SH08279570-025264-Female.jpg';
      const requestFreeUser = [
        {
          uid: '3SH08279570',
          justNow,
          eoiLoadingStyle: 'none',
          eoiReqType,
          photoLoading: false,
          contact: {
            mask_contact_no: '9876XXXXXX',
            country_code: '+91',
          },
          requests: {
            connect_pending: {
              type: 'connect',
              from: '3SH08279570',
              to: '3SH08279573',
              sent_time: 20171226172405,
              record_date: 20171226172405,
              temp: '87cbacd6847c6598edabe0d14304c6cb',
              isNew: isViewed,
              status: 'contacted',
              direction: requestDirection,
              actionDate: 'few hours ago',
            },
            connect_accepted: {
              type: 'connect',
              from: '3SH08279573',
              to: '3SH08279570',
              sent_time: 20171129211731,
              record_date: 20171129211731,
              total_message_count: 1,
              temp: '0849ac022ac9a422d12145998a81ab74',
              isNew: isViewed,
              status: 'accepted',
              direction: requestDirection,
              actionDate: 'few hours ago',
            },
            connect_filtered: {
              type: 'connect',
              from: '3SH08279573',
              to: '3SH08279570',
              sent_time: 20171129211731,
              record_date: 20171129211731,
              total_message_count: 1,
              temp: '0849ac022ac9a422d12145998a81ab74',
              isNew: isViewed,
              status: 'accepted',
              direction: requestDirection,
              actionDate: 'few hours ago',
            },
            connect_awaiting: {
              type: 'connect',
              from: '3SH08279573',
              to: '3SH08279570',
              sent_time: 20171129211731,
              record_date: 20171129211731,
              total_message_count: 1,
              temp: '0849ac022ac9a422d12145998a81ab74',
              isNew: isViewed,
              status: 'accepted',
              direction: requestDirection,
              actionDate: 'few hours ago',
            },
            connect_deleted: {
              type: 'connect',
              from: '3SH08279573',
              to: '3SH08279570',
              sent_time: 20171129211731,
              record_date: 20171129211731,
              total_message_count: 1,
              temp: '0849ac022ac9a422d12145998a81ab74',
              isNew: isViewed,
              status: 'accepted',
              direction: requestDirection,
              actionDate: 'few hours ago',
            },
          },
        },
      ];
      const inboxData = {
        requestType: {
          type: 'connect',
          action: actionType,
        },
        wwwBaseUrl: 'https://www.shaadi.com',
        loading: false,
        results: {
          displayed_request_id: undefined,
          evt: 'matches-preferred_unviewed',
          evt_ref: 'bWF0Y2hlcy1wcmVmZXJyZWRfdW52aWV3ZWQ=',
          requestType: {
            type: 'connect',
            action: actionType,
          },
          lastSeenInfo: {
            seenDate: 20180109112457,
            affectedRecords: 1,
          },
          items: !noResult
            ? !isPremium
              ? requestFreeUser
              : [
                  {
                    uid: '3SH08279570',
                    justNow,
                    eoiLoadingStyle: 'none',
                    eoiReqType,
                    photoLoading: false,
                    contact: {
                      mask_contact_no: '9876XXXXXX',
                      country_code: '+91',
                    },
                    requests: {
                      connect_pending: {
                        type: 'connect',
                        from: '3SH08279570',
                        to: '3SH08279573',
                        sent_time: 20171226172405,
                        message_id: 'connect-FSH78700288-TSH43043650-9232-6535-1514289245',
                        message:
                          'Hello, I found your profile to be interesting and would like to connect with you. If you like my profile too, kindly accept this Invitation.. Warm Regards, Gurcharan S',
                        record_date: 20171226172405,
                        status: 'contacted',
                        temp: '87cbacd6847c6598edabe0d14304c6cb',
                        isNew: isViewed,
                        direction: requestDirection,
                        actionDate: 'Yesterday',
                      },
                      connect_accepted: {
                        type: 'connect',
                        from: '3SH08279573',
                        to: '3SH08279570',
                        sent_time: 20171129211731,
                        message_id: 'connect-xSH21075103-TSH43043650-1598-7181-1511970451',
                        message:
                          'Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead. Warm Regards, Jaimin S',
                        record_date: 20171129211731,
                        status: 'accepted',
                        total_message_count: 1,
                        temp: '0849ac022ac9a422d12145998a81ab74',
                        isNew: isViewed,
                        direction: requestDirection,
                        actionDate: 'Yesterday',
                      },
                      connect_filtered: {
                        type: 'connect',
                        from: '3SH08279573',
                        to: '3SH08279570',
                        sent_time: 20171129211731,
                        message_id: 'connect-xSH21075103-TSH43043650-1598-7181-1511970451',
                        message:
                          'Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead. Warm Regards, Jaimin S',
                        record_date: 20171129211731,
                        status: 'accepted',
                        total_message_count: 1,
                        temp: '0849ac022ac9a422d12145998a81ab74',
                        isNew: isViewed,
                        direction: requestDirection,
                        actionDate: 'Yesterday',
                      },
                      connect_awaiting: {
                        type: 'connect',
                        from: '3SH08279573',
                        to: '3SH08279570',
                        sent_time: 20171129211731,
                        message_id: 'connect-xSH21075103-TSH43043650-1598-7181-1511970451',
                        message:
                          'Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead. Warm Regards, Jaimin S',
                        record_date: 20171129211731,
                        status: 'accepted',
                        total_message_count: 1,
                        temp: '0849ac022ac9a422d12145998a81ab74',
                        isNew: isViewed,
                        direction: requestDirection,
                        actionDate: 'Yesterday',
                      },
                      connect_deleted: {
                        type: 'connect',
                        from: '3SH08279573',
                        to: '3SH08279570',
                        sent_time: 20171129211731,
                        message_id: 'connect-xSH21075103-TSH43043650-1598-7181-1511970451',
                        message:
                          'Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead. Warm Regards, Jaimin S',
                        record_date: 20171129211731,
                        status: 'accepted',
                        total_message_count: 1,
                        temp: '0849ac022ac9a422d12145998a81ab74',
                        isNew: isViewed,
                        direction: requestDirection,
                        actionDate: 'Yesterday',
                      },
                    },
                  },
                ]
            : [],
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
            verification: {
              count: 3,
              shield_state: 'GREEN',
              derived_text: 'Aadhaar, Facebook and Mobile number Verified',
              verified_proofs: ['Aadhaar Verified', 'Facebook Verified', 'Mobile number Verified'],
            },
            flags: {
              isFree: !isPremium,
              isPremium,
              membershipLevel: isPremium
                ? select(
                    'Membership type ',
                    {
                      Premium: 'Premium',
                      PremiumPlus: 'PremiumPlus',
                      Select: 'Select',
                    },
                    'Premium',
                  )
                : 'Free',
              connectionNote: null,
              connectionError: false,
              connectionStatus: connectionAction[connectStatus],
              connectionAction: connectStatus,
              connectionJustNowText: null,
              contactAction: 'free',
              contactStatus: 'available',
              horoscopeStatus: 'none',
              loading: 'none',
              isDeleted: profileDeleted,
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
              membershipTags: isPremium
                ? select(
                    'Membership Tag ',
                    {
                      premium: 'premium',
                      premiumplus: 'premiumplus',
                      select: 'select',
                      vip: 'vip',
                    },
                    'premium',
                  )
                : 'free',
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
              albumStatus: profilePhotostatus,
              isIndianDiaspora: true,
              isHoroscopeApplicable: true,
              isFamilyGamified: false,
              isAstroReady: false,
              isHidden: hideProfile,
              hiddenReason: hideProfile ? profileHiddenReason : null,
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
            photo: photoPath,
            photoBlur: photoPath,
            photoMedium: photoPath,
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
              infoMapInboxIndian: [
                { key: 'age_height_new_card', label: 'Age / Height / Mother Tongue / Caste', value: '27 yrs, 5\' 6" ,Marathi ,Jat' },
                { key: 'location', label: 'Location', value: 'Mumbai , India' },
                { key: 'education', label: 'Education', value: 'Masters - Engineering/ Technology' },
                { key: 'profession', label: 'Profession / Income', value: 'Admin Professional , Earns INR 4-7 Lakh anually' },
              ],
              infoMapInboxNri: [
                { key: 'age_height_new_card', label: 'Age / Height / Mother Tongue / Religion', value: '27 yrs, 5\' 6" ,Marathi ,Sikh' },
                { key: 'location', label: 'Location', value: 'Mumbai , India' },
                { key: 'education', label: 'Education', value: 'Masters - Engineering/ Technology' },
                { key: 'profession', label: 'Profession / Income', value: 'Admin Professional , Earns INR 4-7 Lakh anually' },
              ],
              listAlbum: ['https://img1.shaadi.com//2017/02/06/nSH52553530-46f21a.jpg'],
              gridAlbum: ['https://img1.shaadi.com//2017/11/26/7SH24005826-47b416-female.jpg'],
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
              isDeleted: profileDeleted,
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
          isBothPartyPayUser: isBothPartyPay,
          isFamilyGamified: false,
          isHidden: memberHidden,
          isMobileVerified: false,
          isPaidUser: isMemberPaid,
          isUnderScreening: false,
          mobileNumber: '',
          showUpgradeBanner: false,
          showUpgradeLinks: true,
          experiments: experimentsProps,
        },
        listStyle: 'inboxCard',
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

      return noResult ? (
        <NoResult
          source="inbox"
          sourceType={`${inboxData.results.requestType.type}_${inboxData.results.requestType.action}`}
          count={{ connect_pending: 0 }}
        />
      ) : (
        <InboxList {...inboxData} />
      );
    });
};

export { inboxInvite };
