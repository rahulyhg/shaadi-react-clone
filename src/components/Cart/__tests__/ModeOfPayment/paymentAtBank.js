import React from 'react';
import { mount } from 'enzyme';
import PaymentAtBank from '../../ModeOfPayment/PaymentAtBank';
import factory from '../utils/factory';

describe('Payment At Bank', () => {
  const onChangeValue = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onChangeValue.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      onChangeValue,
      handleUserInput,
      placeOrder,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };

    describe('Payment At Bank :', () => {
      const payAtBankProps = {
        ...props,
        mopId: 34,
        mopName: 'Payment At Bank',
        formErrors: { ...props.formErrors, contactPersonName: true, personPhoneNo: true },
      };

      it('Form should Be Redirect', () => {
        const payAtBank = mount(<PaymentAtBank {...payAtBankProps} />);
        expect(payAtBank.find('#pay_at_bank').exists()).toBe(true);
      });
    });
  });
});
