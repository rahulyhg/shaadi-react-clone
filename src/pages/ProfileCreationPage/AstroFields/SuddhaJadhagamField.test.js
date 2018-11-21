import React from 'react';
import { mount } from 'enzyme';
import SuddhaJadhagamField from './SuddhaJadhagamField';
import ContextProvider from '../../../components/Common/Context';
import getContext from '../utils/sampleContext';

const hinduIndian = { religion: 'Hindu', country: 'India' };
const hinduMalluIndian = { ...hinduIndian, motherTongue: 'Malayalam' };

describe('suddha jadhagam field when North Indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduIndian, motherTongue: 'Hindi' })}>
      <SuddhaJadhagamField />
    </ContextProvider>,
  );
  it('should not have an input radio field having name as doshamTypes', () => {
    expect(mountedComponent.find('input[type="radio"][name="doshamTypes"]').exists()).toBeFalsy();
  });
});

describe('suddha jadhagam field when Indian Mallu Hindu user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduMalluIndian })}>
      <SuddhaJadhagamField />
    </ContextProvider>,
  );
  it('should not have an input radio field having name as doshamTypes', () => {
    expect(mountedComponent.find('input[type="radio"][name="doshamTypes"]').exists()).toBeFalsy();
  });
});
