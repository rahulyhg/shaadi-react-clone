import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ResidencyStatusField from './ResidencyStatusField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('living since field when non Indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India' })}>
      <Provider store={store}>
        <Router>
          <ResidencyStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as residencyStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="residencyStatus"]').exists()).toBeFalsy();
  });
});

describe('living since field when non Pakistani user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Pakistan' })}>
      <Provider store={store}>
        <Router>
          <ResidencyStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as residencyStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="residencyStatus"]').exists()).toBeFalsy();
  });
});

describe('living since field when NRI+ user and living since is since birth', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia', livingSince: 'Birth' })}>
      <Provider store={store}>
        <Router>
          <ResidencyStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as residencyStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="residencyStatus"]').exists()).toBeFalsy();
  });
});

describe('living since field when NRI+ user and living since is since after more than 3 years from birth', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia', livingSince: '2009' })}>
      <Provider store={store}>
        <Router>
          <ResidencyStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as residencyStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="residencyStatus"]').exists()).toBeTruthy();
  });
});

describe('living since field when a Gulf country user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'UAE' })}>
      <Provider store={store}>
        <Router>
          <ResidencyStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as residencyStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="residencyStatus"]').exists()).toBeTruthy();
  });
});
