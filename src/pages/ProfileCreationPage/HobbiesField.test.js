import React from 'react';
import { mount } from 'enzyme';
import HobbiesField from './HobbiesField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';

describe('hobbies field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <HobbiesField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as smokeHabbit', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="hobbies"]').exists()).toBeTruthy();
  });
});
