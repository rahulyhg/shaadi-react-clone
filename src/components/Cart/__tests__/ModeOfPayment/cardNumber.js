import React from 'react';
import { mount } from 'enzyme';
import CardNumber from '../../ModeOfPayment/CreditCard/JusPayForm/CardNumber';
import factory from '../utils/factory';

describe('Card Number - JusPay', () => {
  const innerRef = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      innerRef.mockClear();
    });
    const props = { ...factory.cardNumberProps, innerRef };
    describe('Card Number Input without error: ', () => {
      const cardNoProps = { ...props };
      const cardNumber = mount(<CardNumber {...cardNoProps} />);
      expect(cardNumber.find('#iframe_card_number').exists()).toBe(true);
    });
    describe('Card Number Input with error: ', () => {
      const cardNoProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: '',
          cardNum: false,
          cardYear: '',
          cvv: '',
          trySubmit: '',
        },
      };
      const cardNumber = mount(<CardNumber {...cardNoProps} />);
      expect(cardNumber.text()).toContain('Please enter a valid Card number.');
    });
    describe('Amex Card not supported: ', () => {
      const cardNoProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: '',
          cardNum: false,
          cardYear: '',
          cvv: '',
          trySubmit: '',
        },
        cardBrand: 'AMEX',
      };
      const cardNumber = mount(<CardNumber {...cardNoProps} />);
      expect(cardNumber.text()).toContain('This card is not supported.');
    });
  });
});
