import React from 'react';
import { mount } from 'enzyme';
import PersonalisedProduct from '../../RevampPaymentPage/PersonalisedProduct';
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
    describe('Personalised Product', () => {
      const planProps = {
        ...props,
        isPremiumProduct: false,
        name: 'Select 6',
        productCode: 'SSP_SP6',
        topAmountProps: { amount: 51500, currency: 'INR' },
        perMonthAmtProps: { amount: 8584, currency: 'INR' },
        duration: (
          <React.Fragment>
            <span>6 months</span>
          </React.Fragment>
        ),
      };
      it('Personalised Product with offer discount', () => {
        const plans = mount(<PersonalisedProduct {...planProps} />);
        expect(plans.find('#data_test_SSP_SP6_total').exists()).toBe(true);
        expect(plans.find('#data_test_SSP_SP6_actual').exists()).toBe(true);
        expect(plans.text()).toContain('₹51,500 per month');
        expect(plans.text()).toContain('₹8,584 for 6 months');
        plans
          .find('div')
          .at(0)
          .simulate('click');
      });
    });
  });
});
