import React from 'react';
import { mount } from 'enzyme';
import PhysicalDisabilityField from './PhysicalDisabilityField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';

describe('physical disability field when Canadian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <PhysicalDisabilityField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as disability', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="disability"]').exists()).toBeTruthy();
  });
});
