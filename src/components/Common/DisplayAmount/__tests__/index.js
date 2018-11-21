import React from 'react';
import { mount } from 'enzyme';
import DisplayAmount from '../../DisplayAmount';
import factory from './utils/factory';

describe('Display Currency', () => {
  const props = { ...factory.displayAmountProps };
  describe('INR : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 100000, currency: 'INR' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('₹1,00,000');
  });

  describe('USD : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 1000, currency: 'USD' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('US $1,000');
  });

  describe('GBP : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 1000, currency: 'GBP' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('UK £1,000');
  });

  describe('Other : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 1000, currency: 'PKR' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('PKR 1,000');
  });

  describe('1 Digit : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 1, currency: 'USD' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('US $1');
  });

  describe('2 Digit : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 10, currency: 'USD' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('US $10');
  });

  describe('3 Digit : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 100, currency: 'USD' };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('US $100');
  });

  describe('Fraction : Format Currency', () => {
    const displayAmountProps = { ...props, amount: 10.1, currency: 'USD', fractionAllowed: 2 };
    const displayAmount = mount(<DisplayAmount {...displayAmountProps} />);
    expect(displayAmount.text()).toContain('US $10.10');
  });
});
