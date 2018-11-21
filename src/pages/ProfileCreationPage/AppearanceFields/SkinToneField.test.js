import React from 'react';
import { mount } from 'enzyme';
import SkinToneField from './SkinToneField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('skin tone field when NRI+ user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'USA' })}>
      <SkinToneField />
    </ContextProvider>,
  );
  it('should not have an input radio field having name as complexion', () => {
    expect(mountedComponent.find('input[type="radio"][name="complexion"]').exists()).toBeFalsy();
  });
});

describe('skin tone field when Indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <SkinToneField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as complexion', () => {
    expect(mountedComponent.find('input[type="radio"][name="complexion"]').exists()).toBeTruthy();
  });
});
