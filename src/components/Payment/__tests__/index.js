import React from 'react';
import { mount } from 'enzyme';
import Payment from '../../Payment';
import factory from './utils/factory';

jest.mock('../../Common/Link');
describe('Payment Page', () => {
  const addToCart = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      addToCart.mockClear();
    });
    const props = { ...factory.paymentProps, addToCart };
    describe('Payment Page : With loader', () => {
      const paymentPageProps = {
        ...props,
        payment: { ...factory.paymentProps.payment, products: { ...factory.paymentProps.payment.products, loading: true } },
      };
      it('Payment Page with loader', () => {
        const payment = mount(<Payment {...paymentPageProps} />);
        expect(payment.find('TopHeader').exists()).toBe(false);
      });
    });
    describe('Payment Page : Without loader', () => {
      it('Payment Page without loader', () => {
        const payment = mount(<Payment {...props} />);
        expect(payment.find('TopHeader').exists()).toBe(true);
        expect(payment.find('TopHeader').html()).toContain('Upgrade to any of our Premium Plans and we guarantee you will find a match!');
      });
    });
  });
});
