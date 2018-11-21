import React from 'react';
import { mount } from 'enzyme';
import OtpVerificationForm from '../../ModeOfPayment/OtpVerification/OtpVerificationForm';
import factory from '../utils/factory';

describe('OTP Verification', () => {
  const placeOrder = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  const otpValidationForm = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      placeOrder.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
      otpValidationForm.mockClear();
    });
    const props = {
      ...factory.otpVerificationProps,
      totalPayableProps: { ...factory.totalPayableProps },
      placeOrder,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
      otpValidationForm,
    };

    describe('OTP Page - without error ', () => {
      const otpProps = { ...props };
      const otpPage = mount(<OtpVerificationForm {...otpProps} />);
      otpPage.setState({ gotResponse: true });
      expect(otpPage.find('#otp_verification').exists()).toBe(true);
      expect(
        otpPage
          .find('#otp_verification')
          .find('#otp_heading')
          .exists(),
      ).toBe(true);
      expect(otpPage.text()).toContain('Please enter the 4 digit OTP sent to yourregistered mobile number');
      expect(
        otpPage
          .find('#otp_verification')
          .find('input[name="otp_1"]')
          .exists(),
      ).toBe(true);
      expect(
        otpPage
          .find('CartContent')
          .find('input[name="otp_2"]')
          .exists(),
      ).toBe(true);
      expect(
        otpPage
          .find('CartContent')
          .find('input[name="otp_3"]')
          .exists(),
      ).toBe(true);
      expect(
        otpPage
          .find('CartContent')
          .find('input[name="otp_4"]')
          .exists(),
      ).toBe(true);
      expect(otpPage.find('SecureIcon').exists()).toBe(true);
      expect(otpPage.find('PayNowBtn').exists()).toBe(true);
      expect(otpPage.find('TotalPayableText').exists()).toBe(true);
      expect(placeOrder).not.toHaveBeenCalled();
      otpPage.find('button[type="button"]').simulate('click');
      otpPage.update();
    });
    describe('OTP Page - with error ', () => {
      const otpProps = { ...props, otpVerificationData: { errorMsg: 'OTP Error' } };
      const otpPage = mount(<OtpVerificationForm {...otpProps} />);
      otpPage.setState({
        time: {},
        seconds: 60,
        gotResponse: true,
        otpFormFields: {
          otpVal1: '',
          otpVal2: '',
          otpVal3: '',
          otpVal4: '',
          otp: '',
        },
        formErrors: {
          otp: '',
        },
        isFormSubmit: false,
        isVisibleLoader: false,
        shouldVerifyOtp: false,
      });
      expect(otpPage.find('#otp_verification').exists()).toBe(true);
      otpPage.setState({
        formErrors: {
          otp: false,
        },
      });
      expect(otpPage.text()).toContain('The OTP you have entered is incorrect.');
      expect(otpValidationForm).not.toHaveBeenCalled();

      otpPage.find('input[name="otp_1"]').simulate('change', { target: { name: 'otp_1', value: '1' } });
      otpPage.find('input[name="otp_1"]').simulate('keydown', { keyCode: 48 });
      expect(otpPage.find('input[name="otp_1"]').get(0).props.value).toEqual('1');

      otpPage.find('input[name="otp_2"]').simulate('change', { target: { name: 'otp_2', value: '2' } });
      otpPage.find('input[name="otp_2"]').simulate('keydown', { keyCode: 49 });
      expect(otpPage.find('input[name="otp_2"]').get(0).props.value).toEqual('2');

      otpPage.find('input[name="otp_3"]').simulate('change', { target: { name: 'otp_3', value: '3' } });
      otpPage.find('input[name="otp_3"]').simulate('keydown', { keyCode: 50 });
      expect(otpPage.find('input[name="otp_3"]').get(0).props.value).toEqual('3');

      otpPage.find('input[name="otp_4"]').simulate('change', { target: { name: 'otp_4', value: '4' } });
      otpPage.find('input[name="otp_4"]').simulate('keydown', { keyCode: 51 });
      expect(otpPage.find('input[name="otp_4"]').get(0).props.value).toEqual('4');

      otpPage.find('input[name="otp_4"]').simulate('keydown', { keyCode: 13 });

      expect(paymentActionHandler).not.toHaveBeenCalled();
      otpPage.find('button[type="button"]').simulate('click');
      expect(paymentActionHandler).toBeCalled();
      otpPage.update();

      otpPage.setProps({
        otpVerificationData: { success: true },
      });
      otpPage.find('button[type="button"]').simulate('click');
      otpPage.update();
      otpPage.setProps({
        otpGenerationData: { loading: false, attempt: 0, errorMsg: '' },
      });

      expect(otpPage.text()).toContain('If you do not receive the OTP in 0 second');
      expect(otpPage.text()).toContain('Resend OTP');
      otpPage.find('EditLink').simulate('click');
    });
  });
});
