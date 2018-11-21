import React from 'react';
import { mount } from 'enzyme';
import TopBand from '../../TopBand';
import factory from '../utils/factory';

describe('Top Band', () => {
  describe('should render', () => {
    const props = { ...factory.topBandProps };
    describe('TopBand : Without offer', () => {
      const tagProps = { ...props };
      it('Top band Message without Discount', () => {
        const badge = mount(<TopBand {...tagProps} />);
        expect(badge.find('div[data-topbadge="discountMessage"]').exists()).toBe(true);
        expect(badge.find('div[data-topbadge="discountMessage"]').text()).toEqual(
          'Upgrade to Premium and we guarantee you will find a Match!',
        );
      });
    });
    describe('TopBand : With Discount Based Offer', () => {
      const tagProps = { ...props, currency: 'USD', offerDiscountPerc: 55, offerDiscountedPercPrice: 75 };
      it('Top band Message with Discount Based Offer', () => {
        const badge = mount(<TopBand {...tagProps} />);
        expect(badge.find('div[data-topbadge="discountMessage"]').exists()).toBe(true);
        expect(badge.find('div[data-topbadge="discountMessage"]').text()).toEqual('You are saving US $75 on your selected plan!');
      });
    });
    describe('TopBand : With Amount Based Offer', () => {
      const tagProps = { ...props, currency: 'USD', offerDiscountAmount: 450 };
      it('Top band Message with Amount Based Offer', () => {
        const badge = mount(<TopBand {...tagProps} />);
        expect(badge.find('div[data-topbadge="discountMessage"]').exists()).toBe(true);
        expect(badge.find('div[data-topbadge="discountMessage"]').text()).toEqual('You are saving US $450 on your selected plan!');
      });
    });
  });
});
