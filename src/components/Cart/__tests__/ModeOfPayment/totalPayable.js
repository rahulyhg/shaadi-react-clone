import React from 'react';
import { mount } from 'enzyme';
import TotalPayable from '../../ModeOfPayment/TotalPayable';
import factory from '../utils/factory';

describe('Total Payable', () => {
  const placeOrder = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeOrder.mockClear();
    });
    const props = { ...factory.totalPayableProps, placeOrder };
    describe('Total Payable Text', () => {
      const totalPayableProps = { ...props };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('SecureIcon').exists()).toBe(true);
      expect(totalPayable.find('PayNowBtn').exists()).toBe(true);
      expect(totalPayable.find('TotalPayableText').exists()).toBe(true);
    });

    describe('Pay Now Button Text without SVG loader ', () => {
      const totalPayableProps = { ...props, buttonText: 'Pay Now', isVisibleLoader: false };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('PayNowBtn').exists()).toBe(true);
      expect(totalPayable.find('PayNowBtn').text()).toEqual('Pay Now');
    });

    describe('Pay Now Button Text with SVG loader', () => {
      const totalPayableProps = { ...props, buttonText: 'Pay Now', isVisibleLoader: true };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('PayNowBtn').exists()).toBe(true);
      expect(
        totalPayable
          .find('PayNowBtn')
          .find('SvgLoader')
          .exists(),
      ).toBe(true);
    });

    describe('Total Payable With USD', () => {
      const totalPayableProps = { ...props, isSymbolCodeCurrency: true, amount: 70, currency: 'USD' };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('TotalPayableText').text()).toEqual('*Total Payable: US $70');
    });

    describe('Total Payable With INR', () => {
      const totalPayableProps = { ...props, isSymbolCodeCurrency: true, amount: 4770, currency: 'INR' };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('TotalPayableText').text()).toEqual('*Total Payable: ₹4,770');
    });

    describe('Total Payable With GBP', () => {
      const totalPayableProps = { ...props, isSymbolCodeCurrency: true, amount: 99, currency: 'GBP' };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('TotalPayableText').text()).toEqual('*Total Payable: UK £99');
    });

    describe('Total Payable With AED (other currency case )', () => {
      const totalPayableProps = { ...props, amount: 219, currency: 'AED', approxAmount: 134.0, approxCurrency: 'USD' };
      const totalPayable = mount(<TotalPayable {...totalPayableProps} />);
      expect(totalPayable.find('TotalPayableText').text()).toEqual('*Total Payable: US $134.00 (Approx. AED 219)');
    });
  });
});
