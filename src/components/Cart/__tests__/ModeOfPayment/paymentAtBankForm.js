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

    describe('Payment At Bank Form Elements Without Error', () => {
      const payAtBankProps = {
        ...props,
        formErrors: { ...props.formErrors, contactPersonName: true, personPhoneNo: true },
      };

      it('Form should have Elements Without Error', () => {
        const payAtBank = mount(<PaymentAtBank {...payAtBankProps} />);
        expect(payAtBank.find('CartContent').exists()).toBe(true);
        expect(payAtBank.find('CartContent').text()).toContain("Contact Person's Name");
        expect(
          payAtBank
            .find('CartContent')
            .find('input[name="cust_name"]')
            .exists(),
        ).toBe(true);

        expect(payAtBank.find('CartContent').text()).toContain('Confirm Contact Number');
        expect(
          payAtBank
            .find('CartContent')
            .find('input[name="cust_phone"]')
            .exists(),
        ).toBe(true);

        const contactPersonName = payAtBank.find('CartContent').find('input[name="cust_name"]');
        contactPersonName.simulate('input', { target: { value: 'test name' } });
        expect(payAtBank.find('CartContent').text()).toContain('*Total Payable:');
        expect(payAtBank.find('SecureIcon').exists()).toBe(true);
        expect(payAtBank.find('PayNowBtn').exists()).toBe(true);
        expect(payAtBank.find('TotalPayableText').exists()).toBe(true);
        expect(placeOrder).not.toHaveBeenCalled();
        payAtBank.find('button[type="button"]').simulate('click');
        payAtBank.update();
      });
    });

    describe('Payment At Bank Form Elements With Error', () => {
      const payAtBankProps = {
        ...props,
        formErrors: { ...props.formErrors, contactPersonName: false, personPhoneNo: false },
      };
      it('Form should have Elements With Error', () => {
        const payAtBank = mount(<PaymentAtBank {...payAtBankProps} />);
        expect(payAtBank.find('CartContent').exists()).toBe(true);
        expect(payAtBank.find('CartContent').text()).toContain("Contact Person's Name");
        expect(
          payAtBank
            .find('CartContent')
            .find('input[name="cust_name"]')
            .exists(),
        ).toBe(true);
        expect(payAtBank.find('CartContent').text()).toContain('Confirm Contact Number');
        expect(
          payAtBank
            .find('CartContent')
            .find('input[name="cust_phone"]')
            .exists(),
        ).toBe(true);
        expect(payAtBank.find('SecureIcon').exists()).toBe(true);
        expect(payAtBank.find('PayNowBtn').exists()).toBe(true);
        expect(payAtBank.find('TotalPayableText').exists()).toBe(true);
        expect(placeOrder).not.toHaveBeenCalled();
        payAtBank.find('button[type="button"]').simulate('click');
        payAtBank.update();
      });
    });
  });
});
