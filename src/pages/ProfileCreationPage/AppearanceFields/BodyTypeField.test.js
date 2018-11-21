import React from 'react';
import { mount } from 'enzyme';
import BodyTypeField from './BodyTypeField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('body type field for male', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ gender: 'Male' })}>
      <BodyTypeField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as bodyType', () => {
    expect(mountedComponent.find('input[type="radio"][name="bodyType"]').exists()).toBeTruthy();
  });
});

describe('body type field for female', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ gender: 'Female' })}>
      <BodyTypeField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as bodyType', () => {
    expect(mountedComponent.find('input[type="radio"][name="bodyType"]').exists()).toBeTruthy();
  });
});
