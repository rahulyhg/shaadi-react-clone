import React from 'react';
import { mount } from 'enzyme';
import RevampProduct from '../../RevampPaymentPage/RevampProduct';
import factory from '../utils/factory';

describe('Product', () => {
  const handleClick = jest.fn();
  const placeCart = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      handleClick.mockClear();
      placeCart.mockClear();
    });
    const props = { ...factory.revampPlansProps, handleClick, placeCart };
    describe('Premium Product', () => {
      const planProps = { ...props, isPremiumProduct: true };
      it('Premium Product with offer discount', () => {
        const plans = mount(<RevampProduct {...planProps} />);
        expect(plans.find('PremiumProduct').exists()).toBe(true);
      });
    });
    describe('Personalised Product', () => {
      const planProps = {
        ...props,
        isPremiumProduct: false,
      };
      it('Personalised Product', () => {
        const plans = mount(<RevampProduct {...planProps} />);
        expect(plans.find('PersonalisedProduct').exists()).toBe(true);
      });
    });
  });
});
