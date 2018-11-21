import React from 'react';
import { mount } from 'enzyme';
import RevampPaymentPage from '../../RevampPaymentPage';
import factory from '../utils/factory';

describe('Revamp Payment Page', () => {
  const addToCart = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      addToCart.mockClear();
    });
    const revampPageProps = { ...factory.revampProps, paymentTabsProps: { ...factory.PaymentTabsProps, addToCart } };
    describe('RevampPaymentPage : Premium Products and Features', () => {
      it('Premium Products : Features', () => {
        const revampPage = mount(<RevampPaymentPage {...revampPageProps} />);
        expect(revampPage.find('#top_band').exists()).toBe(true);
        expect(revampPage.find('#match_guarantee_tooltip').exists()).toBe(true);
        expect(revampPage.text()).toContain('Duration & Price Per Month');
        expect(revampPage.text()).toContain('Send unlimited Messages');
        expect(revampPage.text()).toContain('View Contact Numbers');
        expect(revampPage.text()).toContain('Get highlighted to your Matches');
        expect(revampPage.text()).toContain('Make Contact details visible to all');
        expect(revampPage.text()).toContain('Success Stories');

        expect(revampPage.find('#view_plans_accordion').exists()).toBe(true);
        expect(revampPage.state().viewplan).toBe(false);
        revampPage.find('#view_plans_accordion').simulate('click');
        expect(revampPage.state().viewplan).toBe(true);

        revampPage.instance().componentDidMount();
        revampPage.setState({
          viewplan: false,
          showBubbleTop: true,
        });

        window.scrollY = 50;
        revampPage.simulate('keyDown', { keyCode: 38 });
        revampPage.instance().handleScroll(e => e);
        expect(revampPage.find('.bounce_arrow display_off').exists()).toBe(false);

        window.scrollY = 0;
        revampPage.simulate('keyDown', { keyCode: 38 });
        revampPage.instance().handleScroll(e => e);
        expect(revampPage.find('.bounce_arrow').exists()).toBe(true);
        revampPage.instance().componentWillUnmount();
      });
    });
    describe('RevampPaymentPage : Error Cases', () => {
      it('Premium Products : with Error', () => {
        const revampPageProps2 = {
          ...factory.revampProps,
          paymentTabsProps: {
            ...factory.PaymentTabsProps,
            addToCart,
            cartResult: {
              btnloading: false,
              cartErrorMsg: 'The Offer you trying to avail has expired',
            },
          },
        };
        const revampPage = mount(<RevampPaymentPage {...revampPageProps2} />);
        expect(revampPage.find('#error_message').exists()).toBe(true);
        expect(revampPage.find('#error_message').text()).toContain('The Offer you trying to avail has expired');
      });
      it('Premium Products : without Error', () => {
        const revampPage = mount(<RevampPaymentPage {...revampPageProps} />);
        expect(revampPage.find('#error_message').exists()).toBe(true);
        expect(revampPage.find('#error_message').text()).toContain('');
      });
    });
    describe('RevampPaymentPage : Bubble Visibility', () => {
      it('Bubble Icon Show', () => {
        const revampPage = mount(<RevampPaymentPage {...revampPageProps} />);
        revampPage.setState({
          viewplan: false,
          showBubbleTop: true,
        });
        expect(revampPage.find('#bubble_icon').exists()).toBe(true);
        expect(revampPage.find('.bounce_arrow').exists()).toBe(true);
        expect(revampPage.find('.bounce_arrow display_off').exists()).toBe(false);
      });
      it('Bubble Icon Hide', () => {
        const revampPage = mount(<RevampPaymentPage {...revampPageProps} />);
        revampPage.setState({
          viewplan: false,
          showBubbleTop: false,
        });
        expect(revampPage.find('#bubble_icon').exists()).toBe(true);
        expect(
          revampPage
            .find('#bubble_icon')
            .find('.display_bounce_off')
            .exists(),
        ).toBe(true);
      });
    });
  });
});
