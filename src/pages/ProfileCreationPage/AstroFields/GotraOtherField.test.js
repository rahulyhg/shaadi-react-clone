import React from 'react';
import { mount } from 'enzyme';
import GotraOtherField from './GotraOtherField';
import context from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('gotra other field when sub caste value is not others', () => {
  const mountedComponent = mount(
    <ContextProvider {...context()}>
      <GotraOtherField />
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="gotraOther"]').exists()).toBeFalsy();
  });
});

describe('gotra other field when sub caste value is others', () => {
  const mountedComponent = mount(
    <ContextProvider {...context({ gotra: 'Others' })}>
      <GotraOtherField />
    </ContextProvider>,
  );
  it('should have an input text field having name as gotraOther', () => {
    expect(mountedComponent.find('input[type="text"][name="gotraOther"]').exists()).toBeTruthy();
  });
});
