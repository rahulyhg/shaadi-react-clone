import React from 'react';
import { mount } from 'enzyme';
import CvvNumber from '../../ModeOfPayment/CreditCard/JusPayForm/CvvNumber';
import factory from '../utils/factory';

describe('Cvv Number - JusPay', () => {
  const innerRef = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      innerRef.mockClear();
    });
    const props = { ...factory.cardNumberProps, innerRef };
    describe('Cvv Number Input without error: ', () => {
      const cvvNoProps = { ...props };
      const cvvNumber = mount(<CvvNumber {...cvvNoProps} />);
      expect(cvvNumber.find('#iframe_security_code').exists()).toBe(true);
    });
    describe('Cvv Number Input with error: ', () => {
      const cvvNoProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: '',
          cardNum: '',
          cardYear: '',
          cvv: false,
          trySubmit: '',
        },
      };
      const cvvNumber = mount(<CvvNumber {...cvvNoProps} />);
      expect(cvvNumber.text()).toContain('Please enter a valid CVV number.');
    });
  });
});
