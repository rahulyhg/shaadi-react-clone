import React from 'react';
import { mount } from 'enzyme';
import CreditCardForm from '../../ModeOfPayment/CreditCard/CreditCardForm';
import factory from '../utils/factory';

describe('Mode Of Payment', () => {
  const onTabClick = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onTabClick.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 1, mopName: 'Credit And Debit Card' },
      onTabClick,
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
          const creditdebitcard = mount(<CreditCardForm {...paymentCardProps} />);
          expect(creditdebitcard.find('#cartform').exists()).toBe(true);
          expect(creditdebitcard.find('#cartform').text()).toContain('Card Number');
          expect(
            creditdebitcard
              .find('#cartform')
              .find('input[name="cc_num"]')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#cartform').text()).toContain('Accepted Card');
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('MasterCardIcon')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#cartform').text()).toContain('Valid upto');
          expect(
            creditdebitcard
              .find('#cartform')
              .find('select[name="cc_month"]')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('select[name="cc_year"]')
              .exists(),
          ).toBe(true);

          expect(creditdebitcard.find('#cartform').text()).toContain('CVV');
          expect(
            creditdebitcard
              .find('#cartform')
              .find('input[name="cc_cvv"]')
              .exists(),
          ).toBe(true);
          expect(creditdebitcard.find('#cartform').text()).toContain('3 digit number printed on your back side of card');

          expect(creditdebitcard.find('#cartform').text()).toContain('Cardholder Name');
          expect(
            creditdebitcard
              .find('#cartform')
              .find('input[name="cc_card_holder_name"]')
              .exists(),
          ).toBe(true);
          expect(creditdebitcard.find('#cartform').text()).toContain('*Total Payable:');
          expect(creditdebitcard.find('SecureIcon').exists()).toBe(true);
          expect(creditdebitcard.find('PayNowBtn').exists()).toBe(true);
          expect(creditdebitcard.find('TotalPayableText').exists()).toBe(true);
        });
      });

      describe('Credit Card/Debit Card Form Elements With Error', () => {
        const paymentCardProps = {
          ...props,
          tab: 'CreditCard',
          cardNum: '',
          cvv: '',
          cardHolderName: '',
          cardMonth: '',
          cardYear: '',
          formErrors: {
            cardNum: '',
            cvv: '',
            cardHolderName: '',
            cardMonth: '',
            cardYear: '',
          },
          cardImage: '',
          isFieldRequire: true,
          isFormSubmit: false,
          isVisibleLoader: false,
        };

        it('Form should have Elements With Error', () => {
          const creditdebitcard = mount(<CreditCardForm {...paymentCardProps} />);
          expect(creditdebitcard.find('#cartform').exists()).toBe(true);
          creditdebitcard.setState({
            formErrors: {
              cardNum: false,
              cvv: '',
              cardHolderName: '',
              cardMonth: '',
              cardYear: '',
            },
          });
          expect(creditdebitcard.find('#cartform').text()).toContain('Please enter a valid Card number.');
          creditdebitcard.setState({
            formErrors: {
              cardNum: '',
              cvv: false,
              cardHolderName: '',
              cardMonth: '',
              cardYear: '',
            },
          });
          creditdebitcard.setState({
            formErrors: {
              cardNum: '',
              cvv: '',
              cardHolderName: false,
              cardMonth: '',
              cardYear: '',
            },
          });
          expect(creditdebitcard.find('#cartform').text()).toContain('Please enter the name of card holder.');
          creditdebitcard.setState({
            formErrors: {
              cardNum: '',
              cvv: '',
              cardHolderName: '',
              cardMonth: false,
              cardYear: '',
            },
          });
          expect(creditdebitcard.find('#cartform').text()).toContain('Please select valid expiry date.');
          creditdebitcard.setState({
            formErrors: {
              cardNum: '',
              cvv: '',
              cardHolderName: '',
              cardMonth: '',
              cardYear: false,
            },
          });
          expect(creditdebitcard.find('#cartform').text()).toContain('Please select valid expiry date.');
          creditdebitcard.find('input[name="cc_num"]').simulate('change', { target: { name: 'cc_num', value: '512345678912346' } });

          creditdebitcard
            .find('#cartform')
            .find('select[name="cc_month"]')
            .at(0)
            .simulate('change', { target: { name: 'cc_month', value: '05' } });

          creditdebitcard
            .find('#cartform')
            .find('select[name="cc_year"]')
            .at(0)
            .simulate('change', { target: { name: 'cc_year', value: '2018' } });

          creditdebitcard
            .find('#cartform')
            .find('input[name="cc_cvv"]')
            .simulate('change', { target: { name: 'cc_cvv', value: '123' } });

          creditdebitcard
            .find('#cartform')
            .find('input[name="cc_card_holder_name"]')
            .simulate('change', { target: { name: 'cc_card_holder_name', value: 'Chirag Patel' } });

          creditdebitcard.find('button[type="button"]').simulate('click');
          creditdebitcard.update();
        });
      });

      describe('Debit Card', () => {
        const paymentCardProps = {
          ...props,
          tab: 'DebitCard',
          currency: 'USD',
        };
        it('Debit Card NON INR should have 2 types of cards', () => {
          const creditdebitcard = mount(<CreditCardForm {...paymentCardProps} />);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#cartform')
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
          const creditdebitcard = mount(<CreditCardForm {...paymentCardProps} />);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('VisaCardImage')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('MasterCardIcon')
              .exists(),
          ).toBe(true);
          expect(
            creditdebitcard
              .find('#cartform')
              .find('div')
              .find('MaestroCardIcon')
              .exists(),
          ).toBe(true);
        });
      });
    });
  });
});
