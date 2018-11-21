import React from 'react';
import { mount } from 'enzyme';
import ModeOfPayment from '../../ModeOfPayment';
import factory from '../utils/factory';

describe('Mode Of Payment', () => {
  const onTabClick = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const onBankClick = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onTabClick.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      onTabClick,
      handleUserInput,
      placeOrder,
      onBankClick,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };

    describe('Mode OF Payment : Credit Card', () => {
      describe('Mode OF Payment : Credit Card Not Exist', () => {
        const modeOfPaymentProps = { ...props };
        it('Payment Mode Should have not Credit Card', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(
            modeOfPayment
              .find('ModeOfPaymentList')
              .find('DebitIcon')
              .exists(),
          ).toBe(false);
        });
      });

      describe('Mode OF Payment : Credit Card Exist', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isCreditCardMop: true },
        };
        // console.log('check --->',modeOfPaymentProps);
        it('Payment Mode Should have Credit Card', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(modeOfPayment.find('.creditCardTab').exists()).toBe(true);
          expect(modeOfPayment.find('ModeOfPaymentList').text()).toContain('Credit Card');
        });
      });

      describe('Click On Credit Card', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isCreditCardMop: true },
        };
        it('Click On Credit card option', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(modeOfPayment.find('.creditCardTab').exists()).toBe(true);
        });
      });
    });

    describe('Mode OF Payment : Debit Card', () => {
      describe('Mode OF Payment : Debit Card Not Exist', () => {
        const modeOfPaymentProps = { ...props };
        it('Payment Mode Should have not Debit Card', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(
            modeOfPayment
              .find('ModeOfPaymentList')
              .find('DebitIcon')
              .exists(),
          ).toBe(false);
        });
      });
      describe('Mode OF Payment : Debit Card Exist', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isDebitCardMop: true },
        };
        it('Payment Mode Should have Debit Card', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);

          expect(
            modeOfPayment
              .find('ModeOfPaymentList')
              .find('DebitIcon')
              .exists(),
          ).toBe(true);
          expect(modeOfPayment.find('ModeOfPaymentList').text()).toContain('Debit Card');
        });
      });

      describe('Click On Debit Card', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isDebitCardMop: true },
        };
        it('Click On Debit card option', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(modeOfPayment.find('.debitCardTab').exists()).toBe(true);
        });
      });
    });

    describe('Mode OF Payment : Paypal', () => {
      describe('Mode OF Payment : Paypal Not Exist', () => {
        const modeOfPaymentProps = { ...props };
        it('Payment Mode Should have not paypal', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(
            modeOfPayment
              .find('ModeOfPaymentList')
              .find('PaypalIcon')
              .exists(),
          ).toBe(false);
        });
      });
      describe('Mode OF Payment : Paypal Exist', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isPaypalMop: true },
        };
        it('Payment Mode Should have Paypal Card', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(
            modeOfPayment
              .find('ModeOfPaymentList')
              .find('PaypalIcon')
              .exists(),
          ).toBe(true);
          expect(modeOfPayment.find('ModeOfPaymentList').text()).toContain('Paypal');
        });
      });

      describe('Click On PayPal', () => {
        const modeOfPaymentProps = {
          ...props,
          settings: { ...props.settings, isPaypalMop: true },
        };
        it('Click On PayPal option', () => {
          const modeOfPayment = mount(<ModeOfPayment {...modeOfPaymentProps} />);
          expect(modeOfPayment.find('.paypalTab').exists()).toBe(true);
        });
      });
    });
  });
});
