import React from 'react';
import { mount } from 'enzyme';
import SmokingHabbitField from './SmokingHabbitField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('smoking habbit field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <SmokingHabbitField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as smokeHabbit', () => {
    expect(mountedComponent.find('input[type="radio"][name="smokeHabbit"]').exists()).toBeTruthy();
  });
});
