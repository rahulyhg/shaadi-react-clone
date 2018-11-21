import React from 'react';
import { mount } from 'enzyme';
import PremiumProduct from '../../RevampPaymentPage/PremiumProduct';
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
        const plans = mount(<PremiumProduct {...planProps} />);
        expect(plans.find('.best_value').html()).toContain('TOP SELLER');
        expect(plans.text()).toContain('₹2,340 per month');
        expect(plans.find('#data_test_continue_SSP_GPlus').exists()).toBe(true);
        plans
          .find('div')
          .at(0)
          .simulate('click');
      });
    });
  });
});
