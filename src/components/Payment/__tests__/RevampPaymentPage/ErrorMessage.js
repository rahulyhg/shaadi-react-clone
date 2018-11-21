import React from 'react';
import { mount } from 'enzyme';
import ErrorMessage from '../../RevampPaymentPage/ErrorMessage';

describe('Error Message', () => {
  describe('should render', () => {
    describe('Error Message', () => {
      const props = { message: 'Invalid discount code applied' };
      it('With Error', () => {
        const errorMessage = mount(<ErrorMessage {...props} />);
        expect(errorMessage.text()).toBe('Invalid discount code applied');
        expect(errorMessage.find('.display_off').exists()).toBe(false);
      });
      it('Without Error', () => {
        const errorMessage = mount(<ErrorMessage {...props} message="" />);
        expect(errorMessage.text()).toBe('');
        expect(errorMessage.find('.display_off').exists()).toBe(true);
      });
    });
  });
});
