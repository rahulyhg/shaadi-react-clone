import React from 'react';
import { mount } from 'enzyme';
import NoOfChildrenField from './NoOfChildrenField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('no of children field when NRI+ user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ haveChildren: 'No' })}>
      <NoOfChildrenField />
    </ContextProvider>,
  );
  it('should not have an input radio field having name as noOfChildren', () => {
    expect(mountedComponent.find('input[type="radio"][name="noOfChildren"]').exists()).toBeFalsy();
  });
});

describe('no of children field when Indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ haveChildren: 'Yes. Living together' })}>
      <NoOfChildrenField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as noOfChildren', () => {
    expect(mountedComponent.find('input[type="radio"][name="noOfChildren"]').exists()).toBeTruthy();
  });
});
