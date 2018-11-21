import React from 'react';
import { mount } from 'enzyme';
import CashPaymentForm from '../../ModeOfPayment/CashPayment/CashPaymentForm';
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
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 78, mopName: 'Uae Exchange' },
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
        formErrors: { ...props.formErrors, city: true, center: true },
      };

      it('Form should have Elements Without Error', () => {
        const uaeCenter = mount(<CashPaymentForm {...uaeCenterProps} />);
        expect(uaeCenter.find('form').exists()).toBe(true);
        expect(uaeCenter.find('CashPayment').exists()).toBe(true);
        expect(
          uaeCenter
            .find('CashPayment')
            .find('DefaultText')
            .text(),
        ).toContain('Pay cash at your nearest UAE Exchange');
        expect(uaeCenter.find('CashPayment').text()).toContain('Locate your nearest UAE Exchange Branch in');
        expect(
          uaeCenter
            .find('CashPayment')
            .find('select[name="uaeCity"]')
            .exists(),
        ).toBe(true);

        expect(uaeCenter.find('SecureIcon').exists()).toBe(true);
        expect(uaeCenter.find('PayNowBtn').exists()).toBe(true);
        expect(uaeCenter.find('TotalPayableText').exists()).toBe(true);

        const uaeCenterCity = uaeCenter
          .find('CashPayment')
          .find('select[name="uaeCity"]')
          .find('option');
        expect(uaeCenterCity.at(0).text()).toContain('Select City');
        uaeCenterCity.at(1).simulate('click');
        expect(uaeCenterCity.at(1).prop('value')).toEqual('Abu Dhabi');
        uaeCenter.setState({ centers: [...props.uaeCentersCityList.centers] });
        expect(uaeCenter.find('CashPayment').text()).toContain('Tel: +971-6-7424666, Speed Dial: 21');
        expect(
          uaeCenter
            .find('CashPayment')
            .find('input[name="centreadd"]')
            .exists(),
        ).toBe(true);

        const center = uaeCenter
          .find('CashPayment')
          .find('input[name="centreadd"]')
          .at(0);
        center.simulate('change', { target: { checked: true } });
        expect(center.prop('value')).toEqual(157);
      });
    });

    describe('Cash Payment Form Elements With Error', () => {
      const uaeCenterProps = {
        ...props,
        mopId: 78,
        mopName: 'Uae Exchange',
        formErrors: { ...props.formErrors, city: false, center: false },
      };

      it('Form should have Elements With Error', () => {
        const uaeCenter = mount(<CashPaymentForm {...uaeCenterProps} />);
        uaeCenter.setState({
          formErrors: {
            city: false,
            centre: '',
          },
        });
        expect(uaeCenter.find('CashPayment').text()).toContain('Please select valid City.');

        uaeCenter.setState({
          formErrors: {
            city: true,
            centre: false,
          },
        });
        expect(uaeCenter.find('CashPayment').text()).toContain('Please select nearest UAE Exchange Branch to confirm the order.');
        expect(placeOrder).not.toHaveBeenCalled();
        uaeCenter.find('button[type="button"]').simulate('click');
        uaeCenter.update();
        expect(uaeCenter.find('CashPayment').text()).toContain('Please select valid City.');

        expect(uaeCenter.find('CashPayment').exists()).toBe(true);
        expect(uaeCenter.find('CashPayment').text()).toContain('Locate your nearest UAE Exchange Branch in');

        const uaeCenterCity = uaeCenter
          .find('CashPayment')
          .find('select[name="uaeCity"]')
          .find('option');
        expect(uaeCenterCity.at(0).text()).toContain('Select City');
        uaeCenterCity.at(1).simulate('change', { target: { name: 'uaeCity', value: 'Abu Dhabi' } });
        uaeCenter.setState({ centers: [...props.uaeCentersCityList.centers] });
        uaeCenter.find('button[type="button"]').simulate('click');
        uaeCenter.update();
      });
    });
  });
});
