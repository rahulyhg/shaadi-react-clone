import React from 'react';
import { mount } from 'enzyme';
import PayAtDoorStepForm from '../../ModeOfPayment/PayAtDoorStep/PayAtDoorStepForm';
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
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 21, mopName: 'Pay At DoorStep' },
      onTabClick,
      handleUserInput,
      placeOrder,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };

    describe('Pay At DoorStep Form Elements Without Error', () => {
      const payAtDoorStepProps = {
        ...props,
        formErrors: { ...props.formErrors, city: true, contactPersonName: true, personPhoneNo: true, address: true },
      };

      it('Form should have Elements Without Error', () => {
        const payAtDoorStep = mount(<PayAtDoorStepForm {...payAtDoorStepProps} />);
        expect(payAtDoorStep.find('CartContent').exists()).toBe(true);
        expect(payAtDoorStep.find('CartContent').text()).toContain('City');
        expect(
          payAtDoorStep
            .find('CartContent')
            .find('select[name="cust_city"]')
            .exists(),
        ).toBe(true);

        expect(payAtDoorStep.find('CartContent').text()).toContain("Contact Person's Name");
        expect(
          payAtDoorStep
            .find('CartContent')
            .find('input[name="cust_name"]')
            .exists(),
        ).toBe(true);

        expect(payAtDoorStep.find('CartContent').text()).toContain("Contact Person's Phone Number");
        expect(
          payAtDoorStep
            .find('CartContent')
            .find('input[name="cust_phone"]')
            .exists(),
        ).toBe(true);

        expect(payAtDoorStep.find('CartContent').text()).toContain('Address');
        expect(
          payAtDoorStep
            .find('CartContent')
            .find('textarea[name="cust_address1"]')
            .exists(),
        ).toBe(true);
        expect(payAtDoorStep.find('CartContent').text()).toContain('*Total Payable:');
        expect(payAtDoorStep.find('SecureIcon').exists()).toBe(true);
        expect(payAtDoorStep.find('PayNowBtn').exists()).toBe(true);
        expect(payAtDoorStep.find('TotalPayableText').exists()).toBe(true);
      });
    });

    describe('Pay At DoorStep Form have Elements With Error', () => {
      const payAtDoorStepProps = {
        ...props,
      };

      it('Form should have Elements With Error', () => {
        const payAtDoorStep = mount(<PayAtDoorStepForm {...payAtDoorStepProps} />);
        payAtDoorStep.setState({
          formErrors: {
            city: false,
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
        });
        expect(payAtDoorStep.find('CartContent').text()).toContain('Please select valid City.');
        payAtDoorStep.setState({
          formErrors: {
            city: '',
            contactPersonName: false,
            personPhoneNo: '',
            address: '',
          },
        });
        expect(payAtDoorStep.find('CartContent').text()).toContain('Please enter a valid Name.');
        payAtDoorStep.setState({
          formErrors: {
            city: '',
            contactPersonName: '',
            personPhoneNo: false,
            address: '',
          },
        });
        expect(payAtDoorStep.find('CartContent').text()).toContain('Please enter a valid Phone number.');
        payAtDoorStep.setState({
          formErrors: {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: false,
          },
        });
        expect(payAtDoorStep.find('CartContent').text()).toContain('Please enter a valid Address.');
        const doorStepCity = payAtDoorStep
          .find('CartContent')
          .find('select[name="cust_city"]')
          .find('option');
        doorStepCity.at(1).simulate('change', { target: { name: 'cust_city', value: 'Agratala' } });

        payAtDoorStep.find('input[name="cust_name"]').simulate('change', { target: { name: 'cust_name', value: 'Chirag' } });
        payAtDoorStep
          .find('input[name="cust_phone"]')
          .at(0)
          .simulate('change', { target: { name: 'cust_phone', value: '9737666147' } });
        payAtDoorStep
          .find('textarea[name="cust_address1"]')
          .simulate('change', { target: { name: 'cust_address1', value: 'HO Head Office' } });
        payAtDoorStep.find('button[type="button"]').simulate('click');
        payAtDoorStep.update();
      });
    });
  });
});
