import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import ContactCard from '../../ContactCard/upgradeText';

jest.mock('../../../Common/Link');

describe('Upgrade Text', () => {
  const onViewPhoneNoClick = jest.fn();
  const props = { ...factory.contactCardProps, onViewPhoneNoClick };

  it('should show upgrade now text for free user', () => {
    const contactCardProps = { ...props, isPremiumMember: false, isFreeMember: true };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(contactCard.text()).toContain('Upgrade Now');
  });

  it('should show Profile Decline message on contactCard', () => {
    const contactCardProps = { ...props, isPremiumMember: true, isFreeMember: false, connectionStatus: 'theyDeclined', heShe: 'He' };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(contactCard.text()).toContain('He Declined your Invitation');
  });

  it('should show Member Decline message on contactCard', () => {
    const contactCardProps = { ...props, isPremiumMember: true, isFreeMember: false, connectionStatus: 'declined', heShe: 'He' };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(contactCard.text()).toContain('Declined Member');
  });

  it('contactCard : Profile Cancel', () => {
    const contactCardProps = {
      ...props,
      isPremiumMember: true,
      isFreeMember: false,
      connectionStatus: 'theyCancelled',
      heShe: 'He',
      himHer: 'his',
    };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(contactCard.text()).toContain('He cancelled his invitation to you');
  });

  it('contactCard : Member Cancel', () => {
    const contactCardProps = {
      ...props,
      isPremiumMember: true,
      isFreeMember: false,
      connectionStatus: 'cancelled',
      heShe: 'He',
      himHer: 'his',
    };
    const contactCard = mount(<ContactCard {...contactCardProps} />);
    expect(contactCard.text()).toContain('Cancelled Member');
  });
});
