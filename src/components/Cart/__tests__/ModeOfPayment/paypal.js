import React from 'react';
import { mount } from 'enzyme';
import Paypal from '../../ModeOfPayment/Paypal';
import factory from '../utils/factory';

describe('Mode Of Payment', () => {
  const placeOrder = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeOrder.mockClear();
    });
    const props = { ...factory.modeofPaymentProps, placeOrder };
    describe('Paypal :', () => {
      const payPalProps = { ...props, mopId: 73, mopName: 'payPal' };
      it('Form should Be Redirect', () => {
        const payPal = mount(<Paypal {...payPalProps} />);
        expect(payPal.find('#pay_paypal').exists()).toBe(true);
      });
    });
  });
});
