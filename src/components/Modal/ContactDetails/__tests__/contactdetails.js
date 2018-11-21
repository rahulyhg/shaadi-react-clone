/* eslint camelcase: 0 */
import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import ContactDetails from '../../ContactDetails';

jest.mock('../../../Common/Link');

describe('View Phone cases', () => {
  describe('default modal', () => {
    const ContactDetailsProps = factory.props;
    it('should render default view on default status', () => {
      const ContactDetailsWrapper = mount(<ContactDetails {...ContactDetailsProps} />);
      expect(ContactDetailsWrapper.find('img').length).toEqual(1);
      const email =
        ContactDetailsProps.data.email.length < 22 ? ContactDetailsProps.data.email : `${ContactDetailsProps.data.email.substr(0, 20)}...`;
      expect(ContactDetailsWrapper.text()).toContain(`${ContactDetailsProps.data.name}`);
      expect(ContactDetailsWrapper.text()).toContain(`Profile created by ${ContactDetailsProps.data.profileCreatedBy}`);
      expect(ContactDetailsWrapper.text()).toContain('An invitation to connect will be sent along with the SMS');
      expect(ContactDetailsWrapper.text()).toContain('Report Phone Number');
      expect(ContactDetailsWrapper.text()).toContain(`${ContactDetailsProps.data.mobile}`);
      expect(ContactDetailsWrapper.text()).toContain(email);
    });
    it('should render send sms success message & invitation sent msg', () => {
      const dynamicProps = {
        ...ContactDetailsProps,
        data: { ...ContactDetailsProps.data, disabled: true, flash: 'Your SMS has been sent successfully.', flashType: 'success' },
        connectionFlags: { ...ContactDetailsProps.connectionFlags, connectionStatus: 'contacted' },
      };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.text()).toContain('An invitation to connect has been sent.');
      expect(ContactDetailsWrapper.text()).toContain('Your SMS has been sent successfully.');
    });
    it('should not allow to re-report phone misuse', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, isMisuseReported: true } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.text()).toContain('You have already reported this number.');
    });
    it('should render upgrade now view on sku contact exceeded status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'sku_contact_exceeded' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="sku_contact_exceeded"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `You have exceeded your contact limit. To view ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details, become a Premium member.Upgrade Now`,
      );
    });
    it('should render filtered message for filtered status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'filtered' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="filtered"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `${
          ContactDetailsProps.data.heShe
        } has Filtered your Profile. You can express Interest in ${ContactDetailsProps.data.hisHer.toLowerCase()} and contact ${ContactDetailsProps.data.hisHer.toLowerCase()} once ${ContactDetailsProps.data.heShe.toLowerCase()} Accepts your Invitation.Connect`,
      );
    });
    it('should render blocked message for member blocked status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'member_blocked' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="member_blocked"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(`You cannot view contact detail of Blocked Members`);
    });
    it('should render profile declined message for profile_declined status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'profile_declined' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="profile_declined"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text())
        .toContain(`You cannot view ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details as ${ContactDetailsProps.data.heShe.toLowerCase()} has Declined your Invitation.
        We will notify you if ${ContactDetailsProps.data.heShe.toLowerCase()} changes ${ContactDetailsProps.data.hisHer.toLowerCase()} mind.`);
    });
    it('should render member declined message for member_declined status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'member_declined' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="member_declined"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `${
          ContactDetailsProps.data.heShe
        } had made ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details "Visible on Accept". Please Accept ${ContactDetailsProps.data.hisHer.toLowerCase()} Invitation to view ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details.`,
      );
    });
    it('should render member hidden message for member_hidden status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'member_hidden' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="member_hidden"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `Your Profile is currently hidden. To view contact detail of other Members, make your profile visible.`,
      );
    });
    it('should render filtered contacted message for filteredMemberContacted status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'filteredMemberContacted' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="filteredMemberContacted"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `You cannot view ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details as ${ContactDetailsProps.data.heShe.toLowerCase()} has Filtered you out.`,
      );
    });
    it('should render availableOnMemberVerification message for availableOnMemberVerification status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'availableOnMemberVerification' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.find('div[data-contactmodaltype="availableOnMemberVerification"]').exists()).toBe(true);
      expect(ContactDetailsWrapper.text()).toContain(
        `You can view ${ContactDetailsProps.data.hisHer.toLowerCase()} contact details after you Verify your own Phone number. Verifying your Phone number builds trust in your Profile and helps us send you important notifications regarding your Shaadi.com Profile.`,
      );
    });
    it('should render verification requested message', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, verificationRequested: true } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      expect(ContactDetailsWrapper.text()).toContain(`Your request for verifying contact number has been sent to the member.`);
    });
    it('should show sms icon for loggedin member for show all status', () => {
      const dynamicProps = { ...ContactDetailsProps, data: { ...ContactDetailsProps.data, status: 'available' } };
      const ContactDetailsWrapper = mount(<ContactDetails {...dynamicProps} />);
      const button = ContactDetailsWrapper.find(`button[title="Send to Your Phone"]`);
      expect(button.length).toBe(1);
    });
    it('should show mobile verification popup if logger contact not verified', () => {
      const getSMS = jest.fn();
      const verificationProps = {
        ...ContactDetailsProps,
        getSMS,
        data: { ...ContactDetailsProps.data, status: 'logger_mobile_unverified', isLoggerMobileVerified: false },
      };
      const ContactDetailsWrapper = mount(<ContactDetails {...verificationProps} />);
      getSMS();
      expect(getSMS).toHaveBeenCalled();
      expect(ContactDetailsWrapper.text()).toContain(
        `Your number is not verified. To receive ${ContactDetailsProps.data.name}'s contact details over SMS, kindly verify your number.`,
      );
    });

    it('should show view contact note for free user when diamond plus user set phone setting show to all', () => {
      const contactProps = {
        ...ContactDetailsProps,
        settings: { ...ContactDetailsProps.settings, isPaidUser: false },
        data: { ...ContactDetailsProps.data, membershipTags: 'diamond_plus', loggerMembership: 'Free', status: 'showToFreeAndPremium' },
      };
      const ContactDetailsWrapper = mount(<ContactDetails {...contactProps} />);
      expect(ContactDetailsWrapper.text()).toContain(`This Diamond+ Member has chosen to make her contact details visible to you`);
    });

    it('should show view contact note for premium user when diamond plus user set phone setting show to all', () => {
      const contactProps = {
        ...ContactDetailsProps,
        settings: { ...ContactDetailsProps.settings, isPaidUser: true },
        data: { ...ContactDetailsProps.data, membershipTags: 'diamond_plus', status: 'showToFreeAndPremium' },
      };
      const ContactDetailsWrapper = mount(<ContactDetails {...contactProps} />);
      expect(ContactDetailsWrapper.text()).toContain(`Your contact count has not reduced`);
    });

    it('should show view contact note for platinum and diamond user when diamond plus profile set phone setting show to all', () => {
      const contactProps = {
        ...ContactDetailsProps,
        data: { ...ContactDetailsProps.data, loggerMembership: 'Diamond', membershipTags: 'diamond_plus' },
      };
      const ContactDetailsWrapper = mount(<ContactDetails {...contactProps} />);
      expect(ContactDetailsWrapper.text()).toContain(`Your contact count has not reduced.`);
    });
  });
});
