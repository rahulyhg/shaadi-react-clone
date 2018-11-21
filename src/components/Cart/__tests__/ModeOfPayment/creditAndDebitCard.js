import React from 'react';
import { mount } from 'enzyme';
import CreditCard from '../../ModeOfPayment/CreditCard';
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
    const props = { ...factory.modeofPaymentProps, onTabClick, handleUserInput, placeOrder, paymentActionHandler };

    describe('Credit Card and Debit Card', () => {
      describe('Credit Card/Debit Card Form Elements Without Error', () => {
        const paymentCardProps = {
          ...props,
          tab: 'CreditCard',
          mopId: 1,
          mopName: 'Credti Card',
          formErrors: { ...props.formErrors, cardNum: true, cvv: true, cardHolderName: true, cardMonth: true, cardYear: true },
        };

        it('Form should Be Redirect', () => {
          const creditdebitcard = mount(<CreditCard {...paymentCardProps} />);
          expect(creditdebitcard.find('#credit_debit_card').exists()).toBe(true);
        });
      });
    });
  });
});
