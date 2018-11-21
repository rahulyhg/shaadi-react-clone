import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import initializeStore from '../../store';
import ContactDetails from '../../components/Modal/ContactDetails';
import ReportPhoneNo from '../../components/Modal/ContactDetails/reportPhoneNo';
import ThankYouPage from '../../components/Modal/ContactDetails/thankYouPage';

const store = initializeStore();

const contactDetail = () => {
  storiesOf('ContactDetail Modal ', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('ThankYou modal', () => {
      const thankYouProps = {
        onModalClose() {},
        data: {
          uid: '9SH93735877',
          content: `This phone number has been reported as invalid; will be investigated further.
                               This contact has been added back to your balance.`,
        },
      };

      return <ThankYouPage {...thankYouProps} />;
    })
    .add('reportPhone modal', () => {
      const reportPhoneProps = {
        onModalClose() {},
        doProfileAction() {},
        data: {
          uid: '9SH93735877',
        },
      };

      return <ReportPhoneNo {...reportPhoneProps} />;
    })
    .add('Default', () => {
      const isSmsSend = boolean('SMS send', false);
      const isMisuseReported = boolean('Report Misuse', false);
      const connectionStatus = select(
        'connection status',
        {
          default: 'default',
          contacted: 'contacted',
          theyContacted: 'theyContacted',
          accepted: 'accepted',
          declined: 'declined',
          theyAccepted: 'theyAccepted',
          cancelled: 'cancelled',
        },
        'default',
      );

      const flashType = select(
        'flash type',
        {
          default: 'default',
          success: 'success',
          loading: 'loading',
          fatal: 'fatal',
        },
        isSmsSend ? 'success' : 'default',
      );

      const flashMsg = {
        default: '',
        loading: '',
        success: 'Your SMS has been sent successfully.',
        fatal: 'You have exceeded your daily limit of 10 contact details view on Shaadi.com. Please try again tomorrow.',
      };

      const flash = isSmsSend ? flashMsg.success : '';

      const profilePhotostatus = select(
        'Profile Photo Status',
        {
          default: 'default',
          show_photo: 'show_photo',
          photo_request: 'photo_request',
          photo_request_sent: 'photo_request_sent',
          add_photo: 'add_photo',
          only_when_i_contact: 'only_when_i_contact',
          when_i_contact: 'when_i_contact',
          coming_soon: 'coming_soon',
        },
        'show_photo',
      );

      const contactStatus = select(
        'contact Status',
        {
          available: 'available',
          free: 'free',
          filtered: 'filtered',
          member_blocked: 'member_blocked',
          profile_declined: 'profile_declined',
          member_declined: 'member_declined',
          member_hidden: 'member_hidden',
          filteredMemberContacted: 'filteredMemberContacted',
          profileCancelled: 'profileCancelled',
          availableOnMemberVerification: 'availableOnMemberVerification',
          availableOnVerification: 'availableOnVerification',
          lockedMemberAccepted: 'lockedMemberAccepted',
          locked: 'locked',
          availableOnRequest: 'availableOnRequest',
        },
        'available',
      );

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

      const contactDetailsData = {
        onModalClose() {},
        doProfileAction() {},
        wwwBaseUrl: 'https://www.shaadi.com',
        data: {
          loading: false,
          disabled: !!isSmsSend,
          flash,
          flashType,
          uid: '9SH93735877',
          self: null,
          name: 'Snehal Vardam',
          hisHer: 'Her',
          heShe: 'She',
          himHer: 'Her',
          message:
            'Msg from Magan M (SH92265540): Hi, I liked the Profile that you have posted on Shaadi.com. Please visit my Profile and respond.',
          preferredName: '-',
          preferredTime: ' - ',
          landline: '-',
          mobile: '+91  8149220857',
          status: contactStatus,
          eoiFailed: false,
          verificationRequested: false,
          source: 'profile',
          photo: photoPath[profilePhotostatus],
          photoBlur: photoPath[profilePhotostatus],
          email: 'snehalvardam1@gmail.com',
          profileCreatedBy: 'Sibling',
          profileAlbumStatus: 'default',
          isMisuseReported,
        },
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
          contactsTotal: 150,
          contactsRemaining: 55,
          isUnderScreening: false,
          isAstroGamified: false,
          gender: 'Male',
          canViewCollegeAndEmployer: true,
          canViewHoroscope: false,
          horoscopeStyle: 'l/ENG/hs/1',
          isFamilyGamified: false,
          isHidden: false,
          isBothPartyPayUser: false,
          isMobileVerified: true,
          mobileNumber: '9699259697',
          wasPaidUser: false,
          expiryDate: '04-Jul-18',
          isNri: false,
          isIndianDiaspora: true,
          mobileCountry: 'India',
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
            profile_verification: {
              bucket: 'C',
            },
          },
          membershipTags: 'diamond',
          offerCode: 'flat15r',
          offer_details: [
            {
              type: 'perc',
              value: 15,
            },
          ],
        },
        connectionFlags: {
          isFree: true,
          isPremium: false,
          membershipLevel: 'Free',
          connectionNote: "Invitation sent on 20 Feb 2018. She hasn't Viewed your Invitation yet.",
          connectionError: false,
          connectionStatus,
          connectionAction: 'member_contacted_today',
          contactAction: 'available',
          contactStatus,
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
          showHistory: true,
          membershipTags: 'free',
          isNameLocked: false,
          canCallSendSMS: false,
          canSendEmail: true,
          canSendEmailReminder: false,
          canSendSMS: false,
          canViewPhoneNo: true,
          isPhoneNoViewed: true,
          isSmsAlreadySent: false,
          showChatNow: true,
          showPostOnWall: false,
          isFiltered: false,
          isSkipped: false,
          isProfileViewed: true,
          horoscopeStyle: 'l//hs/1',
          albumStatus: 'default',
          isIndianDiaspora: true,
          isHoroscopeApplicable: true,
          isFamilyGamified: false,
          isAstroReady: false,
          isHidden: false,
          hiddenReason: null,
          isBothPartyPayUser: false,
        },
      };

      return <ContactDetails {...contactDetailsData} />;
    });
};

export { contactDetail };
