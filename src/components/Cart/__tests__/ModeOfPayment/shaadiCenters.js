import React from 'react';
import { mount } from 'enzyme';
import ShaadiCenter from '../../ModeOfPayment/ShaadiCenter';
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
      handleUserInput,
      placeOrder,
      onCityChange,
      onSelectCentre,
      resendOTPAndModalPopUp,
      handleOtpInput,
      paymentActionHandler,
    };
    describe('Shaadi Center : ', () => {
      const shaadiCenterProps = {
        ...props,
        mopId: 23,
        mopName: 'Shaadi Centers',
        formErrors: { ...props.formErrors, city: false, center: true },
      };
      it('If city has value Form Redirect', () => {
        const shaadiCenter = mount(<ShaadiCenter {...shaadiCenterProps} />);
        expect(shaadiCenter.find('#shaadi_centre').exists()).toBe(true);
      });
    });
    describe('Shaadi Center without value : ', () => {
      it('If city has not value', () => {
        const shaadiCenterProps = {
          ...props,
          mopId: 23,
          mopName: 'Shaadi Centers',
          shaadiCentersCityList: { cities: [], centers: [] },
          formErrors: { ...props.formErrors, city: false, center: true },
        };
        const shaadiCenter = mount(<ShaadiCenter {...shaadiCenterProps} />);
        expect(shaadiCenter.find('#shaadi_centre').exists()).toBe(false);
      });
    });
  });
});
