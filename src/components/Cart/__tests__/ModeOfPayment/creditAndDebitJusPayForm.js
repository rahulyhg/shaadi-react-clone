import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import CreditCardJusPayForm from '../../ModeOfPayment/CreditCard/JusPayForm/CreditCardJusPayForm';
import factory from '../utils/factory';
import initializeStore from '../../../../store';

const store = initializeStore();

describe('Mode Of Payment', () => {
  const doDomActions = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      doDomActions.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 1, mopName: 'Credit And Debit Card' },
      orderId: { id: '11211' },
      doDomActions,
      handleUserInput,
      placeOrder,
      paymentActionHandler,
    };

    describe('Credit Card and Debit Card', () => {
      describe('Credit Card/Debit Card Form Elements Without Error', () => {
        const paymentCardProps = {
          ...props,
          tab: 'CreditCard',
        };

        it('Form should have Elements Without Error', () => {
          const creditdebitcard = mount(
            <Provider store={store}>
              <CreditCardJusPayForm {...paymentCardProps} />
            </Provider>,
          );
          expect(creditdebitcard.find('#juspay_form').exists()).toBe(true);
          expect(creditdebitcard.find('#juspay_form').text()).toContain('Card Number');
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('#iframe_card_number')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#juspay_form').text()).toContain('Accepted Card');
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('MasterCardIcon')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#juspay_form').text()).toContain('Valid upto');
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('#iframe_card_exp_month')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('#iframe_card_exp_year')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#juspay_form').text()).toContain('CVV');
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('#iframe_security_code')
              .exists(),
          ).toBe(true);
          expect(creditdebitcard.find('#juspay_form').text()).toContain('3 digit number printed on your back side of card');

          expect(creditdebitcard.find('#juspay_form').text()).toContain('Cardholder Name');
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('#iframe_name_on_card')
              .exists(),
          ).toBe(true);
          expect(creditdebitcard.find('#juspay_form').text()).toContain('*Total Payable:');
          expect(creditdebitcard.find('SecureIcon').exists()).toBe(true);
          expect(creditdebitcard.find('PayNowBtn').exists()).toBe(true);
          expect(creditdebitcard.find('TotalPayableText').exists()).toBe(true);
        });
      });

      describe('Debit Card', () => {
        const paymentCardProps = {
          ...props,
          tab: 'DebitCard',
          currency: 'USD',
        };
        it('Debit Card NON INR should have 2 types of cards', () => {
          const creditdebitcard = mount(
            <Provider store={store}>
              <CreditCardJusPayForm {...paymentCardProps} />
            </Provider>,
          );
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('MasterCardIcon')
              .exists(),
          ).toBe(true);
        });
      });

      describe('Debit Card', () => {
        const paymentCardProps = {
          ...props,
          tab: 'DebitCard',
          currency: 'INR',
        };
        it('Debit Card should have 3 types of cards', () => {
          const creditdebitcard = mount(
            <Provider store={store}>
              <CreditCardJusPayForm {...paymentCardProps} />
            </Provider>,
          );
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('MasterCardIcon')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#juspay_form')
              .find('div')
              .find('MaestroCardIcon')
              .exists(),
          ).toBe(true);
        });
      });
    });
  });
});
