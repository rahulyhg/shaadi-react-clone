import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import NakshatraField from './NakshatraField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

describe('nakshatra field when non nri plus country user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada', rashi: 'Makar' })}>
      <Provider store={store}>
        <Router>
          <NakshatraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="nakshatra"]').exists()).toBeFalsy();
  });
});

describe('nakshatra field when empty caste field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: '' })}>
      <Provider store={store}>
        <Router>
          <NakshatraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as nakshatra', () => {
    expect(mountedComponent.find('input[type="text"][name="nakshatra"]').exists()).toBeFalsy();
  });
});

describe('nakshatra field when Indian user with valid eligible caste value', () => {
  api.get = () =>
    new Promise((resolve, reject) => {
      resolve({ data: [] });
    });
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: 'Chandravanshi Kahar' })}>
      <Provider store={store}>
        <Router>
          <NakshatraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as nakshatra', () => {
    expect(mountedComponent.find('input[type="text"][name="nakshatra"]').exists()).toBeTruthy();
  });
});
