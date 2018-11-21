import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import ContactCard from '../../ContactCard';

jest.mock('../../../Common/Link');

describe('ContactCard', () => {
  const onViewPhoneNoClick = jest.fn();
  const props = { ...factory.contactCardProps, onViewPhoneNoClick };
  describe('ContactCard : Render', () => {
    it('Contact Card Details', () => {
      const contactCard = mount(<ContactCard {...props} />);
      expect(contactCard.find('ContactDetails').exists()).toBe(true);
      expect(
        contactCard
          .find('ContactDetails')
          .find('ProfileCardIcon')
          .exists(),
      ).toBe(true);
      expect(
        contactCard
          .find('ContactDetails')
          .find('NumberText')
          .exists(),
      ).toBe(true);
      expect(
        contactCard
          .find('ContactDetails')
          .find('ProfileCardIcon')
          .exists(),
      ).toBe(true);
    });
  });

  describe('contactCard : Without Mobile Number', () => {
    const contactCardProps = { ...props, contactNumber: '' };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_mobile_icon')
        .exists(),
    ).toBe(false);
  });

  describe('contactCard : Free Member', () => {
    const contactCardProps = { ...props, contactNumber: '' };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_lock_icon')
        .exists(),
    ).toBe(true);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_view_icon')
        .exists(),
    ).toBe(false);
  });

  describe('contactCard : Premium Member', () => {
    const contactCardProps = { ...props, isPremiumMember: true, isFreeMember: false };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_lock_icon')
        .exists(),
    ).toBe(false);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_view_icon')
        .exists(),
    ).toBe(true);
    contactCard
      .find('#data_test_view_icon')
      .at(1)
      .simulate('click');
  });

  describe('contactCard : Free Member eligible to view contact as per SKU logic', () => {
    const contactCardProps = { ...props, isPremiumMember: false, isFreeMember: true, canCommunicate: true };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_lock_icon')
        .exists(),
    ).toBe(false);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_view_icon')
        .exists(),
    ).toBe(true);
    contactCard
      .find('#data_test_view_icon')
      .at(1)
      .simulate('click');
  });

  describe('contactCard - View Btn : declined Status', () => {
    const contactCardProps = {
      ...props,
      isPremiumMember: true,
      isFreeMember: false,
      connectionStatus: 'theyDeclined',
      heShe: 'He',
      himHer: 'his',
    };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_cancel_icon')
        .exists(),
    ).toBe(true);
  });

  describe('contactCard - View Btn : Accept Status', () => {
    const contactCardProps = {
      ...props,
      isPremiumMember: true,
      isFreeMember: false,
      connectionStatus: 'accepted',
      heShe: 'He',
      himHer: 'his',
    };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(
      contactCard
        .find('ContactDetails')
        .find('#data_test_view_icon')
        .exists(),
    ).toBe(true);
  });
});
