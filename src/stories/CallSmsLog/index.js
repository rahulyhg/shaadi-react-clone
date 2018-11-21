import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import initializeStore from '../../store';
import ContactSummaryItem from '../../components/ContactSummaryItem';
import NoResult from '../../components/Common/NoResult';

const store = initializeStore();

const callSmsLog = () => {
  storiesOf('Call SMS Log', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('Call Details', () => {
      const isPremium = boolean('Paid User', false);
      const isSms = boolean('SMS', false);
      const ifClickOnViewSms = boolean('Click on View SMS', false);
      const isMemberPaid = true;
      const isBothPartyPay = !isMemberPaid ? boolean('Both Part Pay', false) : false;
      const noResult = boolean('Zero result', false);
      const isMobileNumber = boolean('Mobile Number', true);
      const isMobileVerified = boolean('Mobile Verified', true);
      const isTelephoneNumber = boolean('Telephone Number', false);
      const isTelephoneVerified = boolean('Telephone Verified', false);
      const relationShipOfProfile = boolean('Relationship of Contact Person', false);
      const nameOfContactPerson = boolean('Name of Contact Person', false);
      const isDoNotDisturbMode = select(
        'DND',
        {
          Yes: 'Yes',
          No: 'No',
        },
        'No',
      );
      const isConvenientTimeToCall = boolean('Convenient Time to call', false);

      const gender = select(
        'gender',
        {
          Male: 'Male',
          Female: 'Female',
        },
        'Female',
      );

      const ContactDetailsStatus = select(
        'Contact Details Status',
        {
          sameGender: 'sameGender',
          currentlyUnderScreening: 'currentlyUnderScreening',
          hidden: 'hidden',
          theyCancelled: 'theyCancelled',
          theyDeclined: 'theyDeclined',
          theyFiltered: 'theyFiltered',
          notVerified: 'notVerified',
          availableOnRequest: 'availableOnRequest',
          numberHiddenByMember: 'numberHiddenByMember',
          available: 'available',
          contactDetailNotVerifiedRequested: 'contactDetailNotVerifiedRequested',
          contactDetailNotVerifiedRequest: 'contactDetailNotVerifiedRequest',
          membershipContactLimitExceeded: 'membershipContactLimitExceeded',
          maxContactLimitExceeded: 'maxContactLimitExceeded',
          theyCurrentlyUnderScreening: 'theyCurrentlyUnderScreening',
          blocked: 'blocked',
          cancelled: 'cancelled',
          declined: 'declined',
          theyBlocked: 'theyBlocked',
          theyHidden: 'theyHidden',
          disabled: 'disabled',
          theyAccepted: 'theyAccepted',
          theyContacted: 'theyContacted',
          accepted: 'accepted',
          contacted: 'contacted',
          filteredContacted: 'filteredContacted',
          none: 'none',
        },
        'available',
      );

      const profileBlockHiddenReasonStatus = {
        selfHidden: 'selfHidden',
        systemHidden: 'systemHidden',
        selfDeleted: 'selfDeleted',
        systemDeleted: 'systemDeleted',
        defaultDeleted: 'defaultDeleted',
      };

      const ContactDetailsStatusTitleMap = {
        available: {
          available: 'available',
          visibleOnUpgrade: 'visibleOnUpgrade',
          locked: 'locked',
          contactDetailNotVerifiedRequested: 'contactDetailNotVerifiedRequested',
        },
        theyBlocked: profileBlockHiddenReasonStatus,
        theyHidden: profileBlockHiddenReasonStatus,
        disabled: { none: 'none' },
        theyDeclined: { theyDeclined: 'theyDeclined' },
        theyCancelled: { theyCancelled: 'theyCancelled' },
        availableOnRequest: { availableOnRequest: 'availableOnRequest' },
        sameGender: { sameGender: 'sameGender' },
        currentlyUnderScreening: { currentlyUnderScreening: 'currentlyUnderScreening' },
        theyFiltered: { theyFiltered: 'theyFiltered' },
        notVerified: { notVerified: 'notVerified' },
        numberHiddenByMember: { numberHiddenByMember: 'numberHiddenByMember' },
        contactDetailNotVerifiedRequested: { contactDetailNotVerifiedRequested: 'contactDetailNotVerifiedRequested' },
        contactDetailNotVerifiedRequest: { contactDetailNotVerifiedRequest: 'contactDetailNotVerifiedRequest' },
        membershipContactLimitExceeded: { membershipContactLimitExceeded: 'membershipContactLimitExceeded' },
        max_contact_limit_exceeded: { max_contact_limit_exceeded: 'max_contact_limit_exceeded' },
        maxContactLimitExceeded: { maxContactLimitExceeded: 'maxContactLimitExceeded' },
        theyCurrentlyUnderScreening: { theyCurrentlyUnderScreening: 'theyCurrentlyUnderScreening' },
        accepted: { accepted: 'accepted' },
        contacted: { contacted: 'contacted' },
        blocked: { blocked: 'blocked' },
        cancelled: { cancelled: 'cancelled' },
        declined: { declined: 'declined' },
        theyAccepted: { theyAccepted: 'theyAccepted' },
        theyContacted: { theyContacted: 'theyContacted' },
        filteredContacted: { filteredContacted: 'filteredContacted' },
        hidden: { hidden: 'hidden' },
      };

      const ContactDetailsStatusTitle = select(
        'Contact Details Status Title',
        ContactDetailsStatusTitleMap[ContactDetailsStatus],
        ContactDetailsStatus,
      );

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
        },
        filtered: {
          profile_contacted: 'profile_contacted',
          member_hidden: 'member_hidden',
        },
      };
      const connectStatus = select('connect Status', connectionStatusMap[actionType], defaultVal[actionType]);

      // const requestDirection = actionType === 'pending' ? 'in' : select('Request Direction', { in: 'in', out: 'out' }, 'in');

      const memberHidden = connectStatus === 'member_hidden';

      const profilePhotostatus = select(
        'Profile Photo Status',
        {
          default: 'default',
          photo_request: 'photo_request',
          photo_request_sent: 'photo_request_sent',
          add_photo: 'add_photo',
          only_when_i_contact: 'only_when_i_contact',
          when_i_contact: 'when_i_contact',
          coming_soon: 'coming_soon',
        },
        'default',
      );
      const profilePhotoTooltip = profilePhotostatus === 'photo_request' ? boolean('Click on Photo for Tooltip', false) : '';

      const closeTooltip = profilePhotoTooltip ? boolean('Close Photo for Tooltip', false) : '';

      const profileConnectContactStatus = select(
        'Profile connect contact status',
        {
          disabled: 'disabled',
          sameGender: 'sameGender',
          hidden: 'hidden',
          contacted: 'contacted',
          filteredContacted: 'filteredContacted',
          theyAccepted: 'theyAccepted',
          theyDeclined: 'theyDeclined',
          cancelled: 'cancelled',
          blocked: 'blocked',
          theyContacted: 'theyContacted',
          accepted: 'accepted',
          declined: 'declined',
          theyCancelled: 'theyCancelled',
          theyBlocked: 'theyBlocked',
          availableOnRequest: 'availableOnRequest',
          none: 'none',
        },
        'contacted',
      );
      const photoCursorCondition = {
        show_photo: true,
        photo_request: true,
        photo_request_sent: false,
        add_photo: false,
        only_when_i_contact: false,
        when_i_contact: false,
        coming_soon: false,
        enter_password: false,
        password_request_sent: false,
      };

      const photoPath = {
        show_photo: 'https://img1.shaadi.com/2014/12/07/sheebafatima83-b11915.jpg',
        add_photo: 'https://img2.shaadi.com/imgs/profiles/60-request-photo-f.gif',
        only_when_i_contact: 'https://img1.shaadi.com//2017/12/15/LSH68719273-eeaa5b-male.jpg',
        when_i_contact: 'https://img1.shaadi.com//2017/12/15/LSH68719273-eeaa5b-male.jpg',
        default: 'https://img2.shaadi.com/imgs/profiles/60-request-photo-f.gif',
        photo_request: 'https://img2.shaadi.com/imgs/profiles/60-request-photo-f.gif',
        photo_request_sent: 'https://img2.shaadi.com/imgs/profiles/60-photo-request-sent-f.gif',
        coming_soon: 'https://img2.shaadi.com/imgs/profiles/60-photo-coming-soon-f.gif',
      };

      // const requestFreeUser = [];
      const callItemData = {
        profileData: {
          base: {
            infoMap: [
              { key: 'info-0', label: 'Age / Height', value: '26, 5\' 9"' },
              { key: 'info-1', label: 'Religion/Community', value: 'Hindu, Not Specified' },
              { key: 'info-2', label: 'Mother Tounge', value: 'Hindi' },
              { key: 'info-3', label: 'Profession', value: 'Not Specified' },
              { key: 'info-4', label: 'Location', value: 'Purnia, India' },
            ],
            infoList: [],
            detailList: [],
            premiumInfo: [],
            miniList: [],
            miniNriList: [],
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
            connectionNote: "Invitation sent on 13 Feb 2018. She hasn't Viewed your Invitation yet.",
            connectionError: false,
            connectionStatus: 'member_contacted',
            connectionAction: connectStatus,
            connectionJustNowText: null,
            contactAction: 'available',
            contactStatus: 'available',
            horoscopeStatus: 'none',
            loading: 'none',
            isDeleted: false,
            isNri: false,
            isWatermarked: false,
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
            albumStatus: profilePhotostatus === 'photo_request' ? 'noPhoto' : profilePhotostatus,
            isIndianDiaspora: true,
            isHoroscopeApplicable: true,
            isFamilyGamified: false,
            isAstroReady: false,
            isHidden: 'N',
            hiddenReason: '',
            isBothPartyPayUser: isBothPartyPay,
          },
          presence: {
            onlineStatus: 'invisible',
            onlineStatusDetails: '...',
            onlineAt: 1518505870000,
            device: 'mobile_native-android',
            platform: 'mobile',
            lastOnline: 'Online on Android App',
            lastOnlineDetails: 'Online now',
            ready: false,
            chatIcon: 'app_online',
          },

          summary: {
            infoMap: [],
            infoMapNonIndian: [],
            infoMapIndian: [],
            infoMapNri: [],
            listAlbum: [],
            gridAlbum: [],
            shortBio:
              "Hi, thank you for visiting my daughter's profile.\rShe has completed her High school.My daughter is a beautiful, intelligent and family oriented person with a good value system.She is looking for a boy who is able to spend a good and happy life with her.",
            createdBy: 'Parent / Guardian',
            profileCreatedBy: 'Parent',
            shortlistCount: -1,
          },
          detailed: {
            album: [],
            infoMap: [],
            about: {
              title: 'About',
              icon: 'about',
              desc: '',
            },
            lifestyle: {
              title: 'Lifestyle & Appearance',
              icon: 'lifestyle',
              items: [],
            },
            interests: {
              title: 'Interests & More',
              icon: 'interests',
              items: [],
            },
            background: {
              title: 'Background',
              icon: 'background',
              items: [],
            },
            education: {
              title: 'Education & Career',
              icon: 'education',
              items: [],
              hasCollegeOrEmployer: false,
            },
            horoscope: {
              title: 'Horoscope Details',
              icon: 'astro',
              isGamified: false,
              items: [],
            },
            family: {
              title: 'Family Details',
              icon: 'family',
              isGamified: false,
              desc: '',
            },
            preferences: {
              title: 'Preferences Details',
              icon: 'preferences',
              isGamified: false,
              items: [],
            },
            trustBadges: [],
            commonInterests: [],
          },
          requests: {
            count: 0,
            items: [],
          },
          shortlists: {
            selected: [],
            ready: false,
            count: 0,
          },
          photos: {
            count: 0,
            items: [],
            status: '',
            hasPhotos: false,
            canAddPhotos: false,
            isDefault: true,
            isRejectedPhotosFetched: false,
          },
          astro: {
            details: {},
            chart: {},
            hasAstro: false,
          },
          privacy: {},
          contactSummary: {
            sms: isSms
              ? 'Msg from Magan M (SH92265540): Hi, I liked the Profile that you have posted on Shaadi.com. Please visit my Profile and respond.'
              : '',
            contact: {
              profileid: 'eSH50999407',
              convenient_time: '',
              from_time_hours: isConvenientTimeToCall ? '23' : 0,
              from_time_min: isConvenientTimeToCall ? '12' : 0,
              last_update_date: 20180213123944,
              mob_isd: '+91',
              mob_std: '',
              mobile: isMobileNumber ? 8459456792 : '',
              mobile_country: 'India',
              mobile_verified: isMobileVerified ? 'Y' : 'N',
              name: nameOfContactPerson ? 'Jayesh R' : '',
              relation: relationShipOfProfile ? 'Self' : '',
              tel_isd: '+91',
              tel_std: '',
              telephone: isTelephoneNumber ? '34562345' : '',
              telephone_country: 'India',
              telephone_verified: isTelephoneVerified ? 'Y' : 'N',
              timezone: '',
              to_time_hours: isConvenientTimeToCall ? '7' : 0,
              to_time_min: isConvenientTimeToCall ? '0' : 0,
              contact_details_status: ContactDetailsStatus,
              contact_details_title_status: ContactDetailsStatusTitle,
            },
            actionDate: 'few hours ago',
            dnd: isDoNotDisturbMode === 'Yes' ? 'Y' : 'N',
            hidden: 'N',
            hiddenReason: null,
            tempKey: 'b347b3041bdcdd26a11d23a30e97f356',
            contactType: 'Contact_viewed',
            photoStatus: profilePhotostatus,
            photoCount: 0,
            profileContactStatus: profileConnectContactStatus,
            contactDetailsStatusString: ContactDetailsStatus,
            contactDetailsStatusTitleString: ContactDetailsStatusTitle,
          },
          thumbnailBlur: photoPath[profilePhotostatus],
          thumbnail: photoPath[profilePhotostatus],
          photoBlur: photoPath[profilePhotostatus],
          photo: photoPath[profilePhotostatus],
          fullPhotoBlur: photoPath[profilePhotostatus],
          fullPhoto: photoPath[profilePhotostatus],
          drAction: {},
          heShe: 'She',
          himHer: 'Her',
          hisHer: 'Her',
          gender: 'Female',
          tempId: '',
          se: '850702d25e3500fd5b418bb76dd4b159',
          uid: 'eSH50999407',
          name: 'Shankar Sharma',
          fullName: 'Shankar Sharma',
          firstName: 'Shankar',
          lastName: 'Sharma',
          slug: 'eSH50999407',
          userHandle: 'SH50999407',
          location: 'Purnia, India',
          mrMs: 'Ms.',
        },
        meta: {
          loading: false,
          results_id: 'contacts:8955d5e713c7b185acc135ca00d23edf',
          total: 63,
          page: '1',
          pages: 7,
          permaLink: '/inbox/contact-summary',
        },
        connectInfo: {
          uid: 'eSH50999407',
          justNow: false,
          photoLoading: false,
          displayStatusMessage: '',
        },
        settings: {
          defaultSearchFormat: 'list',
          isPaidUser: isMemberPaid,
          showUpgradeBanner: false,
          canAccessChat: true,
          canInitiateChat: true,
          hasUploadedPhoto: true,
          canConnectWithMessage: true,
          showUpgradeLinks: false,
          canSendPasswordOnConnect: false,
          contactsTotal: 150,
          contactsRemaining: 87,
          isUnderScreening: false,
          isAstroGamified: false,
          gender,
          canViewCollegeAndEmployer: true,
          canViewHoroscope: false,
          horoscopeStyle: 'l/ENG/hs/1',
          isFamilyGamified: false,
          isHidden: memberHidden,
          isBothPartyPayUser: false,
          isMobileVerified,
          mobileNumber: '9699259697',
          wasPaidUser: false,
          expiryDate: '04-Jul-18',
          isNri: false,
          isIndianDiaspora: true,
          membershipTags: 'diamond',
          offerCode: 'flat15r',
          offer_details: [],
        },
        changeCursorStatus: profilePhotostatus === 'photo_request' ? 'true' : photoCursorCondition[profilePhotostatus],
        viewSmsShowStatus: !!ifClickOnViewSms,
        type: 'profile',
        wwwBaseUrl: 'https://www.shaadi.com',
        albumUrl: 'https://www.shaadi.com/profile/index/view-album-photos/profileid/sheebafatima83',
        tooltip: profilePhotoTooltip
          ? {
              key: '-contactSummary-photo-uid-oSH42761430--1519040254342',
              page: 'contactSummary',
              position: 'photo',
              title: null,
              body: [
                {
                  key: 'para-0',
                  items: [
                    {
                      key: 's-0.0',
                      type: 'text',
                      text: 'You cannot send a photo request as this Profile is hidden.',
                      url: null,
                    },
                  ],
                },
              ],
              loading: false,
              uid: 'oSH42761430',
              isFreeToast: false,
            }
          : {
              key: 'none',
              page: 'none',
              position: 'none',
              title: null,
              body: [],
              loading: false,
            },
        doProfileAction: () => {},
        onTooltipClose: () => {},
        isTooltipVisible: !!(profilePhotoTooltip && !closeTooltip),
        loading: !!(profilePhotoTooltip && !closeTooltip),
      };

      //   const emptyCallItemData = { ...callItemData };
      return noResult ? <NoResult source="contactSummaryItem" /> : <ContactSummaryItem {...callItemData} />;
    });
};

export { callSmsLog };
