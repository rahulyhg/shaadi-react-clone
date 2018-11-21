import React from 'react';
import { mount } from 'enzyme';
import HaveChildrenField from './HaveChildrenField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('have children field when NRI+ user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ maritalStatus: 'Never Married' })}>
      <HaveChildrenField />
    </ContextProvider>,
  );
  it('should not have an input radio field having name as haveChildren', () => {
    expect(mountedComponent.find('input[type="radio"][name="haveChildren"]').exists()).toBeFalsy();
  });
});

describe('have children field when Indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ maritalStatus: 'Widow' })}>
      <HaveChildrenField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as haveChildren', () => {
    expect(mountedComponent.find('input[type="radio"][name="haveChildren"]').exists()).toBeTruthy();
  });
});
