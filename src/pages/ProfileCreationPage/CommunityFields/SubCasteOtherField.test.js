import React from 'react';
import { mount } from 'enzyme';
import SubCasteOtherField from './SubCasteOtherField';
import context from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('sub caste other field when sub caste value is not others', () => {
  const mountedComponent = mount(
    <ContextProvider {...context()}>
      <SubCasteOtherField />
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="subCasteOther"]').exists()).toBeFalsy();
  });
});

describe('sub caste other field when sub caste value is others', () => {
  const mountedComponent = mount(
    <ContextProvider {...context({ subCaste: 'Others' })}>
      <SubCasteOtherField />
    </ContextProvider>,
  );
  it('should have an input text field having name as subCasteOther', () => {
    expect(mountedComponent.find('input[type="text"][name="subCasteOther"]').exists()).toBeTruthy();
  });
});
