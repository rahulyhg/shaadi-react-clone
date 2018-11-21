import React from 'react';
import { mount } from 'enzyme';
import PremiumMessageDisplay from '../../PremiumMessageDisplay';
import factory from './factory';

jest.mock('../../Common/Link');

describe('Contacted Profile Personalised Message', () => {
  it('Should be masked for both party  A case users', () => {
    const PremiumMessageDisplayProps = {
      ...factory.props,
      item: {
        ...factory.props.item,
        connectMessages: [
          {
            message_id: 'connect-ISH79311668-kSH85654205-3657-6515-1539672595',
            message: 'In the Interest of our Premium Members, we allow only Premium or Verified users to read messages',
            type: 'connect',
            media_url: '',
            fullDate: '16 Oct 2018',
            category: 'received',
          },
        ],
      },
    };
    const PremiumMessageDisplayMount = mount(<PremiumMessageDisplay {...PremiumMessageDisplayProps} />);
    expect(PremiumMessageDisplayMount.text()).toContain(
      'In the Interest of our Premium Members, we allow only Premium or Verified users to read messages',
    );
  });
  it('Should be visible to non - both party users or both party  B case users', () => {
    const PremiumMessageDisplayProps = { ...factory.props };
    const PremiumMessageDisplayMount = mount(<PremiumMessageDisplay {...PremiumMessageDisplayProps} />);
    expect(PremiumMessageDisplayMount.text()).toContain(
      'Hello, I found your profile to be interesting and would like to connect with you. If you like my profile too',
    );
  });
});
