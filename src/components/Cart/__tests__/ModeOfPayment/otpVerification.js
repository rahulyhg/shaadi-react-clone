import React from 'react';
import { mount } from 'enzyme';
import OtpVerification from '../../ModeOfPayment/OtpVerification';
import factory from '../utils/factory';

describe('OTP Verification', () => {
  const placeOrder = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeOrder.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.otpVerificationProps,
      totalPayableProps: { ...factory.totalPayableProps },
      placeOrder,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };
    describe('OTP Page Redirect : ', () => {
      const otpProps = { ...props };
      const otpPage = mount(<OtpVerification {...otpProps} />);
      expect(otpPage.find('#otp_verification').exists()).toBe(true);
    });
  });
});
