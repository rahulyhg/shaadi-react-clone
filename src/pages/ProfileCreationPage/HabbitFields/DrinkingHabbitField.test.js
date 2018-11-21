import React from 'react';
import { mount } from 'enzyme';
import DrinkingHabbitField from './DrinkingHabbitField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe('drinking habbit field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <DrinkingHabbitField />
    </ContextProvider>,
  );
  it('should have an input radio field having name as drinkHabbit', () => {
    expect(mountedComponent.find('input[type="radio"][name="drinkHabbit"]').exists()).toBeTruthy();
  });
});
