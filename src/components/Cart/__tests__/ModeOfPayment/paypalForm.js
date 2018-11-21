import React from 'react';
import { mount } from 'enzyme';
import PaypalForm from '../../ModeOfPayment/Paypal/PaypalForm';
import factory from '../utils/factory';

describe('Mode Of Payment', () => {
  const placeOrder = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeOrder.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      placeOrder,
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 73, mopName: 'PayPal' },
    };
    describe('Paypal Page Text', () => {
      const payPalProps = { ...props };
      const payPal = mount(<PaypalForm {...payPalProps} />);
      expect(payPal.find('#payPal').exists()).toBe(true);
      expect(
        payPal
          .find('#payPal')
          .find('BankHeading')
          .exists(),
      ).toBe(true);
      expect(
        payPal
          .find('#payPal')
          .find('BankHeading')
          .text(),
      ).toEqual('Pay Using your PayPal account.');
      expect(
        payPal
          .find('#payPal')
          .find('DefaultText')
          .exists(),
      ).toBe(true);
      expect(
        payPal
          .find('#payPal')
          .find('DefaultText')
          .text(),
      ).toEqual(
        'We will take you to secure site where you can make payment using your PayPal account and get your membership activated instantly.',
      );
      payPal.find('button[type="button"]').simulate('click');
      payPal.update();
    });

    describe('Paypal With USD', () => {
      const payPalProps = {
        ...props,
        totalPayableProps: { amount: 70, currency: 'USD', isShaadiCareChecked: false, isProfileBoosterChecked: false },
      };
      const payPal = mount(<PaypalForm {...payPalProps} />);
      expect(payPal.text()).toContain('*Total Payable: US $70');
    });

    describe('Paypal With INR', () => {
      const payPalProps = {
        ...props,
        totalPayableProps: { amount: 4770, currency: 'INR', isShaadiCareChecked: false, isProfileBoosterChecked: false },
      };
      const payPal = mount(<PaypalForm {...payPalProps} />);
      expect(payPal.text()).toContain('*Total Payable: ₹4,770');
    });

    describe('Paypal With GBP', () => {
      const payPalProps = {
        ...props,
        totalPayableProps: { amount: 99, currency: 'GBP', isShaadiCareChecked: false, isProfileBoosterChecked: false },
      };
      const payPal = mount(<PaypalForm {...payPalProps} />);
      expect(payPal.text()).toContain('*Total Payable: UK £99');
    });

    describe('Paypal With AED (Without currency symbol )', () => {
      const payPalProps = {
        ...props,
        settings: {
          ...props.settings,
          paypalConvertedAmount: {
            currency: 'USD',
            value: 71,
            shaadi_care: 3,
            spotlight: 145,
          },
        },
        totalPayableProps: {
          amount: 99,
          currency: 'AED',
          isShaadiCareChecked: false,
          isProfileBoosterChecked: false,
          approxAmount: 74,
          approxCurrency: 'USD',
        },
      };
      const payPal = mount(<PaypalForm {...payPalProps} />);
      expect(payPal.text()).toContain('*Total Payable: US $74.00 (Approx. AED 99)');
    });
  });
});
