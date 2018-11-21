import React from 'react';
import { mount } from 'enzyme';
import PayAtDoorStep from '../../ModeOfPayment/PayAtDoorStep';
import factory from '../utils/factory';

describe('Pay At DoorStep', () => {
  const onTabClick = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const resendOTPAndModalPopUp = jest.fn();
  const handleOtpInput = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onTabClick.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      resendOTPAndModalPopUp.mockClear();
      handleOtpInput.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = {
      ...factory.modeofPaymentProps,
      onTabClick,
      handleUserInput,
      placeOrder,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };

    describe('Pay At DoorStep : ', () => {
      const payAtDoorStepProps = {
        ...props,
        mopId: 21,
        mopName: 'Pay At DoorStep',
        formErrors: { ...props.formErrors, city: true, contactPersonName: true, personPhoneNo: true, address: true },
      };

      it('Form should Be Redirect', () => {
        const payAtDoorStep = mount(<PayAtDoorStep {...payAtDoorStepProps} />);
        expect(payAtDoorStep.find('#pay_at_doorstep').exists()).toBe(true);
      });
    });
  });
});
