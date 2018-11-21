import React from 'react';
import { mount } from 'enzyme';
import PaymentTabs from '../../PaymentTabs';
import factory from '../utils/factory';

jest.mock('../../../Common/Link');

describe('Payment Tabs', () => {
  const addToCart = jest.fn();
  describe('Should Render', () => {
    beforeEach(() => {
      addToCart.mockClear();
    });
    const props = { ...factory.PaymentTabsProps, addToCart };
    describe('Premium Plans', () => {
      const PaymentProps = { ...props };
      it('Premium Plans', () => {
        const PremiumPlans = mount(<PaymentTabs {...PaymentProps} />);
        expect(PremiumPlans.find('PaymentContainer').exists()).toBe(true);
        expect(PremiumPlans.find('PaymentContainer').text()).toContain('Premium Plans');
        expect(
          PremiumPlans.find('PaymentContainer')
            .find('span[id="PremiumTab"]')
            .exists(),
        ).toBe(true);
        const PremiumTab = PremiumPlans.find('span[id="PremiumTab"]');
        PremiumTab.simulate('click');
        expect(PremiumPlans.find('PaymentContainer').text()).toContain('Compare Plans in detail');
      });
    });

    describe('Compare Plan', () => {
      const PaymentProps = { ...props, productDetails: { showSkipLink: false } };
      it('Compare Plan', () => {
        const PremiumPlans = mount(<PaymentTabs {...PaymentProps} />);
        expect(PremiumPlans.find('PaymentContainer').text()).toContain('Compare Plans in detail');
      });
    });

    describe('Skip Link', () => {
      const PaymentProps = { ...props, productDetails: { showSkipLink: true } };
      it('Skip Link', () => {
        const PremiumPlans = mount(<PaymentTabs {...PaymentProps} />);
        expect(PremiumPlans.find('PaymentContainer').text()).toContain('Compare Plans in detail');
        expect(PremiumPlans.find('PaymentContainer').text()).toContain("I'll do this later");
      });
    });

    describe('Personalised Plans', () => {
      const PaymentProps = { ...props };
      it('Personalised Plans', () => {
        const PersonalisedPlans = mount(<PaymentTabs {...PaymentProps} />);
        expect(PersonalisedPlans.find('PaymentContainer').exists()).toBe(true);
        expect(
          PersonalisedPlans.find('PaymentContainer')
            .find('span[id="PersonaliseTab"]')
            .exists(),
        ).toBe(true);
        PersonalisedPlans.find('PaymentContainer')
          .find('span[id="PersonaliseTab"]')
          .at(0)
          .simulate('click');
        expect(PersonalisedPlans.find('PaymentContainer').text()).not.toContain('Compare Plans in detail');
      });
    });
  });
});
