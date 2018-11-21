import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import EthnicityField from './EthnicityField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';
import api from '../../api';
import initializeStore from '../../store';

const store = initializeStore();

describe('ethnicity field when api return 1 value', () => {
  api.get = () =>
    new Promise((resolve, reject) => {
      resolve({ data: [{ id: 'Other', text: 'Other' }] });
    });
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <EthnicityField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="ethnicity"]').exists()).toBeFalsy();
  });
});

describe('ethnicity field when API returns more than one value', () => {
  api.get = () =>
    new Promise((resolve, reject) => {
      resolve({ data: [{ id: 'India', text: 'India' }, { id: 'Pakistan', text: 'Pakistan' }] });
    });
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <EthnicityField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as ethnicity', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(mountedComponent.find('input[type="text"][name="ethnicity"]').exists()).toBeTruthy();
    }, 1);
  });
});
