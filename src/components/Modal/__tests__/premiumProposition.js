import React from 'react';
import { mount } from 'enzyme';
import PremiumProposition from '../premiumProposition';

import factory from './utils/premiumPropositionFactory';

jest.mock('../../Common/Link');

describe('premiumProposition popup', () => {
  const onAction = jest.fn();

  describe('PremiumProposition can mount', () => {
    it('Show Premium Benefits Without Discount', () => {
      const props = {
        onModalClose: onAction,
        data: factory.noDiscount,
      };
      const premiumProposition = mount(<PremiumProposition {...props} />);
      expect(premiumProposition.text()).toContain('Upgrade now to get full access');
      expect(premiumProposition.text()).toContain('Premium Benefits:');
      expect(premiumProposition.text()).toContain('Chat with your Matches');
      expect(premiumProposition.text()).toContain('Get highlighted to your Matches');
      expect(premiumProposition.text()).toContain('View Contact details');
      expect(premiumProposition.text()).toContain('Feature on top of Search Results');
    });

    it('Show Premium Benefits With Discount', () => {
      const props = {
        onModalClose: onAction,
        data: factory.withDiscount,
      };
      const premiumProposition = mount(<PremiumProposition {...props} />);
      expect(premiumProposition.text()).toContain(`Save upto ${factory.withDiscount.offer_details[0].value}% off on Premium Plans!`);
    });
  });

  describe('Payment Page Details', () => {
    it('Link should have text as View Plans', () => {
      const props = {
        onModalClose: onAction,
        data: factory.withDiscount,
      };
      const premiumProposition = mount(<PremiumProposition {...props} />);
      expect(
        premiumProposition
          .find('a')
          .first()
          .text(),
      ).toBe('View Plans');
    });
  });
});
