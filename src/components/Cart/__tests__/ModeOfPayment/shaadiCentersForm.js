import React from 'react';
import { mount } from 'enzyme';
import ShaadiCenter from '../../ModeOfPayment/ShaadiCenter/ShaadiCenterForm';
import factory from '../utils/factory';

describe('Shaadi Center', () => {
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
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 23, mopName: 'Shaadi Center' },
      handleUserInput,
      placeOrder,
      onCityChange,
      onSelectCentre,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };
    describe('Shaadi Center Form Elements Without Error', () => {
      const shaadiCenterProps = {
        ...props,
        centers: [],
        formFields: {
          city: '',
          shaadiCentre: '',
        },
        formErrors: {
          city: '',
          centre: '',
        },
        showOtpVerificationForm: false,
        isFormSubmit: false,
        isVisibleLoader: false,
      };

      it('Form should have Elements Without Error', () => {
        const shaadiCenter = mount(<ShaadiCenter {...shaadiCenterProps} />);
        expect(shaadiCenter.find('CartContent').exists()).toBe(true);
        expect(shaadiCenter.find('CartContent').text()).toContain('Select Nearest Shaadi Centre');
        expect(
          shaadiCenter
            .find('CartContent')
            .find('select[name="shaadiCenterCity"]')
            .exists(),
        ).toBe(true);

        expect(shaadiCenter.find('SecureIcon').exists()).toBe(true);
        expect(shaadiCenter.find('PayNowBtn').exists()).toBe(true);
        expect(shaadiCenter.find('TotalPayableText').exists()).toBe(true);

        const shaadiCenterCity = shaadiCenter
          .find('CartContent')
          .find('select[name="shaadiCenterCity"]')
          .find('option');
        expect(shaadiCenterCity.at(0).text()).toContain('Select City');
        shaadiCenterCity.at(1).simulate('click');
        expect(shaadiCenterCity.at(1).prop('value')).toEqual('Indore');

        shaadiCenter.setState({ centers: [...props.shaadiCentersCityList.centers] });
        expect(shaadiCenter.find('CartContent').text()).toContain('Shaadi.com office');

        expect(
          shaadiCenter
            .find('CartContent')
            .find('input[name="centreadd"]')
            .exists(),
        ).toBe(true);

        const center = shaadiCenter
          .find('CartContent')
          .find('input[name="centreadd"]')
          .at(0);
        center.simulate('change', { target: { checked: true } });
        expect(center.prop('value')).toEqual(157);
        expect(placeOrder).not.toHaveBeenCalled();
        shaadiCenter.find('button[type="button"]').simulate('click');
        shaadiCenter.update();
      });
    });

    describe('Shaadi Center Form Elements With Error', () => {
      const shaadiCenterProps = {
        ...props,
        centers: [],
        formFields: {
          city: '',
          shaadiCentre: '',
        },
        formErrors: {
          city: '',
          centre: '',
        },
        showOtpVerificationForm: false,
        isFormSubmit: false,
        isVisibleLoader: false,
      };

      it('Form should have Elements With Error', () => {
        const shaadiCenter = mount(<ShaadiCenter {...shaadiCenterProps} />);
        shaadiCenter.setState({
          formErrors: {
            city: false,
            centre: '',
          },
        });
        expect(shaadiCenter.text()).toContain('Please select valid City.');
        expect(shaadiCenter.find('CartContent').exists()).toBe(true);
        shaadiCenter.setState({
          formErrors: {
            city: '',
            centre: false,
          },
        });
        expect(shaadiCenter.text()).toContain('Select Nearest Shaadi Centre');
        expect(placeOrder).not.toHaveBeenCalled();
        const shaadiCenterCity = shaadiCenter
          .find('CartContent')
          .find('select[name="shaadiCenterCity"]')
          .find('option');
        expect(shaadiCenterCity.at(0).text()).toContain('Select City');

        shaadiCenterCity.at(1).simulate('change', { target: { name: 'shaadiCenterCity', value: 'Delhi' } });
        shaadiCenter.setState({ centers: [...props.shaadiCentersCityList.centers] });
        const center = shaadiCenter
          .find('CartContent')
          .find('input[name="centreadd"]')
          .at(0);
        center.simulate('click', { target: { name: 'centreadd', value: '157', checked: true } });
        shaadiCenter.find('button[type="button"]').simulate('click');
        shaadiCenter.update();
      });
    });
  });
});
