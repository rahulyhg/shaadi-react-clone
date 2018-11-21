import React from 'react';
import { mount } from 'enzyme';
import CashPayment from '../../ModeOfPayment/CashPayment';
import factory from '../utils/factory';

describe('Cash Payment - UAE Exchange', () => {
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const onCityChange = jest.fn();
  const onSelectCentre = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      handleUserInput.mockClear();
      placeOrder.mockClear();
      onCityChange.mockClear();
      onSelectCentre.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      handleUserInput,
      placeOrder,
      onCityChange,
      onSelectCentre,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };
    describe('Cash Payment Form Elements Without Error', () => {
      const uaeCenterProps = {
        ...props,
        mopId: 78,
        mopName: 'Uae Exchange',
        formErrors: { ...props.formErrors, city: true, center: true },
      };

      it('Form should be Redirect', () => {
        const uaeCenter = mount(<CashPayment {...uaeCenterProps} />);
        expect(uaeCenter.find('#cash_payment').exists()).toBe(true);
      });
    });
  });
});
