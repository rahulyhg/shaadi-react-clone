import React from 'react';
import { mount } from 'enzyme';
import MobileNumberField from './MobileNumberField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('mobile number field on page load', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <MobileNumberField />
    </ContextProvider>,
  );
  it('should have an input tel field having name as mobileNumber', () => {
    expect(component.find('input[type="tel"][name="mobileNumber"]').exists()).toBeTruthy();
  });
  component.setProps(getContext({ countryCode: '+91', mobileNumber: '' }));
  it('should reset mobile number value and focus on it', () => {
    expect(component.find('input[type="tel"][name="mobileNumber"]').props().value).toEqual('');
  });
});
