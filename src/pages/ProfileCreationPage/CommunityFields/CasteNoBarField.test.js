import React from 'react';
import { mount } from 'enzyme';
import CasteNoBarField from './CasteNoBarField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('caste no bar field when Canadian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <CasteNoBarField />
    </ContextProvider>,
  );
  it('should not have an input checkbox field having name as casteNoBar', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="casteNoBar"]').exists()).toBeFalsy();
  });
});

describe('caste no bar field when no caste value empty', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: '' })}>
      <CasteNoBarField />
    </ContextProvider>,
  );
  it('should not have an input checkbox field having name as casteNoBar', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="casteNoBar"]').exists()).toBeFalsy();
  });
});

describe('caste no bar field when caste value is valid', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <CasteNoBarField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as casteNoBar', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="casteNoBar"]').exists()).toBeTruthy();
  });
});
