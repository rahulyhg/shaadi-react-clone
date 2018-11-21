import React from 'react';
import { mount } from 'enzyme';
import Cart from '../../Cart';
import factory from './utils/factory';

describe('Cart', () => {
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      paymentActionHandler.mockClear();
    });
    const props = { ...factory.paymentProps, paymentActionHandler };

    describe('Cart : Top Band', () => {
      const paymentProps = { ...props, otpVerification: true };
      const payment = mount(<Cart {...paymentProps} />);
      expect(payment.find('CartTopBand').exists()).toBe(true);
      expect(payment.find('div[data-topbadge="discountMessage"]').text()).toEqual(
        'Upgrade to Premium and we guarantee you will find a Match!',
      );
    });
    describe('Cart : Mode Of Payment', () => {
      const paymentProps = { ...props, otpVerification: true };
      const payment = mount(<Cart {...paymentProps} />);
      expect(payment.find('ModeOfPayment').exists()).toBe(true);
    });
    describe('Cart : Order Summary', () => {
      const payment = mount(<Cart {...props} />);
      expect(payment.find('OrderSummary').exists()).toBe(true);
    });
    describe('Cart : Ip Address', () => {
      const payment = mount(<Cart {...props} />);
      expect(payment.find('IpAddress').exists()).toBe(true);
    });
  });
});
