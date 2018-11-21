import React from 'react';
import { mount } from 'enzyme';
import InterestsField from './InterestsField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';

describe('interests field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <InterestsField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as smokeHabbit', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="interests"]').exists()).toBeTruthy();
  });
});
