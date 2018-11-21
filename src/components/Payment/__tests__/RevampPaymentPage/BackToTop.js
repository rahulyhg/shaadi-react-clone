import React from 'react';
import { mount } from 'enzyme';
import BackToTop from '../../RevampPaymentPage/BackToTop';

describe('Back To Top', () => {
  const placeCart = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeCart.mockClear();
    });
    describe('Back To Top', () => {
      const props = { show: false };
      it('Hide', () => {
        const backToTop = mount(<BackToTop {...props} />);
        expect(backToTop.find('.bounce_arrow').exists()).toBe(true);
        expect(backToTop.find('.display_bounce_off').exists()).toBe(true);
      });
      it('Show', () => {
        const backToTop = mount(<BackToTop {...props} show />);
        expect(backToTop.find('.bounce_arrow').exists()).toBe(true);
        expect(backToTop.find('.display_bounce_off').exists()).toBe(false);
      });
    });
  });
});
