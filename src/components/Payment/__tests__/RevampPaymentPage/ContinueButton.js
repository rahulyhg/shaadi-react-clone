import React from 'react';
import { mount } from 'enzyme';
import ContinueButton from '../../RevampPaymentPage/ContinueButton';

describe('Button', () => {
  const placeCart = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeCart.mockClear();
    });
    describe('Continue Button', () => {
      const props = { productCode: 'SSP_DPlus', placeCart, btnloading: false };
      it('Continue Button before click', () => {
        const plans = mount(<ContinueButton {...props} />);
        expect(plans.text()).toContain('Continue');
        plans.simulate('click');
      });
      it('Continue Button after click', () => {
        const plans = mount(<ContinueButton {...props} btnloading />);
        expect(plans.text()).toContain('');
      });
    });
  });
});
