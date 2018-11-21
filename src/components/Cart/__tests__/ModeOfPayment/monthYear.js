import React from 'react';
import { mount } from 'enzyme';
import MonthYear from '../../ModeOfPayment/CreditCard/JusPayForm/MonthYear';
import factory from '../utils/factory';

describe('Month Year - JusPay', () => {
  describe('should render', () => {
    const props = { ...factory.cardNumberProps };
    describe('Month Year Inputs without error: ', () => {
      const MonthYearProps = { ...props };
      const monthYear = mount(<MonthYear {...MonthYearProps} />);
      expect(monthYear.find('#iframe_card_exp_month').exists()).toBe(true);
      expect(monthYear.find('#iframe_card_exp_year').exists()).toBe(true);
    });
    describe('Month Year Inputs with both error: ', () => {
      const MonthYearProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: false,
          cardNum: '',
          cardYear: false,
          cvv: '',
          trySubmit: '',
        },
      };
      const monthYear = mount(<MonthYear {...MonthYearProps} />);
      expect(monthYear.text()).toContain('Please select valid expiry date.');
    });
    describe('Month Year Inputs with month error: ', () => {
      const MonthYearProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: false,
          cardNum: '',
          cardYear: '',
          cvv: '',
          trySubmit: '',
        },
      };
      const monthYear = mount(<MonthYear {...MonthYearProps} />);
      expect(monthYear.text()).toContain('Please select valid expiry date.');
    });
    describe('Month Year Inputs with year error: ', () => {
      const MonthYearProps = {
        ...props,
        formErrors: {
          cardHolderName: '',
          cardMonth: '',
          cardNum: '',
          cardYear: false,
          cvv: '',
          trySubmit: '',
        },
      };
      const monthYear = mount(<MonthYear {...MonthYearProps} />);
      expect(monthYear.text()).toContain('Please select valid expiry date.');
    });
  });
});
