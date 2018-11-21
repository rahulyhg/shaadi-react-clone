import React from 'react';
import { mount } from 'enzyme';
import CardHolderName from '../../ModeOfPayment/CreditCard/JusPayForm/CardHolderName';
import factory from '../utils/factory';

describe('Card Holder Name - JusPay', () => {
  const innerRef = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      innerRef.mockClear();
    });
    const props = { ...factory.cardNumberProps, innerRef };
    describe('Card Holder Name Input without error : ', () => {
      const cardHolderNameProps = { ...props };
      const cardHolderName = mount(<CardHolderName {...cardHolderNameProps} />);
      expect(cardHolderName.find('#iframe_name_on_card').exists()).toBe(true);
    });
    describe('Card Holder Input with error: ', () => {
      const cardHolderNameProps = {
        ...props,
        formErrors: {
          cardHolderName: false,
          cardMonth: '',
          cardNum: '',
          cardYear: '',
          cvv: '',
          trySubmit: '',
        },
      };
      const cardHolderName = mount(<CardHolderName {...cardHolderNameProps} />);
      expect(cardHolderName.text()).toContain('Please enter the name of card holder.');
    });
  });
});
