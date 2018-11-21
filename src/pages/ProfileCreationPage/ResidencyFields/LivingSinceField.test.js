import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import LivingSinceField from './LivingSinceField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('living since field when non NRI user', () => {
  const component = mount(
    <ContextProvider {...getContext({ country: 'India' })}>
      <Provider store={store}>
        <Router>
          <LivingSinceField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(component.find('input[type="text"][name="livingSince"]').exists()).toBeFalsy();
  });
});

describe('living since field when Indian user having eligible state selected and city as other', () => {
  const component = mount(
    <ContextProvider {...getContext({ country: 'Australia' })}>
      <Provider store={store}>
        <Router>
          <LivingSinceField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as livingSince', () => {
    expect(component.find('input[type="text"][name="livingSince"]').exists()).toBeTruthy();
  });
});
